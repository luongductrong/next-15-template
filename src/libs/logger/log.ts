import type { LogFn } from '@/libs/logger';

const isClient = typeof window !== 'undefined';
const isServer = !isClient;
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

function createLogger(condition: boolean): LogFn {
  return (...args) => {
    if (condition) console.log(...args);
  };
}

const log = {
  // logging everywhere
  all: console.log,
  // ----- Execution Environment -----
  server: createLogger(isServer),
  client: createLogger(isClient),
  // ----- Build Environment -----
  dev: createLogger(isDev),
  prod: createLogger(isProd),
  // ----- Combination -----
  serverDev: createLogger(isServer && isDev),
  serverProd: createLogger(isServer && isProd),
  clientDev: createLogger(isClient && isDev),
  clientProd: createLogger(isClient && isProd),
};

export default log;
