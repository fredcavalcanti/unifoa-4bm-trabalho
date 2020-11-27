import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated( req: Request, res: Response, next:NextFunction ): void {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    throw new Error('Token JWT Ausente');
  }

  const [, token ] = authHeader.split(' ');
  try{
    const decoded = verify(token, authConfig.jwt.secret)
    const { sub } = decoded as TokenPayload;
    //req.user = { id: sub };
    req.trailers.idGenerated = sub;
    return next()
  }catch(err){
    throw new Error('Token JWT Inválido');
  }

}
