import { createRequire } from 'node:module';
import path from 'node:path';

import { vol } from 'memfs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { initializeChangeset } from './initialize-changeset';

import type { Config } from '@changesets/types';
import type { fs } from 'memfs';

vi.mock('node:fs/promises', async () => {
  const memfs: { fs: typeof fs } = await vi.importActual('memfs');
  return {
    default: memfs.fs.promises,
    ...memfs.fs.promises,
  };
});

describe('initializeChangeset', () => {
  beforeEach(() => {
    vol.reset();

    const require = createRequire(import.meta.url);
    const changesetCliDirectory = path.dirname(require.resolve('@changesets/cli/package.json')).replace(/^file:\/\//, '');
    vol.fromJSON({
      [`${changesetCliDirectory}/default-files/README.md`]: 'test',
    });
  });

  it('should create a default files', async () => {
    const directory = './test';
    const repositoryName = 'user/repository';

    await initializeChangeset(directory, repositoryName);

    expect(vol.existsSync(`${directory}/.changeset/README.md`)).toBe(true);
  });

  it('should create a config.json', async () => {
    const directory = './test';
    const repositoryName = 'user/repository';

    await initializeChangeset(directory, repositoryName);

    const config = JSON.parse(vol.readFileSync(`${directory}/.changeset/config.json`) as string) as Config;
    expect(config.access).toBe('public');
    expect(config.baseBranch).toBe('main');
    expect(config.changelog).toEqual([
      '@changesets/changelog-github',
      { repo: repositoryName },
    ]);
  });
});
