// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';

import { licenses } from '../constants/license';
import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

import type { License } from '../constants/license';

export const askLicense = async (): Promise<License> => {
  const result = await prompts({
    type: 'select',
    name: 'license',
    message: 'choose a license:',
    choices: licenses.map((license) => {
      return ({ title: `${license.name} (${license.identifier})`, value: license });
    }),
  }, {
    onCancel: handleCancelPrompt,
  });

  return result.license as License;
};
