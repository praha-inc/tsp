import { cancel } from '@clack/prompts';

export const handleCancelPrompt = () => {
  cancel('Operation cancelled');
  process.exit(1);
};
