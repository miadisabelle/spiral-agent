import { Command } from 'commander';
import { SpiralAgent } from '../agent/SpiralAgent.js';
/**
 * Example command definition showing how to extend Spiral CLI
 * with custom commands that integrate with the agent system
 */
export declare function createExampleCommand(agent: SpiralAgent): Command;
/**
 * Register this command with the main CLI program
 * Usage in main index.ts:
 *
 * import { createExampleCommand } from './src/commands/example-command.js';
 * program.addCommand(createExampleCommand(spiralAgent));
 */
//# sourceMappingURL=example-command.d.ts.map