// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';

import { getGitUserName } from '../helpers/get-git-user-name';
import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askAuthor = async (directory: string): Promise<string> => {
  const result = await prompts({
    type: 'text',
    name: 'author',
    message: 'author name:',
    initial: await getGitUserName(directory),
  }, {
    onCancel: handleCancelPrompt,
  });

  return String(result.author);
};
