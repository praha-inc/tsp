import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const getTemplatePath = (directory: string): string => {
  return path.resolve(
    fileURLToPath(import.meta.url),
    `../../templates`,
    directory,
  );
};
