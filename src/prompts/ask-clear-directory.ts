import { confirm, isCancel } from '@clack/prompts';
import pc from 'picocolors';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askClearDirectory = async (directory: string): Promise<boolean> => {
  const result = await confirm({
    message: `May we remove existing files in ${pc.green(directory)}?`,
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
