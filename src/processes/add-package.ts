import fs from 'node:fs';
import path from 'node:path';

import writeChangeset from '@changesets/write';
import { cancel, intro, log, outro, tasks } from '@clack/prompts';
import { execa } from 'execa';
import pc from 'picocolors';

import { clearDirectory } from '../helpers/clear-directory';
import { copyDirectory } from '../helpers/copy-directory';
import { copyFile } from '../helpers/copy-file';
import { findMissingCommands } from '../helpers/find-missing-commands';
import { getGitRepositoryName } from '../helpers/get-git-repository-name';
import { getTemplatePath } from '../helpers/get-template-path';
import { isEmptyDirectory } from '../helpers/is-empty-directory';
import { isWriteable } from '../helpers/is-writeable';
import { updatePackageVersions } from '../helpers/update-package-versions';
import { askAuthor } from '../prompts/ask-author';
import { askClearDirectory } from '../prompts/ask-clear-directory';
import { askLicense } from '../prompts/ask-license';
import { askPackageDescription } from '../prompts/ask-package-description';
import { askPackageDirectory } from '../prompts/ask-package-directory';
import { askPackageKeywords } from '../prompts/ask-package-keywords';
import { askPackageName } from '../prompts/ask-package-name';
import { askPathExistsContinue } from '../prompts/ask-path-exists-continue';
import { askRepositoryName } from '../prompts/ask-repository-name';

import type { PackageJson } from 'type-fest';

export const addPackage = async () => {
  intro(pc.bgCyan(` ${pc.black('tsp: Add a new package.')} `));

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
  const packageDirectory = await askPackageDirectory(packageName);
  if (!isWriteable(packageDirectory)) {
    cancel(`Target directory ${packageDirectory} is not writeable.`);
    return process.exit(1);
  }

  if (fs.existsSync(packageDirectory) && !isEmptyDirectory(packageDirectory)) {
    const choice = await askPathExistsContinue(packageDirectory);
    switch (choice) {
      case 'no': {
        cancel('Operation cancelled.');
        return process.exit(1);
      }
      case 'yes': {
        if (!await askClearDirectory(packageDirectory)) {
          cancel('Operation cancelled.');
          return process.exit(1);
        }
        await tasks([{
          title: `Removing existing files in ${pc.green(packageDirectory)}.`,
          task: async () => {
            await clearDirectory(packageDirectory);
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
    fs.mkdirSync(packageDirectory, { recursive: true });
  }

  const author = await askAuthor(packageDirectory);
  const description = await askPackageDescription();
  const keywords = await askPackageKeywords();
  const license = await askLicense();
  const repositoryName = await getGitRepositoryName(packageDirectory) || await askRepositoryName();

  log.info(`Creating a new package in ${pc.green(packageDirectory)}.`);

  await tasks([
    {
      title: 'Creating project files.',
      task: async () => {
        await copyDirectory(getTemplatePath('projects/workspace-package'), packageDirectory);
        await copyFile(getTemplatePath(license.templatePath), `${packageDirectory}/LICENSE`, (content) => {
          return content.replace(`{authorName}`, author);
        });
        await fs.promises.writeFile(`${packageDirectory}/README.md`, `# ${packageName}\n\n${description}\n`);

        return 'The project files were created.';
      },
    },
    {
      title: 'Creating package.json file.',
      task: async () => {
        await copyFile(getTemplatePath('package-json/workspace-package/package.json'), `${packageDirectory}/package.json`, async (content) => {
          const packageJson = JSON.parse(content) as PackageJson;

          packageJson.name = packageName;
          packageJson.description = description;
          packageJson.keywords = keywords;
          packageJson.homepage = `https://github.com/${repositoryName}/blob/main/${packageDirectory}/README.md`;
          packageJson.bugs = { url: `https://github.com/${repositoryName}/issues` };
          packageJson.repository = { type: 'git', url: `git+https://github.com/${repositoryName}.git`, directory: path.normalize(packageDirectory) };
          packageJson.license = license.identifier;
          packageJson.author = author;

          packageJson.devDependencies = await updatePackageVersions(packageJson.devDependencies || {});

          return `${JSON.stringify(packageJson, null, 2)}\n`;
        });

        return 'The package.json file was created.';
      },
    },
    {
      title: 'Installing dependencies.',
      task: async () => {
        await execa('pnpm', ['install']);
        return 'Installed dependencies.';
      },
    },
    {
      title: 'Adding changeset.',
      task: async () => {
        await writeChangeset({
          summary: 'First release',
          releases: [{ type: 'major', name: packageName }],
        }, '.');
        return 'The changeset was added.';
      },
    },
  ]);

  outro(pc.bgGreen(` ${pc.black('Package created successfully.')} `));
};
