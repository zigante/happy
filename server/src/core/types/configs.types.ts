import { StringRecord } from './';

export type ServerConfigs = {
  port: number;
  nodeEnv: string;
  proxyUrl: string;
};

export type DatabaseConfigs = {
  type: string;
  database: string;
  migrations: string[];
  cli: StringRecord;
};
