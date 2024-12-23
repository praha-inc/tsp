import pc from 'picocolors';

export const handleCancelPrompt = () => {
  console.log(`${pc.red('✖')} Operation cancelled`);
  process.exit(1);
};
