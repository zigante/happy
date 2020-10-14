import { Middleware, Middlewares } from '@/core';
import { uniqueId } from 'lodash';

const baseMiddleware = <T extends Middlewares>(_middleware: Middleware<T>): Middleware<T> => ({
  active: true,
  id: uniqueId(),
  ..._middleware,
});

export { baseMiddleware };
