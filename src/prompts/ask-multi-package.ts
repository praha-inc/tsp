// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askMultiPackage = async (): Promise<boolean> => {
  const result = await prompts({
    type: 'toggle',
    name: 'requireMultiPackage',
    message: 'Do you want a multi-package configuration?',
    initial: false,
    active: 'yes',
    inactive: 'no',
  }, {
    onCancel: handleCancelPrompt,
  });

  return Boolean(result.requireMultiPackage);
};
