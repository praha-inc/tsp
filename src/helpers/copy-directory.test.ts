import { fs, vol } from 'memfs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { copyDirectory } from './copy-directory';

vi.mock('node:fs/promises', async () => {
  const memfs: { fs: typeof fs } = await vi.importActual('memfs');
  return {
    default: memfs.fs.promises,
    ...memfs.fs.promises,
  };
});

describe('copyDirectory', () => {
  beforeEach(() => {
    vol.reset();
  });

  it('should copy all files and directories from the source directory to the destination directory', async () => {
    vol.fromJSON({
      './source/file1.txt': 'text',
      './source/file2.txt': 'text',
      './source/sub-directory/file.txt': 'text',
    });

    await copyDirectory('./source', './destination');

    expect(fs.existsSync('./destination/file1.txt')).toEqual(true);
    expect(fs.existsSync('./destination/file2.txt')).toEqual(true);
    expect(fs.existsSync('./destination/sub-directory/file.txt')).toEqual(true);
  });

  it('should apply the content transformation function to the copied files', async () => {
    vol.fromJSON({
      './source/file.txt': 'text',
    });

    await copyDirectory('./source', './destination', (content) => content.toUpperCase());

    expect(fs.readFileSync('./destination/file.txt', 'utf8')).toEqual('TEXT');
  });

  it('should throw an error if the source directory does not exist', async () => {
    await expect(copyDirectory('./source', './destination')).rejects.toThrowError();
  });
});
