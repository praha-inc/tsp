import fs from 'node:fs/promises';
import path from 'node:path';

export const copyFile = async (
  source: string,
  destination: string,
  transform?: (content: string) => string | Promise<string>,
): Promise<void> => {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  if (transform) {
    const content = await transform(await fs.readFile(source, 'utf8'));
    await fs.writeFile(destination, content);
  } else {
    await fs.copyFile(source, destination);
  }
};
