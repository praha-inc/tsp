import { describe, expect, it } from 'vitest';

import { getTemplatePath } from './get-template-path';

describe('getTemplatePath', () => {
  it('should return the path to the template directory', () => {
    const path = getTemplatePath('test');

    expect(path).toMatch(/src\/templates\/test$/);
  });
});
