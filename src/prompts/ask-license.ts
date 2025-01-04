import { isCancel, select } from '@clack/prompts';

import { licenses } from '../constants/license';
import { handleCancelPrompt } from '../helpers/handle-cancel-prompt';

import type { License } from '../constants/license';

export const askLicense = async (): Promise<License> => {
  const result = await select({
    message: 'Which license do you want to use?',
    options: licenses.map((license) => {
      return ({ label: `${license.name} (${license.identifier})`, value: license });
    }),
  });

  if (isCancel(result)) {
    return handleCancelPrompt();
  }

  return result;
};
