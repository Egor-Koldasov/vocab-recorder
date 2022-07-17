import mergeWith from 'lodash/fp/mergeWith';

export const mergeExceptArrays = mergeWith((targetValue: unknown, srcValue: unknown) => {
  if (Array.isArray(targetValue) && Array.isArray(srcValue)) {
    return srcValue;
  }
  return undefined;
});
