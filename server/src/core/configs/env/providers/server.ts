import { ServerConfigs, StringRecord } from '@/core/types';
import { config } from 'dotenv';

config();
const { PORT, NODE_ENV, PROXY_URL } = process.env as StringRecord;

const loadServerConfig = (): ServerConfigs => {
  ['PORT', 'NODE_ENV'].forEach(variable => {
    if (!(variable in process.env)) throw new Error(`Missing ${variable} in environments`);
  });

  return {
    port: +PORT,
    nodeEnv: NODE_ENV,
    proxyUrl: PROXY_URL || `http://localhost:${+PORT}`,
  };
};

export { loadServerConfig };
