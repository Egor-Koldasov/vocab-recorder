import delve from 'dlv';
import { Get } from 'type-fest';
import { Path } from './Path';

export const get = <P extends string, O extends {}>(object: O, path: P): Get<O, P> =>
  delve(object, path);

export const makeGet = <P extends string, O extends {}>(object: O) => (path: P): Get<O, P> =>
  delve(object, path);

export type { Path, Get };
