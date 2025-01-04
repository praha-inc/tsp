import { isCancel, text } from '@clack/prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askProjectDirectory = async (packageName: string): Promise<string> => {
  const result = await text({
    message: 'Where would you like to create the project?',
    placeholder: './my-package',
    initialValue: `./${packageName.split('/').at(-1)}`,
    validate: (value: string) => {
      if (value.length <= 0) return 'Directory name should not be empty';
      if (255 < value.length) return 'Directory name should be less than 256 characters';
      return;
    },
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
