import fs from 'node:fs';

export const isEmptyDirectory = (directory: string): boolean => {
  const files = fs.readdirSync(directory);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
};
