import { fs, vol } from 'memfs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { clearDirectory } from './clear-directory';

vi.mock('node:fs/promises', async () => {
  const memfs: { fs: typeof fs } = await vi.importActual('memfs');
  return {
    default: memfs.fs.promises,
    ...memfs.fs.promises,
  };
});

describe('clearDirectory', () => {
  beforeEach(() => {
    vol.reset();
  });

  it('should remove all files and directories in the directory', async () => {
    vol.fromJSON({
      './clear-directory/file1.txt': 'text',
      './clear-directory/file2.txt': 'text',
      './clear-directory/sub-directory/file.txt': 'text',
    });

    await clearDirectory('./clear-directory');

    expect(fs.readdirSync('./clear-directory')).toEqual([]);
    expect(fs.existsSync('./clear-directory/sub-directory')).toEqual(false);
  });

  it('should not remove files outside the directory', async () => {
    vol.fromJSON({
      './clear-directory/file.txt': 'text',
      './outside-directory/file.txt': 'text',
    });

    await clearDirectory('./clear-directory');

    expect(fs.readdirSync('./outside-directory')).toEqual(['file.txt']);
  });

  it('should throw an error if the directory does not exist', async () => {
    await expect(clearDirectory('./clear-directory')).rejects.toThrowError();
  });
});
