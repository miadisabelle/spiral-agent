import { Command } from 'commander';
export function register(program) {
    program
        .command('time')
        .description('Displays the current time')
        .action(() => {
        console.log(`Current time: ${new Date().toLocaleTimeString()}`);
    });
}
//# sourceMappingURL=time-plugin.js.map