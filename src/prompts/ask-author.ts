import { isCancel, text } from '@clack/prompts';

import { getGitUserName } from '../helpers/get-git-user-name';
import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askAuthor = async (directory: string): Promise<string> => {
  const result = await text({
    message: 'Author name',
    initialValue: await getGitUserName(directory),
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
