import mergeWith from 'lodash/mergeWith';
import { Merge } from 'type-fest';

export const mergeExceptArrays = <T1, T2>(target: T1, src: T2): Merge<T1, T2> =>
  mergeWith(target, src, (targetValue: unknown, srcValue: unknown) => {
    if (Array.isArray(targetValue) && Array.isArray(srcValue)) {
      return srcValue;
    }
    return undefined;
  });
