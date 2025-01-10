import { cancel } from '@clack/prompts';
import { describe, expect, it, vi } from 'vitest';

import { handleCancelPrompt } from './handle-cancel-prompt';

vi.mock('@clack/prompts');

describe('handleCancelPrompt', () => {
  it('should cancel the operation and exit the process', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    handleCancelPrompt();

    expect(cancel).toHaveBeenCalledWith('Operation cancelled');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
