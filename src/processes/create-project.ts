import { askLicense } from '../prompts/ask-license';
import { askPackageName } from '../prompts/ask-package-name';
import { askProjectDirectory } from '../prompts/ask-project-directory';

export const createProject = async () => {
  const packageName = await askPackageName();
  const projectDirectory = await askProjectDirectory(packageName);
  const license = await askLicense();
  console.log({
    packageName,
    projectDirectory,
    license,
  });
};
