import AppError from "@shared/errors/AppError";
import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth'


interface ITokerPayload {
  iat: number;
  exp: number;
  sub: string
}


export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.')
  };

  const [, token] = authHeader.split(' ');


  try {
    const decodedToken = verify(token, authConfig.jwt.secrete);

    console.log(decodedToken);

    const { sub } = decodedToken as ITokerPayload;



    request.user = {
      id: sub
    }

    return next();

  } catch {
    throw new AppError('Invalid JWT Token.')
  }
}
