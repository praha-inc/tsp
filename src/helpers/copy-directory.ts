import fs from 'node:fs';
import path from 'node:path';

import { copyFile } from './copy-file';

export const copyDirectory = (source: string, destination: string) => {
  fs.mkdirSync(destination, { recursive: true });
  for (const file of fs.readdirSync(source)) {
    const sourceFile = path.resolve(source, file);
    const destinationFile = path.resolve(destination, file);

    const stat = fs.statSync(sourceFile);
    if (stat.isDirectory()) {
      copyDirectory(sourceFile, destinationFile);
    } else {
      copyFile(sourceFile, destinationFile);
    }
  }
};
