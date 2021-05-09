export const isNilOrEmpty = <T>(elements: T[] | undefined | null): boolean => !elements || elements.length === 0;

export const isNonNil = <T>(t: T | undefined): t is T => {
  return !!t;
};

import fs from 'fs';

export const writeToFile = <T>(obj: T, filename: string): void => {
  fs.writeFileSync(filename, JSON.stringify(obj, null, 2));
};

export enum SleepTime {
  Second = 1000,
  Minute = 60000,
  Hour = 60000 * 60
}
export const sleep = (time: SleepTime): Promise<void> => new Promise((resolve) => setTimeout(resolve, time));
