import { Command } from 'commander';
const program = new Command();
program
    .version('1.0.0')
    .description('A new CLI built with the CLI Foundation Toolkit');
program
    .command('hello')
    .description('Prints a greeting')
    .action(() => {
    console.log('Hello, World!');
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map