import { isCancel, text } from '@clack/prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askGitHubUrl = async (): Promise<string> => {
  const result = await text({
    message: 'GitHub Repository Url',
    placeholder: 'https://github.com/username/repo',
    validate: (value: string) => {
      if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(value)) {
        return 'Please enter a valid GitHub Url';
      }
      return;
    },
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
