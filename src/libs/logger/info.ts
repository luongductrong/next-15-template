type LogFn = (...args: unknown[]) => void;

const isClient = typeof window !== 'undefined';
const isServer = !isClient;
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

function createInfoLogger(condition: boolean): LogFn {
  return (...args) => {
    if (condition) console.info(...args);
  };
}

const info = {
  // logging everywhere
  all: console.info,
  // ----- Execution Environment -----
  server: createInfoLogger(isServer),
  client: createInfoLogger(isClient),
  // ----- Build Environment -----
  dev: createInfoLogger(isDev),
  prod: createInfoLogger(isProd),
  // ----- Combination -----
  serverDev: createInfoLogger(isServer && isDev),
  serverProd: createInfoLogger(isServer && isProd),
  clientDev: createInfoLogger(isClient && isDev),
  clientProd: createInfoLogger(isClient && isProd),
};

export default info;
