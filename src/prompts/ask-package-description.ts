// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';

import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askPackageDescription = async (): Promise<string> => {
  const result = await prompts({
    type: 'text',
    name: 'description',
    message: 'package description:',
    initial: 'My awesome package',
  }, {
    onCancel: handleCancelPrompt,
  });

  return String(result.description);
};
