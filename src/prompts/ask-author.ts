// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';
import { username } from 'username';

export const askAuthor = async (): Promise<string> => {
  const result = await prompts({
    type: 'text',
    name: 'author',
    message: 'author name:',
    initial: await username(),
  });

  return String(result.author);
};
