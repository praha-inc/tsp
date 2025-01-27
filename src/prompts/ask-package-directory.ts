import path from 'node:path';

import { isCancel, text } from '@clack/prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askPackageDirectory = async (packageName: string): Promise<string> => {
  const result = await text({
    message: 'Where would you like to create a package?',
    placeholder: './packages/my-package',
    initialValue: `./packages/${packageName.split('/').at(-1)}`,
    validate: (value: string) => {
      if (value.length <= 0) return 'Directory name should not be empty';
      if (255 < value.length) return 'Directory name should be less than 256 characters';
      if (!path.resolve(value).startsWith(path.resolve('.'))) {
        return 'Directory name should not be outside of the current directory';
      }
      return;
    },
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
