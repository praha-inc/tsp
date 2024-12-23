import fs from 'node:fs';
import path from 'node:path';

export const clearDirectory = (directory: string): void => {
  if (!fs.existsSync(directory)) {
    return;
  }

  for (const file of fs.readdirSync(directory)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(directory, file), { recursive: true, force: true });
  }
};
