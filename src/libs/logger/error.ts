import type { LogFn } from '@/libs/logger';

const isClient = typeof window !== 'undefined';
const isServer = !isClient;
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

function createErrorLogger(condition: boolean): LogFn {
  return (...args) => {
    if (condition) console.error(...args);
  };
}

const error = {
  // logging everywhere
  all: console.error,
  // ----- Execution Environment -----
  server: createErrorLogger(isServer),
  client: createErrorLogger(isClient),
  // ----- Build Environment -----
  dev: createErrorLogger(isDev),
  prod: createErrorLogger(isProd),
  // ----- Combination -----
  serverDev: createErrorLogger(isServer && isDev),
  serverProd: createErrorLogger(isServer && isProd),
  clientDev: createErrorLogger(isClient && isDev),
  clientProd: createErrorLogger(isClient && isProd),
};

export default error;
