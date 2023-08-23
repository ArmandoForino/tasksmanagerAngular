import { Request, Response } from 'express'
import * as repo from '../repository/UserRepository'
import { UserInterface } from '../utils/interfaces/UserInterface';
import { compareSync, hashSync } from 'bcryptjs';
import { UserEditPayloadType, UserPayloadType, jwtRefreshPayload } from '../utils/types/UserTypes';
import { clearUser, generateAccessToken, generateRefreshToken, getUser, parseToken } from '../utils/functions/users';
import { setError } from '../utils/functions/errors';
import { MailerService as mailer } from '../services/MailerService';


export const CreateUser = async (req: Request, res: Response) => {
    const payload: UserPayloadType = req.body;
   
    try {
        const {password, ...rest} = payload;
        const user : UserInterface = await repo.create({
            ...rest,
            passwordHash: hashSync(payload.password, 10)
        })
        mailer.getInstance().sendEmail(user.email, `Benvenuto ${user.name}`, 'Ti sei registrato al nostro servizio')
        return res.status(200).send(user);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetAllUsers = async (req: Request, res: Response) => {
    try {
        const users : UserInterface[] = await repo.getAll();
        if(!users) {
            throw new Error('Nessun user trovato')
        }
        return res.status(200).send(users);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const GetUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user : UserInterface = await repo.getById(id);
        if(!user) {
            throw new Error('Nessun user trovato')
        }
        return res.status(200).send(user);
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    const {password, name, ...rest} = req.body
    const payload: UserEditPayloadType = {
        ...(name && { name }),
        ...(password && {passwordHash: hashSync(password, 10)})
    };
    
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato. Non puoi effettuare la modifica'))
    }
    const id = user.id; 

    try {
        const user: UserInterface = await repo.update(id, payload)
        return res.status(200).send(user)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const DeleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user : UserInterface = await repo.deleteById(id)
        return res.status(200).send(user)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const LoginUser = async (req: Request, res: Response) =>  {
    try {
        const {email, password} = req.body;
        
        const user = await repo.getByEmail(email);

        if(!user||!compareSync(password,user.passwordHash)) {
            return res.status(403).send(setError('Credenziali non valide'))
        }
        const access = generateAccessToken(user)
        const refresh = generateRefreshToken(user)
        const clearedUser = clearUser(user)
        
        const tokensObj = {
            user: clearedUser,
            token: {
                access,
                refresh
            }
        }
        res.cookie('refreshToken', tokensObj.token.refresh, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 //minuti in ms
        })
        
        return res.status(200).send({ user: tokensObj.user, accessToken: tokensObj.token.access, refreshToken: tokensObj.token.refresh})
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const LogoutUser = async (req: Request, res: Response) =>  {
    try {
        res.clearCookie('refreshToken');
        return res.status(200).send({ msg: 'Logout effettuato'})
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

export const RefreshAccessToken = async (req: Request, res: Response) =>  {
    try {
        const refresh = parseToken(req.cookies['refreshToken']);
        let refreshData: jwtRefreshPayload;
        
        try {
            if(refresh?.aud!=='refresh') {
                throw new Error('Token refresh non valido')
            }
            refreshData = refresh;
        } catch(e) {
            throw new Error('Token refresh non valido')
        }

        const user = await repo.getById(refreshData.id);
    
        if(!user) {
            throw new Error('User non trovato')
        }
        const access = generateAccessToken(user)

        const tokensObj = { access };
        
        return res.status(200).send(tokensObj)
    } catch(e:any) {
        return res.status(400).send(setError(e.message))
    }
}

