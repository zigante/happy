import { baseMiddleware } from './baseMiddleware';

const corsMiddleware = () =>
  baseMiddleware<'request'>({
    name: 'Cors',
    handler: (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

      next();
    },
  });

export { corsMiddleware };
