import { Command } from 'commander';
import { SpiralAgent } from '../agent/SpiralAgent.js';
import { logger } from '../utils/logger.js';

/**
 * Example command definition showing how to extend Spiral CLI
 * with custom commands that integrate with the agent system
 */
export function createExampleCommand(agent: SpiralAgent): Command {
  const command = new Command('example');
  
  command
    .description('🎯 Example command showing agent integration')
    .argument('<task>', 'Task to demonstrate')
    .option('--creative', 'Use creative mode')
    .action(async (task: string, options) => {
      try {
        logger.info(`🎪 Running example command: ${task}`);
        
        if (options.creative) {
          logger.info('🎨 Creative mode enabled!');
          
          // Use the Dream Engine for creative tasks
          const creative = await agent['dreamEngine'].generateIdea(task);
          logger.info(`💡 Creative inspiration: ${creative.title}`);
          logger.info(`📝 ${creative.content}`);
        } else {
          // Standard agent execution
          await agent.executeObjective(`example task: ${task}`);
        }
        
      } catch (error) {
        logger.error('Example command failed', { error });
      }
    });
    
  return command;
}

/**
 * Register this command with the main CLI program
 * Usage in main index.ts:
 * 
 * import { createExampleCommand } from './src/commands/example-command.js';
 * program.addCommand(createExampleCommand(spiralAgent));
 */
