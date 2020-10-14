import { baseMiddleware } from './baseMiddleware';

const errorsMiddleware = () =>
  baseMiddleware<'error'>({
    name: 'Error Handler',
    active: false,
    handler: (throwable, req, res) => {
      const { message, status = 500 } = throwable;
      const { ip, url, originalUrl } = req;

      const error = message || 'Not Found';
      res.setHeader('X-Error-Reason', error);

      return res.status(status).send({ error, url, originalUrl, ip });
    },
  });

export { errorsMiddleware };
