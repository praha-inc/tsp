import { afterEach, describe, expect, it, vi } from 'vitest';

import { getNodejsLtsVersion } from './get-nodejs-lts-version';

describe('getNodejsLtsVersion', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return the latest LTS version', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([
        { version: 'v24.0.0', lts: false },
        { version: 'v22.12.0', lts: 'Jod' },
        { version: 'v20.18.0', lts: 'Iron' },
      ]),
    }));

    const result = await getNodejsLtsVersion();

    expect(result).toEqual('22.12.0');
  });

  it('should throw an error if no LTS release is found', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([
        { version: 'v24.0.0', lts: false },
      ]),
    }));

    await expect(getNodejsLtsVersion()).rejects.toThrow('No LTS release found');
  });
});
