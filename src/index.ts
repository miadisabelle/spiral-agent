#!/usr/bin/env node
import 'dotenv/config';
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import { logger } from './utils/logger.js';
import { SpiralAgent } from './agent/SpiralAgent.js';
import { DatabaseManager } from './utils/database.js';

const program = new Command();

// Beautiful ASCII art banner
function showBanner() {
  const title = figlet.textSync('SPIRAL AGENT', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });
  
  const gradientTitle = gradient(['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'])
    .multiline(title);
  
  const subtitle = chalk.italic.cyan('✦ Autonomous CLI Agent for Complex Development Tasks ✦');
  const version = chalk.dim.gray(`v1.0.0`);
  
  console.log('\n');
  console.log(gradientTitle);
  console.log(subtitle);
  console.log(version);
  console.log('\n');
}

// Initialize the application
async function initialize() {
  try {
    // Initialize database
    await DatabaseManager.initialize();
    logger.info('🗄️  Database initialized');
  } catch (error) {
    logger.error('Failed to initialize application', { error });
    process.exit(1);
  }
}

// Configure the CLI
program
  .name('spiral')
  .description('✦ Spiral Agent - An autonomous CLI that thinks, plans, and executes complex development tasks ✦')
  .version('1.0.0');

// Main agent command
program
  .command('agent')
  .description('🤖 Start the autonomous agent')
  .argument('[objective]', 'The objective for the agent to accomplish')
  .option('-v, --verbose', 'Enable verbose logging')
  .option('-d, --dry-run', 'Show what the agent would do without executing')
  .option('--model <model>', 'LLM model to use', 'gpt-4')
  .option('--max-steps <steps>', 'Maximum number of steps', '50')
  .action(async (objective, options) => {
    showBanner();
    await initialize();
    
    const agent = new SpiralAgent({
      verbose: options.verbose,
      dryRun: options.dryRun,
      model: options.model,
      maxSteps: parseInt(options.maxSteps),
    });
    
    if (objective) {
      logger.info(`🎯 Starting autonomous mission: ${chalk.yellow(objective)}`);
      await agent.executeObjective(objective);
    } else {
      logger.info('🤖 Starting interactive agent mode...');
      await agent.startInteractiveMode();
    }
  });

// Memory commands
const memoryCmd = program
  .command('memory')
  .description('🧠 Manage agent memory and context');

memoryCmd
  .command('search')
  .description('🔍 Search agent memory')
  .argument('<query>', 'Search query')
  .option('-n, --limit <limit>', 'Number of results', '10')
  .action(async (query, options) => {
    const agent = new SpiralAgent({});
    const results = await agent.searchMemory(query, parseInt(options.limit));
    
    console.log(boxen(
      `Found ${results.length} memories matching "${chalk.yellow(query)}"`,
      { padding: 1, borderColor: 'cyan', title: '🧠 Memory Search' }
    ));
    
    results.forEach((result, idx) => {
      console.log(`\n${chalk.cyan(`${idx + 1}.`)} ${result.content}`);
      console.log(chalk.dim.gray(`   Context: ${result.context}`));
    });
  });

// Status command
program
  .command('status')
  .description('📊 Show agent status and health')
  .action(async () => {
    showBanner();
    await initialize();
    
    const agent = new SpiralAgent({});
    const status = await agent.getStatus();
    
    console.log(boxen(
      [
        `${chalk.green('●')} Status: ${status.healthy ? chalk.green('Healthy') : chalk.red('Unhealthy')}`,
        `${chalk.blue('●')} Memory: ${status.memoryCount} entries`,
        `${chalk.magenta('●')} Plugins: ${status.pluginCount} loaded`,
        `${chalk.yellow('●')} Last Activity: ${status.lastActivity || 'Never'}`,
        `${chalk.cyan('●')} Uptime: ${status.uptime}`,
      ].join('\n'),
      { 
        padding: 1, 
        borderColor: status.healthy ? 'green' : 'red', 
        title: '📊 Spiral Agent Status' 
      }
    ));
  });

// Interactive mode
program
  .command('interactive')
  .alias('i')
  .description('💬 Start interactive conversation with the agent')
  .action(async () => {
    showBanner();
    await initialize();
    
    const agent = new SpiralAgent({});
    await agent.startInteractiveMode();
  });

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

async function main() {
  // --- Plugin Loading Logic ---
  const pluginsDir = path.join(dirname(fileURLToPath(import.meta.url)), 'plugins');

  if (fs.existsSync(pluginsDir)) {
    const pluginPromises = fs.readdirSync(pluginsDir)
      .filter(file => file.endsWith('.js'))
      .map(async (file) => {
        const pluginPath = path.join(pluginsDir, file);
        try {
          const plugin = await import(pluginPath);
          if (plugin.register && typeof plugin.register === 'function') {
            plugin.register(program);
            console.log(`Plugin loaded: ${file}`);
          }
        } catch (error) {
          console.error(`Failed to load plugin ${file}:`, error);
        }
      });
    await Promise.all(pluginPromises);
  }
  // --- End Plugin Loading Logic ---

  program.parse(process.argv);
}

main();