#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

import { findUp } from 'find-up';

import { addPackage } from './processes/add-package';
import { createProject } from './processes/create-project';

const main = async () => {
  const packageJsonPath = await findUp('package.json');
  if (packageJsonPath) {
    const projectDirectory = path.dirname(packageJsonPath);
    if (
      fs.existsSync(path.resolve(projectDirectory, './packages'))
      && fs.existsSync(path.resolve(projectDirectory, './pnpm-workspace.yaml'))
    ) {
      return addPackage(packageJsonPath);
    }
  }

  await createProject();
};

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
