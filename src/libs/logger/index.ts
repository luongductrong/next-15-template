export type LogFn = (...args: unknown[]) => void;

export { default as log } from './log';
export { default as warn } from './warn';
export { default as info } from './info';
export { default as error } from './error';
// Tree-shaking will remove unused log types in the final bundle.
