import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';
const execAsync = promisify(exec);
export class ActionExecutor {
    dryRun;
    constructor(dryRun = false) {
        this.dryRun = dryRun;
    }
    /**
     * Execute an action based on its type
     */
    async execute(action) {
        if (this.dryRun) {
            logger.info(`${chalk.cyan('[DRY RUN]')} Would execute: ${action.type} - ${action.payload}`);
            return {
                success: true,
                data: `[DRY RUN] Simulated execution of ${action.type}`,
                output: `Would execute: ${action.type} with payload: ${action.payload}`,
            };
        }
        logger.info(`🔄 Executing ${chalk.yellow(action.type)}: ${action.payload}`);
        try {
            switch (action.type) {
                case 'READ':
                    return await this.executeRead(action.payload);
                case 'SHELL':
                    return await this.executeShell(action.payload);
                case 'CODE':
                    return await this.executeCode(action.payload);
                case 'INFO':
                    return await this.executeInfo(action.payload);
                case 'MEMORY':
                    return await this.executeMemory(action.payload);
                case 'FINISH':
                    return this.executeFinish(action.payload);
                default:
                    throw new Error(`Unknown action type: ${action.type}`);
            }
        }
        catch (error) {
            logger.error(`Failed to execute ${action.type}`, { error, action });
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }
    /**
     * READ: Read a file and return its contents
     */
    async executeRead(filePath) {
        try {
            // Clean up the file path (remove READ: prefix if present)
            const cleanPath = filePath.replace(/^READ:/, '').trim();
            // Resolve relative paths
            const absolutePath = path.resolve(cleanPath);
            // Security check - ensure we're not reading outside allowed directories
            if (this.isPathDangerous(absolutePath)) {
                throw new Error('Access denied: Path is outside allowed directories');
            }
            const content = await fs.readFile(absolutePath, 'utf8');
            logger.info(`📖 Read file: ${chalk.cyan(cleanPath)} (${content.length} characters)`);
            return {
                success: true,
                data: content,
                output: `Successfully read ${cleanPath} (${content.length} characters)`,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }
    /**
     * SHELL: Execute a shell command
     */
    async executeShell(command) {
        try {
            // Clean up the command (remove SHELL: prefix if present)
            const cleanCommand = command.replace(/^SHELL:/, '').trim();
            // Security check - prevent dangerous commands
            if (this.isDangerousCommand(cleanCommand)) {
                throw new Error('Dangerous command blocked for security');
            }
            logger.info(`🖥️  Executing: ${chalk.cyan(cleanCommand)}`);
            const { stdout, stderr } = await execAsync(cleanCommand, {
                timeout: 30000, // 30 second timeout
                maxBuffer: 1024 * 1024, // 1MB buffer
            });
            const output = stdout + stderr;
            if (stderr && stderr.trim()) {
                logger.warn('Command produced stderr:', { stderr: stderr.trim() });
            }
            return {
                success: true,
                data: { stdout, stderr },
                output: output.trim(),
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }
    /**
     * CODE: Write or modify code in a file
     */
    async executeCode(instruction) {
        try {
            // Parse the instruction: CODE:/path/to/file:description
            const parts = instruction.replace(/^CODE:/, '').split(':', 2);
            if (parts.length < 2) {
                throw new Error('CODE instruction must include file path and description');
            }
            const [filePath, description] = parts;
            if (!filePath) {
                throw new Error('No file path provided in CODE instruction');
            }
            const cleanPath = path.resolve(filePath.trim());
            // Security check
            if (this.isPathDangerous(cleanPath)) {
                throw new Error('Access denied: Path is outside allowed directories');
            }
            // For now, we'll create a simple implementation
            // In a full implementation, this would use the LLM to generate the actual code
            const placeholder = `// TODO: ${description}\\n// Generated by Spiral Agent\\n\\nfunction placeholder() {\\n  // Implementation needed\\n  console.log('${description}');\\n}\\n`;
            await fs.writeFile(cleanPath, placeholder, 'utf8');
            logger.info(`💻 Code written: ${chalk.cyan(cleanPath)}`);
            return {
                success: true,
                data: { filePath: cleanPath, description },
                output: `Code written to ${cleanPath}: ${description}`,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }
    /**
     * INFO: Provide information or ask for clarification
     */
    async executeInfo(message) {
        const cleanMessage = message.replace(/^INFO:/, '').trim();
        logger.info(`ℹ️  ${cleanMessage}`);
        // In a full implementation, this might interact with the user
        // or provide contextual information based on the current state
        return {
            success: true,
            data: { message: cleanMessage, type: 'info' },
            output: `Information: ${cleanMessage}`,
        };
    }
    /**
     * MEMORY: Search memory for relevant information
     */
    async executeMemory(query) {
        const cleanQuery = query.replace(/^MEMORY:/, '').trim();
        logger.info(`🧠 Memory search: ${chalk.cyan(cleanQuery)}`);
        // In a full implementation, this would search the vector database
        // For now, we'll return a placeholder
        return {
            success: true,
            data: { query: cleanQuery, results: [] },
            output: `Searched memory for: ${cleanQuery}`,
        };
    }
    /**
     * FINISH: Mark the objective as complete
     */
    executeFinish(message) {
        const cleanMessage = message.replace(/^FINISH:/, '').trim() || 'Objective completed';
        logger.info(`✅ ${chalk.green(cleanMessage)}`);
        return {
            success: true,
            data: { message: cleanMessage, completed: true },
            output: cleanMessage,
        };
    }
    /**
     * Security check for file paths
     */
    isPathDangerous(filePath) {
        const dangerous = [
            '/etc/',
            '/bin/',
            '/sbin/',
            '/usr/bin/',
            '/usr/sbin/',
            '/root/',
            '/home', // Only allow current user's home
        ];
        return dangerous.some(dangerousPath => filePath.startsWith(dangerousPath));
    }
    /**
     * Security check for shell commands
     */
    isDangerousCommand(command) {
        const dangerous = [
            'rm -rf',
            'sudo',
            'su ',
            'chmod 777',
            'wget',
            'curl',
            '> /dev/',
            'mkfs',
            'fdisk',
            'dd if=',
            'killall',
            'kill -9',
            'shutdown',
            'reboot',
            'halt',
            'init 0',
            'init 6',
        ];
        const lowerCommand = command.toLowerCase();
        return dangerous.some(cmd => lowerCommand.includes(cmd));
    }
}
//# sourceMappingURL=ActionExecutor.js.map