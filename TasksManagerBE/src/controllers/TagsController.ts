import { Request, Response } from 'express'
import * as repo from '../repository/TagRepository'
import { getUser } from '../utils/functions/users';
import { TagInterface } from '../utils/interfaces/TagInterface';
import { setError } from '../utils/functions/errors';
import { checkColor } from '../utils/functions/generics';

export const CreateTag = async (req: Request, res: Response) => {
    const {name, description, color, ...rest} = req.body
    
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }

    const payload = {
        name,
        ...(color && checkColor(color) && { color }),
        ...(description && { description })
    }
    
    try {
        const tag : TagInterface = await repo.create(payload, user.id)
        return res.status(200).send(tag);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetAllTags = async (req: Request, res: Response) => {
    try {
        const tags : TagInterface[] = await repo.getAll();
        if(!tags) {
            throw new Error('Nessun tag trovato')
        }
        return res.status(200).send(tags);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetTagById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const tag: TagInterface = await repo.getById(id, user!.id);
        if(!tag) {
            throw new Error('Nessun tag trovato')
        }
        return res.status(200).send(tag);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetAllUserTags = async (req: Request, res: Response) => {
    //const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        
        const tags : TagInterface[] = await repo.getAllByUserId(user.id);
        if(!tags) {
            throw new Error('Nessun tag trovato')
        }
        return res.status(200).send(tags);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const UpdateTag = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const {name, description, color, ...rest} = req.body

    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }

    const payload = {
        id,
        name,
        description: description||null,
        color: (color && checkColor(color))?color:null,
        UserId: user.id
    }

    try {
        const tag : TagInterface = await repo.update(id, payload)
        if(!tag) {
            throw new Error('Nessun tag trovato')
        }
        return res.status(200).send(tag)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}


export const DeleteTag = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare l\'operazione'))
    }
    try {
        const tag = await repo.deleteById(id, user.id)
        if(!tag) {
            throw new Error('Nessun tag trovato')
        }
        return res.status(200).send(tag)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}



