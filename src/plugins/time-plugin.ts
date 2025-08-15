import { Command } from 'commander';

export function register(program: Command) {
  program
    .command('time')
    .description('Displays the current time')
    .action(() => {
      console.log(`Current time: ${new Date().toLocaleTimeString()}`);
    });
}