import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtConfig } from '../../../config';
import { RequestWithUser, Roles } from '../types/get-me.types';

interface JwtPayload {
  [key: string]: any;
  iss?: string | undefined;
  sub: { userId: string; role: Roles; iat: number; exp: number };
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}

const verifyToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['authorization']?.split('Bearer ')[1];

    if (!token)
      return res.status(403).json({ error: true, message: 'No token' });

    const data = (await verify(
      token,
      jwtConfig.jwtSecret || ''
    )) as unknown as JwtPayload;

    req.user = { userId: +(data.userId || '0'), role: data.role };

    return next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ error: true, message: 'Unauthenticated' });
  }
};

export default verifyToken;
