import fs from 'node:fs/promises';
import path from 'node:path';

import { copyFile } from './copy-file';

export const copyDirectory = async (
  source: string,
  destination: string,
  transform?: (content: string) => string | Promise<string>,
): Promise<void> => {
  await fs.mkdir(destination, { recursive: true });
  const files = await fs.readdir(source);
  await Promise.all(files.map(async (file) => {
    const sourceFile = path.resolve(source, file);
    const destinationFile = path.resolve(destination, file);

    const stat = await fs.stat(sourceFile);
    // eslint-disable-next-line unicorn/prefer-ternary
    if (stat.isDirectory()) {
      await copyDirectory(sourceFile, destinationFile, transform);
    } else {
      await copyFile(sourceFile, destinationFile, transform);
    }
  }));
};
