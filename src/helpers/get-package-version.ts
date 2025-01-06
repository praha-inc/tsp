import { execa } from 'execa';

export const getPackageVersion = async (packageName: string): Promise<string> => {
  const { stdout } = await execa('pnpm', ['view', packageName, 'version']);
  return stdout;
};
