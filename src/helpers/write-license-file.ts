import fs from 'node:fs';

import { getTemplatePath } from './get-template-path';

import type { License } from '../constants/license';

export const writeLicenseFile = (license: License, author: string, directory: string) => {
  const templatePath = getTemplatePath(license.templatePath);
  const content = fs.readFileSync(templatePath, 'utf8').replace(`{authorName}`, author);
  fs.writeFileSync(directory, content);
};
