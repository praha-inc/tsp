import fs from 'node:fs';

import pc from 'picocolors';

import { clearDirectory } from '../helpers/clear-directory';
import { copyDirectory } from '../helpers/copy-directory';
import { copyFile } from '../helpers/copy-file';
import { getTemplatePath } from '../helpers/get-template-path';
import { isEmptyDirectory } from '../helpers/is-empty-directory';
import { isWriteable } from '../helpers/is-writeable';
import { askAuthor } from '../prompts/ask-author';
import { askGitHubUrl } from '../prompts/ask-github-url';
import { askLicense } from '../prompts/ask-license';
import { askMultiPackage } from '../prompts/ask-multi-package';
import { askPackageName } from '../prompts/ask-package-name';
import { askPathExistsContinue } from '../prompts/ask-path-exists-continue';
import { askProjectDirectory } from '../prompts/ask-project-directory';

export const createProject = async () => {
  const packageName = await askPackageName();
  const requireMultiPackage = await askMultiPackage();

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

  const author = await askAuthor(projectDirectory);
  const license = await askLicense();
  const gitHubUrl = await askGitHubUrl();

  console.log(`Creating a new package in ${pc.green(projectDirectory)}.`);
  copyDirectory(getTemplatePath('projects/base'), projectDirectory);
  copyFile(getTemplatePath(license.templatePath), `${projectDirectory}/LICENSE`, (content) => {
    return content.replace(`{authorName}`, author);
  });

  if (requireMultiPackage) {
    copyDirectory(getTemplatePath('projects/workspace-root'), projectDirectory);
  } else {
    copyDirectory(getTemplatePath('projects/single-package'), projectDirectory);
  }
};
