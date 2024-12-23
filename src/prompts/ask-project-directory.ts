// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askProjectDirectory = async (packageName: string): Promise<string> => {
  const result = await prompts({
    type: 'text',
    name: 'projectDirectory',
    message: 'project directory:',
    initial: packageName.split('/').at(-1),
    validate: (value: string) => {
      return [...value].length <= 255;
    },
  }, {
    onCancel: handleCancelPrompt,
  });

  return String(result.projectDirectory);
};
