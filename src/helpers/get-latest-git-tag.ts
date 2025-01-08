import { execa } from 'execa';

export type GitTag = {
  name: string;
  hash: string;
};

export const getLatestGitTag = async (repository: string): Promise<GitTag> => {
  const repositoryUrl = `https://github.com/${repository}.git`;
  const result = await execa('git', ['ls-remote', '--tags', '--refs', '--sort=v:refname', repositoryUrl]);

  const latestTag = result.stdout.split('\n').at(-1)!;
  const [hash, tag] = latestTag.split('\t');

  return {
    name: tag!.replace('refs/tags/', ''),
    hash: hash!,
  };
};
