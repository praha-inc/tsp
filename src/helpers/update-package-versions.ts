import { getPackageVersion } from './get-package-version';

import type { PackageJson } from 'type-fest';

export const updatePackageVersions = async (dependencies: PackageJson.Dependency): Promise<PackageJson.Dependency> => {
  return await Promise.all(
    Object.keys(dependencies).map(async (packageName) => {
      return { [packageName]: await getPackageVersion(packageName) };
    }),
  ).then((versions) => Object.assign({}, ...versions) as Record<string, string>);
};
