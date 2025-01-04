import { isCancel, text } from '@clack/prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askPackageKeywords = async (): Promise<string[]> => {
  const result = await text({
    message: 'Package search keywords (comma separated)',
    placeholder: 'javascript, typescript',
    initialValue: 'javascript, typescript',
    validate: (value: string) => {
      if (value.length <= 0) return 'Keywords should not be empty';
      return;
    },
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result.split(',').map((keyword) => keyword.trim());
};
