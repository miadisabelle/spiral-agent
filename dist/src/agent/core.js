import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { logger } from '../utils/logger.js';
// Define Agent Actions
export async function read_file_action(filePath) {
    try {
        logger.info(`Agent Action: Reading file ${filePath}`);
        const content = fs.readFileSync(filePath, 'utf8');
        logger.success(`Successfully read file ${filePath}`);
        return content;
    }
    catch (error) {
        logger.error(`Failed to read file ${filePath}`, { error: error.message });
        throw error;
    }
}
export async function shell_command_action(command, cwd) {
    return new Promise((resolve, reject) => {
        logger.info(`Agent Action: Executing shell command: ${command}`);
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                logger.error(`Shell command failed: ${command}`, { error: error.message, stderr });
                return reject(error);
            }
            if (stderr) {
                logger.warn(`Shell command had stderr output: ${command}`, { stderr });
            }
            logger.success(`Shell command executed: ${command}`);
            resolve(stdout);
        });
    });
}
export async function runAgent(plan) {
    logger.info('Agent: Starting execution of plan...');
    for (const action of plan) {
        try {
            switch (action.type) {
                case 'read_file':
                    await read_file_action(action.payload.filePath);
                    break;
                case 'shell_command':
                    await shell_command_action(action.payload.command, action.payload.cwd);
                    break;
                default:
                    logger.warn(`Agent: Unknown action type: ${action.type}`);
            }
        }
        catch (error) {
            logger.error(`Agent: Action failed: ${action.type}`, { action, error: error.message });
            // In a real agent, this would trigger error recovery or replanning
            throw error; // Stop on first error for this basic agent
        }
    }
    logger.success('Agent: Plan execution completed.');
}
//# sourceMappingURL=core.js.map