import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'//cuida dos erros de uma promessa
import { errors } from 'celebrate'
import cors from 'cors';
import routes from './routes';
import AppError from '../errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());//cors é usado para configurar e permitir navegadores de fazer requiciçoes na API, nessa caso deixamos para todo mundo o acesso
app.use(express.json());
app.use(routes);
app.use(errors())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});


