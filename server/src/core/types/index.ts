export * from './configs.types';
export * from './middlewares.types';

export type Any = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export type RecordSet<T> = Record<string, T>;
export type StringRecord = RecordSet<string>;
export type AnyRecord = RecordSet<Any>;

export type Null<T> = null | T;
