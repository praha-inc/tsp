#!/usr/bin/env node
import { findPackageJson } from './helpers/find-package-json';
import { addPackage } from './processes/add-package';
import { createProject } from './processes/create-project';

const main = async () => {
  const packageJson = await findPackageJson();
  if (packageJson) {
    addPackage(packageJson);
  } else {
    await createProject();
  }
};

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
