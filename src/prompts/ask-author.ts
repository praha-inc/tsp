// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';
import { username } from 'username';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askAuthor = async (): Promise<string> => {
  const result = await prompts({
    type: 'text',
    name: 'author',
    message: 'author name:',
    initial: await username(),
  }, {
    onCancel: handleCancelPrompt,
  });

  return String(result.author);
};
