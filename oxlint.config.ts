import { standard } from '@praha/oxlint-config-standard';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [
    standard(),
  ],
  ignorePatterns: [
    'templates',
  ],
  rules: {
    'unicorn/no-process-exit': 'off',
  },
});
