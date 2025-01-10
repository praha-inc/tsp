import { describe, expect, it, vi } from 'vitest';
import which from 'which';

import { findMissingCommands } from './find-missing-commands';

vi.mock('which');

describe('findMissingCommands', () => {
  it('should return an empty array when all commands are found', async () => {
    const result = await findMissingCommands(['node', 'npm']);

    expect(result).toEqual([]);
  });

  it('should return an array of missing commands', async () => {
    vi.mocked(which).mockImplementation((command): Promise<string> => {
      return command === 'node' ? Promise.resolve('') : Promise.reject(new Error('not found'));
    });

    const result = await findMissingCommands(['node', 'nonexistent']);

    expect(result).toEqual(['nonexistent']);
  });
});
