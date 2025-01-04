import { isCancel, text } from '@clack/prompts';
import validateNpmPackageName from 'validate-npm-package-name';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askPackageName = async (): Promise<string> => {
  const result = await text({
    message: 'Package name',
    placeholder: 'my-package',
    validate: (value: string) => {
      const result = validateNpmPackageName(value);
      if (result.validForNewPackages) return;

      const messages = [
        ...(result.errors || []),
        ...(result.warnings || []),
      ];
      return `Invalid package name: ${messages[0]}`;
    },
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
