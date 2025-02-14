import fs from 'node:fs';

import writeChangeset from '@changesets/write';
import { cancel, intro, log, outro, tasks } from '@clack/prompts';
import { execa } from 'execa';
import pc from 'picocolors';

import { clearDirectory } from '../helpers/clear-directory';
import { copyDirectory } from '../helpers/copy-directory';
import { copyFile } from '../helpers/copy-file';
import { findMissingCommands } from '../helpers/find-missing-commands';
import { getGitRepositoryName } from '../helpers/get-git-repository-name';
import { getLatestGitTag } from '../helpers/get-latest-git-tag';
import { getPackageVersion } from '../helpers/get-package-version';
import { getTemplatePath } from '../helpers/get-template-path';
import { initializeChangeset } from '../helpers/initialize-changeset';
import { isEmptyDirectory } from '../helpers/is-empty-directory';
import { isWriteable } from '../helpers/is-writeable';
import { updatePackageVersions } from '../helpers/update-package-versions';
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

import type { PackageJson } from 'type-fest';

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
  const packageDirectory = `packages/${packageName.split('/').at(-1)}`;

  await tasks([
    {
      title: 'Creating project files.',
      task: async () => {
        const copyLicense = async (directory: string): Promise<void> => {
          await copyFile(getTemplatePath(license.templatePath), `${directory}/LICENSE`, (content) => {
            return content.replace(`{authorName}`, author);
          });
        };

        const copyGitIgnore = async (type: string, directory: string): Promise<void> => {
          await copyFile(getTemplatePath(`gitignore/${type}/gitignore`), `${directory}/.gitignore`);
        };

        await copyDirectory(getTemplatePath('projects/base'), projectDirectory);
        await copyLicense(projectDirectory);

        if (requireMultiPackage) {
          await copyDirectory(getTemplatePath('projects/workspace-root'), projectDirectory);
          await copyDirectory(getTemplatePath('projects/workspace-package'), `${projectDirectory}/${packageDirectory}`);
          await copyLicense(`${projectDirectory}/${packageDirectory}`);
          await copyGitIgnore('workspace-root', projectDirectory);
          await fs.promises.writeFile(`${projectDirectory}/README.md`, `# ${repositoryName.split('/').at(-1)}\n`);
          await fs.promises.writeFile(`${projectDirectory}/${packageDirectory}/README.md`, `# ${packageName}\n\n${description}\n`);
        } else {
          await copyDirectory(getTemplatePath('projects/single-package'), projectDirectory);
          await copyGitIgnore('single-package', projectDirectory);
          await fs.promises.writeFile(`${projectDirectory}/README.md`, `# ${packageName}\n\n${description}\n`);
        }

        return 'The project files were created.';
      },
    },
    {
      title: 'Creating package.json file.',
      task: async () => {
        if (requireMultiPackage) {
          await copyFile(getTemplatePath('package-json/workspace-root/package.json'), `${projectDirectory}/package.json`, async (content) => {
            const packageJson = JSON.parse(content) as PackageJson;

            packageJson.name = repositoryName.split('/').at(-1)!;
            packageJson.devDependencies = await updatePackageVersions(packageJson.devDependencies || {});
            packageJson.packageManager = `pnpm@${await getPackageVersion('pnpm')}`;

            return `${JSON.stringify(packageJson, null, 2)}\n`;
          });

          await copyFile(getTemplatePath('package-json/workspace-package/package.json'), `${projectDirectory}/${packageDirectory}/package.json`, async (content) => {
            const packageJson = JSON.parse(content) as PackageJson;

            packageJson.name = packageName;
            packageJson.description = description;
            packageJson.keywords = keywords;
            packageJson.homepage = `https://github.com/${repositoryName}/blob/main/${packageDirectory}/README.md`;
            packageJson.bugs = { url: `https://github.com/${repositoryName}/issues` };
            packageJson.repository = { type: 'git', url: `git+https://github.com/${repositoryName}.git`, directory: packageDirectory };
            packageJson.license = license.identifier;
            packageJson.author = author;

            packageJson.devDependencies = await updatePackageVersions(packageJson.devDependencies || {});

            return `${JSON.stringify(packageJson, null, 2)}\n`;
          });
        } else {
          await copyFile(getTemplatePath('package-json/single-package/package.json'), `${projectDirectory}/package.json`, async (content) => {
            const packageJson = JSON.parse(content) as PackageJson;

            packageJson.name = packageName;
            packageJson.description = description;
            packageJson.keywords = keywords;
            packageJson.homepage = `https://github.com/${repositoryName}/blob/main/README.md`;
            packageJson.bugs = { url: `https://github.com/${repositoryName}/issues` };
            packageJson.repository = { type: 'git', url: `git+https://github.com/${repositoryName}.git` };
            packageJson.license = license.identifier;
            packageJson.author = author;

            packageJson.devDependencies = await updatePackageVersions(packageJson.devDependencies || {});
            packageJson.packageManager = `pnpm@${await getPackageVersion('pnpm')}`;

            return `${JSON.stringify(packageJson, null, 2)}\n`;
          });
        }

        return 'The package.json file was created.';
      },
    },
    {
      title: 'Creating GitHub Actions workflow files.',
      task: async () => {
        await copyDirectory(getTemplatePath('github'), `${projectDirectory}/.github`, async (content) => {
          let newContent = content;

          const matches = new Set([...content.matchAll(/uses: (.*)@/g)].map((match) => match[1]!));
          await Promise.all([...matches].map(async (match) => {
            const tag = await getLatestGitTag(match);
            newContent = newContent.replaceAll(`${match}@`, `${match}@${tag.hash} # ${tag.name}`);
          }));

          return newContent;
        });

        return 'The GitHub Actions workflow files were created.';
      },
    },
    {
      title: 'Installing dependencies.',
      task: async () => {
        await execa('pnpm', ['install'], { cwd: projectDirectory });
        return 'Installed dependencies.';
      },
    },
    {
      title: 'Initializing changeset.',
      task: async () => {
        await initializeChangeset(projectDirectory, repositoryName);
        await writeChangeset({
          summary: 'First release',
          releases: [{ type: 'major', name: packageName }],
        }, projectDirectory);
        return 'Initialized changeset.';
      },
    },
    {
      title: 'Initializing git repository.',
      enabled: !fs.existsSync(`${projectDirectory}/.git`),
      task: async () => {
        await execa('git', ['init'], { cwd: projectDirectory });
        await execa('git', ['add', '.'], { cwd: projectDirectory });
        await execa('git', ['commit', '-m', 'Initial commit'], { cwd: projectDirectory });
        await execa('git', ['remote', 'add', 'origin', `https://github.com/${repositoryName}.git`], { cwd: projectDirectory });
        return 'Initialized git repository.';
      },
    },
  ]);

  outro(pc.bgGreen(` ${pc.black('Project created successfully.')} `));
};
