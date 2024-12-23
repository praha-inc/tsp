import fs from 'node:fs';

import pc from 'picocolors';

import { clearDirectory } from '../helpers/clear-directory';
import { isEmptyDirectory } from '../helpers/is-empty-directory';
import { isWriteable } from '../helpers/is-writeable';
import { askAuthor } from '../prompts/ask-author';
import { askLicense } from '../prompts/ask-license';
import { askPackageName } from '../prompts/ask-package-name';
import { askPathExistsContinue } from '../prompts/ask-path-exists-continue';
import { askProjectDirectory } from '../prompts/ask-project-directory';

export const createProject = async () => {
  const packageName = await askPackageName();

  const projectDirectory = await askProjectDirectory(packageName);
  if (!isWriteable(projectDirectory)) {
    console.log(`${pc.red('✖')} Target directory ${projectDirectory} is not writeable`);
    return process.exit(1);
  }

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

  const author = await askAuthor();
  const license = await askLicense();
  console.log({
    author,
    packageName,
    projectDirectory,
    license,
  });
};
