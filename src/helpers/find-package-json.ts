import { readFile } from 'node:fs/promises';

import { findUp } from 'find-up';
import pc from 'picocolors';

import type { PackageJson } from 'type-fest';

export const findPackageJson = async (): Promise<PackageJson | undefined> => {
  const path = await findUp('package.json');
  if (!path) return;
  console.log(pc.green('Found package.json at'), path);
  return JSON.parse(await readFile(path, 'utf8')) as PackageJson;
};
