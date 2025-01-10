import { vol } from 'memfs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { isEmptyDirectory } from './is-empty-directory';

import type { fs } from 'memfs';

vi.mock('node:fs', async () => {
  const memfs: { fs: typeof fs } = await vi.importActual('memfs');
  return {
    default: memfs.fs,
    ...memfs.fs,
  };
});

describe('isEmptyDirectory', () => {
  beforeEach(() => {
    vol.reset();
  });

  it('should return true if the directory is empty', () => {
    vol.fromJSON({
      './test': null,
    });

    const result = isEmptyDirectory('./test');

    expect(result).toBe(true);
  });

  it('should return true if the directory only contains .git', () => {
    vol.fromJSON({
      './test/.git': '',
    });

    const result = isEmptyDirectory('./test');

    expect(result).toBe(true);
  });

  it('should return false if the directory contains files', () => {
    vol.fromJSON({
      './test/file': '',
    });

    const result = isEmptyDirectory('./test');

    expect(result).toBe(false);
  });
});
