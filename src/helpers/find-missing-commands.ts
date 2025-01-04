import which from 'which';

export const findMissingCommands = async (commands: string[]): Promise<string[]> => {
  const missingCommands = await Promise.all(
    commands.map(async (command) => {
      try {
        await which(command);
        return;
      } catch {
        return command;
      }
    }),
  );

  return missingCommands.filter((command) => command !== undefined);
};
