import fs from 'fs';

export const writeToFile = <T>(obj: T, filename: string): void => {
  fs.writeFileSync(filename, JSON.stringify(obj, null, 2));
};
