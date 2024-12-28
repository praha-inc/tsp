// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askGitHubUrl = async (): Promise<string> => {
  const result = await prompts({
    type: 'text',
    name: 'gitHubUrl',
    message: 'GitHub Url:',
    validate: (value: string) => {
      if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(value)) {
        return 'Please enter a valid GitHub Url';
      }
      return true;
    },
  }, {
    onCancel: handleCancelPrompt,
  });

  return String(result.gitHubUrl);
};
