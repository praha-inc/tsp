import { isCancel, select } from '@clack/prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export type AskPathExistsContinueChoice = 'no' | 'yes' | 'ignore';

export const askPathExistsContinue = async (projectDirectory: string): Promise<AskPathExistsContinueChoice> => {
  const isCurrent = projectDirectory === '.';

  const result = await select({
    message: `${isCurrent ? 'Current directory' : `Target directory ${projectDirectory}`} is not empty. What do you want to do?`,
    options: [
      {
        label: 'Cancel operation',
        value: 'no',
      },
      {
        label: 'Remove existing files and continue',
        value: 'yes',
      },
      {
        label: 'Ignore files and continue',
        value: 'ignore',
      },
    ],
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
