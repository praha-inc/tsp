import { isCancel, text } from '@clack/prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askPackageDescription = async (): Promise<string> => {
  const result = await text({
    message: 'Package description',
    placeholder: 'My awesome package',
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};