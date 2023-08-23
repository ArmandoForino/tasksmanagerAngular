import { Request, Response } from 'express'
import * as repo from '../repository/ProjectRepository'
import { getUser } from '../utils/functions/users';
import { ProjectInterface } from '../utils/interfaces/ProjectInterface';
import { setError } from '../utils/functions/errors';

export const CreateProject = async (req: Request, res: Response) => {
    const {name, description, status, ...rest} = req.body
    
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }

    const payload = {
        name,
        status,
        ...(description && { description })
    }
    
    console.log(payload)
    try {
        const project : ProjectInterface = await repo.create(payload, user.id)
        return res.status(200).send(project);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetAllProjects = async (req: Request, res: Response) => {
    try {
        const projects : ProjectInterface[] = await repo.getAll();
        if(!projects) {
            throw new Error('Nessun progetto trovato')
        }
        return res.status(200).send(projects);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetProjectById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const project: ProjectInterface = await repo.getById(id, user!.id);
        if(!project) {
            throw new Error('Nessun progetto trovato')
        }
        return res.status(200).send(project);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetAllUserProjects = async (req: Request, res: Response) => {
    //const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        
        const projects : ProjectInterface[] = await repo.getAllByUserId(user.id);
        if(!projects) {
            throw new Error('Nessun progetto trovato')
        }
        return res.status(200).send(projects);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetProjectsByStatus = async (req: Request, res: Response) => {
    const statusObj: any = {
        active: true,
        inactive: false
    }
    const status = statusObj[req.params.status];

    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const projects : ProjectInterface[] = await repo.getAllByStatus(user.id, status);
        if(!projects) {
            throw new Error('Nessun progetto trovato')
        }
        return res.status(200).send(projects);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const UpdateProject = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const {name, description, status, ...rest} = req.body

    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }

    const payload = {
        id,
        name,
        description: description||null,
        status,
        UserId: user.id
    }

    console.log(payload)

    try {
        const project : ProjectInterface = await repo.update(id, payload)
        if(!project) {
            throw new Error('Nessun progetto trovato')
        }
        return res.status(200).send(project)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}


export const DeleteProject = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const project = await repo.deleteById(id, user.id)
        if(!project) {
            throw new Error('Nessun progetto trovato')
        }
        return res.status(200).send(project)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}



