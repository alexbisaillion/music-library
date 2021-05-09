export const isNilOrEmpty = <T>(elements: T[] | undefined | null): boolean => !elements || elements.length === 0;

export const isNonNil = <T>(t: T | undefined): t is T => {
  return !!t;
};

import fs from 'fs';

export const writeToFile = <T>(obj: T, filename: string): void => {
  fs.writeFileSync(filename, JSON.stringify(obj, null, 2));
};
