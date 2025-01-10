import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

import { defaultWrittenConfig } from '@changesets/config';

import { copyDirectory } from './copy-directory';

export const initializeChangeset = async (directory: string, repositoryName: string): Promise<void> => {
  const changesetDirectory = path.resolve(directory, '.changeset');

  const require = createRequire(import.meta.url);
  const changesetCliDirectory = path.dirname(require.resolve('@changesets/cli/package.json')).replace(/^file:\/\//, '');
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
