import { vol } from 'memfs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { copyFile } from './copy-file';

import type { fs } from 'memfs';

vi.mock('node:fs/promises', async () => {
  const memfs: { fs: typeof fs } = await vi.importActual('memfs');
  return {
    default: memfs.fs.promises,
    ...memfs.fs.promises,
  };
});

describe('copyFile', () => {
  beforeEach(() => {
    vol.reset();
  });

  it('should copy a file', async () => {
    vol.fromJSON({
      './source/file.txt': 'text',
    });

    await copyFile('./source/file.txt', './destination/file.txt');

    expect(vol.readFileSync('./destination/file.txt', 'utf8')).toEqual('text');
  });

  it('should apply a transformation to the content', async () => {
    vol.fromJSON({
      './source/file.txt': 'text',
    });

    await copyFile('./source/file.txt', './destination/file.txt', (content) => content.toUpperCase());

    expect(vol.readFileSync('./destination/file.txt', 'utf8')).toEqual('TEXT');
  });

  it('should throw an error if the source file does not exist', async () => {
    await expect(copyFile('./source/file.txt', './destination/file.txt')).rejects.toThrowError();
  });
});
