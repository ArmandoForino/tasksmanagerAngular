import { Request, Response, NextFunction } from 'express'
import { getUser } from '../../utils/functions/users';
import { setError } from '../../utils/functions/errors';

export const authCheckerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = getUser(req);
    if(!user) {
        return res.status(401).send(setError('Devi essere loggato'))
    }
    next();
}