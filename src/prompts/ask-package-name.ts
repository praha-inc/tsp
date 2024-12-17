// eslint-disable-next-line import-x/no-named-as-default
import prompts from 'prompts';
import validateNpmPackageName from 'validate-npm-package-name';

export const askPackageName = async (): Promise<string> => {
  const result = await prompts({
    type: 'text',
    name: 'packageName',
    message: 'package name:',
    initial: 'my-package',
    validate: (value: string) => {
      const result = validateNpmPackageName(value);
      if (result.validForNewPackages) return true;

      const messages = [
        ...(result.errors || []),
        ...(result.warnings || []),
      ];
      return `Invalid package name: ${messages[0]}`;
    },
  });

  return String(result.packageName);
};
