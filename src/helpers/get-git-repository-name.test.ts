import { execa } from 'execa';
import { describe, expect, it, vi } from 'vitest';

import { getGitRepositoryName } from './get-git-repository-name';

vi.mock('execa');

describe('getGitRepositoryName', () => {
  it('should return repository name when git ssh origin url is provided', async () => {
    // @ts-ignore
    vi.mocked(execa).mockReturnValue(() => ({ stdout: 'git@github.com:user/repo.git' }));

    const result = await getGitRepositoryName('./directory');

    expect(result).toBe('user/repo');
  });

  it('should return repository name when git https origin url is provided', async () => {
    // @ts-ignore
    vi.mocked(execa).mockReturnValue(() => ({ stdout: 'https://github.com/user/repo.git' }));

    const result = await getGitRepositoryName('./directory');

    expect(result).toBe('user/repo');
  });

  it('should return undefined when git origin url is invalid', async () => {
    // @ts-ignore
    vi.mocked(execa).mockReturnValue(() => ({ stdout: 'invalid-url' }));

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    const result = await getGitRepositoryName('/test-directory');

    expect(result).toBeUndefined();
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('should return undefined when git command fails', async () => {
    vi.mocked(execa).mockRejectedValue(new Error('command failed'));

    const result = await getGitRepositoryName('/test-directory');

    expect(result).toBeUndefined();
  });
});
