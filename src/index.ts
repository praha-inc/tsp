#!/usr/bin/env node
import fs from 'node:fs';

import { addPackage } from './processes/add-package';
import { createProject } from './processes/create-project';

const main = async () => {
  if (fs.existsSync('pnpm-workspace.yaml')) {
    return await addPackage();
  }

  await createProject();
};

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
