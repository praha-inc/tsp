import fs from 'node:fs/promises';
import path from 'node:path';

export const clearDirectory = async (directory: string): Promise<void> => {
  const files = await fs.readdir(directory);
  await Promise.all(files.map(async (file) => {
    await fs.rm(path.resolve(directory, file), { recursive: true, force: true });
  }));
};
