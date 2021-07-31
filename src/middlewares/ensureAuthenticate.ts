import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

//so pra mandar o token para o retorno 
interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request:Request, response:Response, next:NextFunction): void{
    //validacao do token JWT

    //pegando a informacao do header
    const authHeader = request.headers.authorization;
    
    if(!authHeader){
        throw new AppError('JWT token is missing', 401);
    }

    //Se o token exixstir
    //uso  a destruturacao para  pegar o Bearer e depis o token, o type bearer eu n uso
    const [, token] = authHeader.split(' ');
    try {
        const decoded = verify(token, authConfig.jwt.secret);
        console.log(decoded);
        const { sub } = decoded as TokenPayload; //preciso forcar que eh

        request.user = {
            id: sub, //adiciono pra usar nas próximas  requisições.
        }
        return next();// quase esqueci de terminar o middleware
    } catch {
        throw new AppError("Invalid JWT token", 401);
    }
}