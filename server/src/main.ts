import Server from '@/api/Server';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import { Configs } from './core';

const run = () => {
  const { app } = Server.instance();
  const { port } = Configs.Server;

  app.listen(port, () => console.info(`Running on port ${port}`));
};
createConnection().then(() => run());
