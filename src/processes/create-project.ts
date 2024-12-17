import { askPackageName } from '../prompts/ask-package-name';

export const createProject = async () => {
  const packageName = await askPackageName();
  console.log(packageName);
};
