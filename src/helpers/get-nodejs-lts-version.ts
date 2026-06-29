type NodeRelease = {
  version: string;
  lts: string | false;
};

export const getNodejsLtsVersion = async (): Promise<string> => {
  const response = await fetch('https://nodejs.org/dist/index.json');
  const releases = await response.json() as NodeRelease[];
  const ltsRelease = releases.find((release) => release.lts !== false);
  if (!ltsRelease) throw new Error('No LTS release found');
  return ltsRelease.version.replace(/^v/, '');
};
