
import chalk from 'chalk';

type LogLevel = 'debug' | 'info' | 'success' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any> | undefined;
}

function log(level: LogLevel, message: string, context?: Record<string, any>) {
  const timestamp = new Date().toISOString();
  const logEntry: LogEntry = { timestamp, level, message, context };

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
  debug: (message: string, context?: Record<string, any>) => log('debug', message, context),
  info: (message: string, context?: Record<string, any>) => log('info', message, context),
  success: (message: string, context?: Record<string, any>) => log('success', message, context),
  warn: (message: string, context?: Record<string, any>) => log('warn', message, context),
  error: (message: string, context?: Record<string, any>) => log('error', message, context),
};
