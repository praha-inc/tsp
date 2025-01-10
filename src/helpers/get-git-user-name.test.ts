import { execa } from 'execa';
import { describe, expect, it, vi } from 'vitest';

import { getGitUserName } from './get-git-user-name';

vi.mock('execa');

describe('getGitUserName', () => {
  it('should return git user name', async () => {
    // @ts-ignore
    vi.mocked(execa).mockReturnValue(() => ({ stdout: 'username' }));

    const result = await getGitUserName('./directory');

    expect(result).toBe('username');
  });

  it('should throw an error when git command fails', async () => {
    // @ts-ignore
    vi.mocked(execa).mockReturnValue(() => {
      throw new Error('command failed');
    });

    await expect(getGitUserName('/test-directory')).rejects.toThrow('command failed');
  });
});
