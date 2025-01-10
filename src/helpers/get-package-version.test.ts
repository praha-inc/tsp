import { execa } from 'execa';
import { describe, expect, it, vi } from 'vitest';

import { getPackageVersion } from './get-package-version';

vi.mock('execa');

describe('getPackageVersion', () => {
  it('should return the package version', async () => {
    // @ts-ignore
    vi.mocked(execa).mockResolvedValue({ stdout: '1.0.0' });

    const result = await getPackageVersion('package');

    expect(result).toEqual('1.0.0');
  });

  it('should throw an error if the command fails', async () => {
    // @ts-ignore
    vi.mocked(execa).mockRejectedValue(new Error('error'));

    await expect(getPackageVersion('package')).rejects.toThrow('error');
  });
});
