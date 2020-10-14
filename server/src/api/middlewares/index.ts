import { Middleware } from '@/core';
import { corsMiddleware } from './cors';
import { errorsMiddleware } from './errors';

const middlewares: Middleware<'error' | 'request'>[] = [errorsMiddleware(), corsMiddleware()];

export { middlewares };
