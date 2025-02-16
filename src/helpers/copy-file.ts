import fs from 'node:fs/promises';
import path from 'node:path';

const map: Record<string, string> = {
  _gitignore: '.gitignore',
  _npmrc: '.npmrc',
};

const mapDirectory = (directory: string): string => {
  const fileName = map[path.basename(directory)];
  return fileName ? path.join(path.dirname(directory), fileName) : directory;
};

export const copyFile = async (
  source: string,
  destination: string,
  transform?: (content: string) => string | Promise<string>,
): Promise<void> => {
  const _destination = mapDirectory(destination);
  await fs.mkdir(path.dirname(_destination), { recursive: true });
  if (transform) {
    const content = await transform(await fs.readFile(source, 'utf8'));
    await fs.writeFile(_destination, content);
  } else {
    await fs.copyFile(source, _destination);
  }
};
