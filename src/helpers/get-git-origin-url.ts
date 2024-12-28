import { execa } from 'execa';
import pc from 'picocolors';

export const getGitOriginUrl = async (directory: string): Promise<string | undefined> => {
  try {
    const result = await execa({ cwd: directory })`git config remote.origin.url`;

    const match = result.stdout.match(/(?:git@|https:\/\/)github.com[:/](.+)\/(.+).git/);
    if (!match) {
      console.log(`${pc.red('✖')} Does not support the git origin url format.`);
      return process.exit(1);
    }

    return `https://github.com/${match[1]}/${match[2]}`;
  } catch {
    return;
  }
};
