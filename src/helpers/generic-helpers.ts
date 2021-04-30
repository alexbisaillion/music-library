export const isNilOrEmpty = <T>(elements: T[] | undefined | null): boolean => !elements || elements.length === 0;

export const isNonNil = <T>(t: T | undefined): t is T => {
  return !!t;
};
