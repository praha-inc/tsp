import { execa } from 'execa';

export const getGitUserName = async (directory: string): Promise<string> => {
  const result = await execa({ cwd: directory })`git config user.name`;
  return result.stdout;
};
