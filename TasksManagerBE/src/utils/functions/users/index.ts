import express, { Request } from "express";
import jwt from 'jsonwebtoken';
import fs from 'fs'
import { UserNoPassType, UserType, jwtAccessPayload, jwtPayload, jwtRefreshPayload } from "../../types/UserTypes";

const PUBLIC_KEY = fs.readFileSync('./keys/pub.key');
const PRIVATE_KEY = fs.readFileSync('./keys/priv.key');

export const getUser = (req: Request) : jwtAccessPayload | undefined => {
    try {
        const data = parseRequest(req);
        if(data?.aud!=='access') {
            return undefined;
        }
        return data;
    } catch(e) {
        return undefined;
    }
}

export const getExpTime = (minutes:number) => {
    const nowSeconds = Math.trunc(new Date().getTime()/1000);
    const minutesToMs = minutes * 60;

    return nowSeconds + minutesToMs;
}

export const generateAccessToken = (user: UserType) : string => {
    const payload: jwtAccessPayload = {
        aud: 'access',
        id: user.id,
        email: user.email,
        name: user.name
    }
    return jwt.sign({
        ...payload,
        exp: getExpTime(5) //numero in minuti
    }, PRIVATE_KEY, {algorithm: "RS256"})
}

export const generateRefreshToken = (user: UserType) => {
    const payload: jwtRefreshPayload = {
        aud: 'refresh',
        id: user.id
    }
    return jwt.sign({
        ...payload,
        exp: getExpTime(24 * 60) //numero in minuti
    }, PRIVATE_KEY, {algorithm: "RS256"})
}

export const clearUser = (user: UserType) : UserNoPassType => {
    return {
        email: user.email,
        name: user.name,
        id: user.id
    }
}

export const parseRequest = (req: Request) : jwtPayload | undefined => {
   
    const auth = req.headers['authorization'];
    if(!auth) {
        return undefined;
    }

    const match = /Bearer (.+)/.exec(auth);
    if(!match) {
        return undefined;
    }

    const token = match[1];
    try {
        const data = jwt.verify(token, PUBLIC_KEY, {algorithms: ["RS256"]}) as jwtPayload;
        return data;
    } catch(e) {
        return undefined;
    }
}

export const parseToken = (token: string) : jwtPayload | undefined => {
    try {
        const data = jwt.verify(token, PUBLIC_KEY, {algorithms: ["RS256"]}) as jwtPayload;
        return data;
    } catch(e) {
        return undefined;
    }
}
