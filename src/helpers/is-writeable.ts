import fs from 'node:fs';
import path from 'node:path';

export const isWriteable = (directory: string): boolean => {
  try {
    fs.accessSync(path.dirname(path.resolve(directory)), fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
};
