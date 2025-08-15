import chalk from 'chalk';
function log(level, message, context) {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message, context };
    let formattedMessage = '';
    switch (level) {
        case 'debug':
            formattedMessage = chalk.dim.gray(`[DEBUG] ${message}`);
            break;
        case 'info':
            formattedMessage = chalk.blue(`[INFO] ${message}`);
            break;
        case 'success':
            formattedMessage = chalk.green(`[SUCCESS] ${message}`);
            break;
        case 'warn':
            formattedMessage = chalk.yellow(`[WARN] ${message}`);
            break;
        case 'error':
            formattedMessage = chalk.red(`[ERROR] ${message}`);
            break;
    }
    console.log(formattedMessage);
    if (context) {
        console.log(chalk.gray('  Context:'), JSON.stringify(context, null, 2));
    }
}
export const logger = {
    debug: (message, context) => log('debug', message, context),
    info: (message, context) => log('info', message, context),
    success: (message, context) => log('success', message, context),
    warn: (message, context) => log('warn', message, context),
    error: (message, context) => log('error', message, context),
};
//# sourceMappingURL=logger.js.map