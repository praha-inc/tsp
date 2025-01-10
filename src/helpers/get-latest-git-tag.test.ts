import { execa } from 'execa';
import { describe, expect, it, vi } from 'vitest';

import { getLatestGitTag } from './get-latest-git-tag';

vi.mock('execa');

describe('getLatestGitTag', () => {
  it('should return the latest git tag', async () => {
    // @ts-ignore
    vi.mocked(execa).mockResolvedValue({
      stdout: `
        hash1\trefs/tags/tag1
        hash2\trefs/tags/tag2
      `.trim(),
    });

    const result = await getLatestGitTag('repository');

    expect(result).toEqual({ name: 'tag2', hash: 'hash2' });
  });

  it('should throw an error if the command fails', async () => {
    // @ts-ignore
    vi.mocked(execa).mockRejectedValue(new Error('error'));

    await expect(getLatestGitTag('repository')).rejects.toThrow('error');
  });
});
