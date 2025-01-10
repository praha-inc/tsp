import fs from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

import { isWriteable } from './is-writeable';

vi.mock('node:fs');

describe('isWriteable', () => {
  it('should return true if the directory is writeable', () => {
    vi.mocked(fs.accessSync).mockReturnValue(undefined as never);

    const result = isWriteable('./test');

    expect(result).toBe(true);
  });

  it('should return false if the directory is not writeable', () => {
    vi.mocked(fs.accessSync).mockImplementation(() => {
      throw new Error('failed');
    });

    const result = isWriteable('./test');

    expect(result).toBe(false);
  });
});
