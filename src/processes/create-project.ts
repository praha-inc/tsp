import fs from 'node:fs';

import { cancel, intro, log, outro, tasks } from '@clack/prompts';
import pc from 'picocolors';

import { clearDirectory } from '../helpers/clear-directory';
import { copyDirectory } from '../helpers/copy-directory';
import { copyFile } from '../helpers/copy-file';
import { findMissingCommands } from '../helpers/find-missing-commands';
import { getGitRepositoryName } from '../helpers/get-git-repository-name';
import { getTemplatePath } from '../helpers/get-template-path';
import { isEmptyDirectory } from '../helpers/is-empty-directory';
import { isWriteable } from '../helpers/is-writeable';
import { askAuthor } from '../prompts/ask-author';
import { askClearDirectory } from '../prompts/ask-clear-directory';
import { askLicense } from '../prompts/ask-license';
import { askMultiPackage } from '../prompts/ask-multi-package';
import { askPackageDescription } from '../prompts/ask-package-description';
import { askPackageKeywords } from '../prompts/ask-package-keywords';
import { askPackageName } from '../prompts/ask-package-name';
import { askPathExistsContinue } from '../prompts/ask-path-exists-continue';
import { askProjectDirectory } from '../prompts/ask-project-directory';
import { askRepositoryName } from '../prompts/ask-repository-name';

export const createProject = async () => {
  intro(pc.bgCyan(` ${pc.black('tsp: Create a new project.')} `));

  await tasks([{
    title: 'Checking required tools.',
    task: async () => {
      const missingCommands = await findMissingCommands(['git', 'pnpm']);
      if (0 < missingCommands.length) {
        cancel(`Please install the following tools: ${missingCommands.join(', ')}`);
        return process.exit(1);
      }
    },
  }]);

  const packageName = await askPackageName();
  const requireMultiPackage = await askMultiPackage();

  const projectDirectory = await askProjectDirectory(packageName);
  if (!isWriteable(projectDirectory)) {
    cancel(`Target directory ${projectDirectory} is not writeable.`);
    return process.exit(1);
  }

  if (fs.existsSync(projectDirectory) && !isEmptyDirectory(projectDirectory)) {
    const choice = await askPathExistsContinue(projectDirectory);
    switch (choice) {
      case 'no': {
        cancel('Operation cancelled.');
        return process.exit(1);
      }
      case 'yes': {
        if (!await askClearDirectory(projectDirectory)) {
          cancel('Operation cancelled.');
          return process.exit(1);
        }
        await tasks([{
          title: `Removing existing files in ${pc.green(projectDirectory)}.`,
          task: async () => {
            await clearDirectory(projectDirectory);
            return 'Existing files removed.';
          },
        }]);
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
  const description = await askPackageDescription();
  const keywords = await askPackageKeywords();
  const license = await askLicense();
  const repositoryName = await getGitRepositoryName(projectDirectory) || await askRepositoryName();

  log.info(`Creating a new package in ${pc.green(projectDirectory)}.`);

  const copyLicense = async (directory: string): Promise<void> => {
    await copyFile(getTemplatePath(license.templatePath), `${directory}/LICENSE`, (content) => {
      return content.replace(`{authorName}`, author);
    });
  };

  await tasks([{
    title: 'Creating project files.',
    task: async () => {
      await copyDirectory(getTemplatePath('projects/base'), projectDirectory);
      await copyLicense(projectDirectory);

      if (requireMultiPackage) {
        await copyDirectory(getTemplatePath('projects/workspace-root'), projectDirectory);
        await copyLicense(`${projectDirectory}/packages/${packageName.split('/').at(-1)}`);
      } else {
        await copyDirectory(getTemplatePath('projects/single-package'), projectDirectory);
      }

      return 'Project files created.';
    },
  }]);

  outro(pc.bgGreen(` ${pc.black('Project created successfully.')} `));
};
