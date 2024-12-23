// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';

import { License } from '../constants/license';
import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

export const askLicense = async (): Promise<License> => {
  const result = await prompts({
    type: 'select',
    name: 'license',
    message: 'choose a license:',
    choices: Object.values(License).map((license) => {
      return ({ title: license, value: license });
    }),
  }, {
    onCancel: handleCancelPrompt,
  });

  return String(result.license) as License;
};
