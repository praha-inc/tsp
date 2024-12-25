import fs from 'node:fs';

export const copyFile = (source: string, destination: string, transform?: (content: string) => string): void => {
  if (transform) {
    const content = transform(fs.readFileSync(source, 'utf8'));
    fs.writeFileSync(destination, content);
  } else {
    fs.copyFileSync(source, destination);
  }
};
