import fs from 'node:fs';

import pc from 'picocolors';

import { clearDirectory } from '../helpers/clear-directory';
import { isEmptyDirectory } from '../helpers/is-empty-directory';
import { askLicense } from '../prompts/ask-license';
import { askPackageName } from '../prompts/ask-package-name';
import { askPathExistsContinue } from '../prompts/ask-path-exists-continue';
import { askProjectDirectory } from '../prompts/ask-project-directory';

export const createProject = async () => {
  const packageName = await askPackageName();

  const projectDirectory = await askProjectDirectory(packageName);
  if (fs.existsSync(projectDirectory) && !isEmptyDirectory(projectDirectory)) {
    const choice = await askPathExistsContinue(projectDirectory);
    switch (choice) {
      case 'no': {
        console.log(`${pc.red('✖')} Operation cancelled`);
        return process.exit(1);
      }
      case 'yes': {
        clearDirectory(projectDirectory);
        break;
      }
      case 'ignore': {
        break;
      }
    }
  } else {
    fs.mkdirSync(projectDirectory, { recursive: true });
  }

  const license = await askLicense();
  console.log({
    packageName,
    projectDirectory,
    license,
  });
};
