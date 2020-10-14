import { RequestHandler, ErrorRequestHandler } from 'express';

export type Middlewares = 'request' | 'error';

export type Middleware<T extends Middlewares = Middlewares> = {
  id?: string;
  name: string;
  handler: T extends 'error' ? ErrorRequestHandler : RequestHandler;
  active?: boolean;
};
