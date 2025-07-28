import type { LogFn } from '@/libs/logger';

const isClient = typeof window !== 'undefined';
const isServer = !isClient;
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

function createWarnLogger(condition: boolean): LogFn {
  return (...args) => {
    if (condition) console.warn(...args);
  };
}

const warn = {
  // logging everywhere
  all: console.warn,
  // ----- Execution Environment -----
  server: createWarnLogger(isServer),
  client: createWarnLogger(isClient),
  // ----- Build Environment -----
  dev: createWarnLogger(isDev),
  prod: createWarnLogger(isProd),
  // ----- Combination -----
  serverDev: createWarnLogger(isServer && isDev),
  serverProd: createWarnLogger(isServer && isProd),
  clientDev: createWarnLogger(isClient && isDev),
  clientProd: createWarnLogger(isClient && isProd),
};

export default warn;
