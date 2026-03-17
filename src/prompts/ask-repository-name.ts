import { isCancel, text } from '@clack/prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askRepositoryName = async (): Promise<string> => {
  const result = await text({
    message: 'Repository name',
    placeholder: 'user/repository',
    validate: (value) => {
      if (!/^[\w-]+\/[\w-]+$/.test(value ?? '')) {
        return 'Please enter a valid repository name';
      }
      return;
    },
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
