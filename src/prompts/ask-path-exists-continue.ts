// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';

export type AskPathExistsContinueChoice = 'no' | 'yes' | 'ignore';

export const askPathExistsContinue = async (projectDirectory: string): Promise<AskPathExistsContinueChoice> => {
  const isCurrent = projectDirectory === '.';

  const result = await prompts({
    type: 'select',
    name: 'pathExistsContinue',
    message: `${isCurrent ? 'Current directory' : `Target directory ${projectDirectory}`} is not empty. What do you want to do?`,
    choices: [
      {
        title: 'Cancel operation',
        value: 'no',
      },
      {
        title: 'Remove existing files and continue',
        value: 'yes',
      },
      {
        title: 'Ignore files and continue',
        value: 'ignore',
      },
    ],
  });

  return String(result.pathExistsContinue) as AskPathExistsContinueChoice;
};
