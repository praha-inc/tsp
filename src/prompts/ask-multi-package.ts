import { isCancel, select } from '@clack/prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askMultiPackage = async (): Promise<boolean> => {
  const result = await select({
    message: 'Do you want a multi-package configuration?',
    options: [
      { value: false, label: 'No' },
      { value: true, label: 'Yes' },
    ],
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
