import fs from 'node:fs/promises';
import path from 'node:path';

import { defaultWrittenConfig } from '@changesets/config';

import { copyDirectory } from './copy-directory';

export const initializeChangeset = async (directory: string, repositoryName: string): Promise<void> => {
  const changesetDirectory = path.resolve(directory, '.changeset');

  const changesetCliDirectory = path.dirname(import.meta.resolve('@changesets/cli/package.json')).replace(/^file:\/\//, '');
  await copyDirectory(path.resolve(changesetCliDirectory, `./default-files`), changesetDirectory);

  await fs.writeFile(path.resolve(changesetDirectory, 'config.json'), `${JSON.stringify({
    ...defaultWrittenConfig,
    changelog: [
      '@changesets/changelog-github',
      { repo: repositoryName },
    ],
    access: 'public',
    baseBranch: 'main',
  }, null, 2)}\n`);
};
