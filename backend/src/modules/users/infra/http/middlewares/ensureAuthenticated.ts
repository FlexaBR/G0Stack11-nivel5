import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'; // verifica se o token é válido

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');
  // ',' no array, pq indico que na desestruturação não vou usar a primeira
  // posição (no caso 'Bearer')

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload; // decoded não sabe de q tipo é
    // então o as força que o decoded é do tiop TokenPayload

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
