import fs from 'node:fs/promises';

export const copyFile = async (
  source: string,
  destination: string,
  transform?: (content: string) => string,
): Promise<void> => {
  if (transform) {
    const content = transform(await fs.readFile(source, 'utf8'));
    await fs.writeFile(destination, content);
  } else {
    await fs.copyFile(source, destination);
  }
};
