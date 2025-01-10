import { describe, expect, it, vi } from 'vitest';

import { getPackageVersion } from './get-package-version';
import { updatePackageVersions } from './update-package-versions';

vi.mock('./get-package-version');

describe('updatePackageVersions', () => {
  it('should return the latest package versions', async () => {
    // @ts-ignore
    vi.mocked(getPackageVersion).mockImplementation((name: string) => name === 'vitest' ? '1.0.0' : '2.0.0');

    const result = await updatePackageVersions({
      package: '',
      vitest: '',
    });

    expect(result).toEqual({
      package: '2.0.0',
      vitest: '1.0.0',
    });
  });
});
