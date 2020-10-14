import { Configs, Middleware } from '@/core';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { middlewares } from './middlewares';
import OrphanagesRoutes from './routes/OrphanagesRoutes';

class Server {
  public static instance = () => Server._instance || new Server();
  private static _instance: Server;
  public app: express.Application;
  private _serverConfigs = Configs.Server;

  private constructor() {
    const { nodeEnv } = this._serverConfigs;
    console.debug(`Loading ${nodeEnv} server`);

    this.app = express();

    this.configureServer();
    this.applyMiddlewaresAndRoutes();

    Server._instance = this;
  }

  private configureServer(): void {
    console.debug('Configuring server');
    const { nodeEnv, port } = this._serverConfigs;

    if ('production' !== nodeEnv) this.app.enable('verbose errors');
    this.app.disable('x-powered-by');
    this.app.enable('trust proxy');

    this.app.set('port', port);
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
  }

  private applyMiddlewaresAndRoutes() {
    console.debug('Applying middlewares');
    const [errorHandler, ...requestMiddlewares] = middlewares;
    requestMiddlewares.filter(({ active }) => !!active).forEach(this.useMiddleware);

    this.configureRoutes();
    this.useMiddleware(errorHandler);
  }

  private useMiddleware = ({ handler, name }: Middleware) => {
    console.debug(`Applying ${name} middleware`);
    this.app.use(handler);
  };

  private configureRoutes(): void {
    console.debug('Applying routes');
    const router = express.Router();
    this.app.use(router);

    this.app.use('/orphanages', OrphanagesRoutes());
    this.app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));
  }
}

export default Server;
