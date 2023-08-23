import { Request, Response } from 'express'
import * as repo from '../repository/TaskRepository'
import { getUser } from '../utils/functions/users';
import { TaskInterface } from '../utils/interfaces/TaskInterface';
import { setError } from '../utils/functions/errors';

export const CreateTask = async (req: Request, res: Response) => {
    const {title, content, dueDate, tagsList, project, ...rest} = req.body
    
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }

    const payload = {
        title,
        ...(content && { content }),
        ...(dueDate && { dueDate }),
        ...(tagsList && { tagsList }),
        project
    }
    
    try {
        const task : TaskInterface = await repo.create(payload, user.id)
        return res.status(200).send(task);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks : TaskInterface[] = await repo.getAll();
        if(!tasks) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(tasks);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetTaskById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const task: TaskInterface = await repo.getById(id, user!.id);
        if(!task) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(task);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetTaskByDate = async (req: Request, res: Response) => {
    const { dueDate } = req.body;
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const tasks: TaskInterface[] = await repo.getAllByDate(user!.id, dueDate);
        if(!tasks) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(tasks);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetAllUserTasks = async (req: Request, res: Response) => {
    //const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        
        const tasks : TaskInterface[] = await repo.getAllByUserId(user.id);
        if(!tasks) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(tasks);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetAllProjectTasks = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        
        const tasks : TaskInterface[] = await repo.getAllByProjectId(user.id, id);
        if(!tasks) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(tasks);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const UpdateTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const {title, content, dueDate, tagsList, project, ...rest} = req.body

    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    
    const payload = {
        id: id,
        title,
        ...(dueDate && { dueDate }),
        ...(content && { content }),
        ...(tagsList && { tagsList }),
        project
    }

    try {
        const task : TaskInterface = await repo.update(id, payload)
        if(!task) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(task)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const DeleteTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const task = await repo.deleteById(id, user.id)
        if(!task) {
            throw new Error('Nessuna nota trovata')
        }
        return res.status(200).send(task)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}



