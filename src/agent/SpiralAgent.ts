import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';
import { ContextManager } from './ContextManager.js';
import { ActionExecutor } from './ActionExecutor.js';
import { LLMProvider } from './LLMProvider.js';
import { MemoryManager } from './MemoryManager.js';
import { PluginManager } from './PluginManager.js';
import { VisionSystem } from '../capabilities/VisionSystem.js';
import { DreamEngine } from '../capabilities/DreamEngine.js';
import { EmotionalIntelligence } from '../capabilities/EmotionalIntelligence.js';

export interface SpiralAgentConfig {
  verbose?: boolean;
  dryRun?: boolean;
  model?: string;
  maxSteps?: number;
  temperature?: number;
}

export interface AgentStatus {
  healthy: boolean;
  memoryCount: number;
  pluginCount: number;
  lastActivity?: string | undefined;
  uptime: string;
}

export interface MemoryResult {
  content: string;
  context: string;
  relevance: number;
}

export class SpiralAgent {
  private config: Required<SpiralAgentConfig>;
  private contextManager: ContextManager;
  private actionExecutor: ActionExecutor;
  private llmProvider: LLMProvider;
  private memoryManager: MemoryManager;
  private pluginManager: PluginManager;
  private visionSystem: VisionSystem;
  private dreamEngine: DreamEngine;
  private emotionalIntelligence: EmotionalIntelligence;
  private isRunning = false;
  private startTime = Date.now();

  constructor(config: SpiralAgentConfig) {
    this.config = {
      verbose: config.verbose ?? false,
      dryRun: config.dryRun ?? false,
      model: config.model ?? 'gpt-4',
      maxSteps: config.maxSteps ?? 50,
      temperature: config.temperature ?? 0.7,
    };

    // Initialize core components
    this.contextManager = new ContextManager();
    this.actionExecutor = new ActionExecutor(this.config.dryRun);
    this.llmProvider = new LLMProvider(this.config.model, this.config.temperature);
    this.memoryManager = new MemoryManager();
    this.pluginManager = new PluginManager();
    
    // Initialize advanced capabilities
    this.visionSystem = new VisionSystem();
    this.dreamEngine = new DreamEngine();
    this.emotionalIntelligence = new EmotionalIntelligence();

    logger.info('🌟 Spiral Agent initialized with enhanced capabilities', { config: this.config });
  }

  /**
   * Execute an objective autonomously using the ReAct framework
   */
  async executeObjective(objective: string): Promise<void> {
    this.isRunning = true;
    const sessionId = uuidv4();
    
    logger.info(`🎯 Starting autonomous execution: ${chalk.cyan(objective)}`);
    
    try {
      // Initialize context
      this.contextManager.initialize(sessionId, objective);
      
      // Store objective in memory
      await this.memoryManager.store(objective, 'objective', sessionId);
      
      let stepCount = 0;
      let isComplete = false;
      
      while (!isComplete && stepCount < this.config.maxSteps) {
        stepCount++;
        
        const spinner = ora(`Step ${stepCount}: Planning next action...`).start();
        
        try {
          // Get current context
          const context = this.contextManager.getCurrentContext();
          
          // Ask LLM for next step
          const nextAction = await this.askLLMForNextStep(context);
          
          spinner.succeed(`Step ${stepCount}: ${chalk.green(nextAction.type.toUpperCase())} planned`);
          
          if (this.config.verbose) {
            logger.info(`🤔 Reasoning: ${nextAction.reasoning}`);
          }
          
          // Execute the action
          if (nextAction.type === 'FINISH') {
            spinner.succeed(chalk.green('✅ Objective completed successfully!'));
            isComplete = true;
            break;
          }
          
          const executionResult = await this.executeAction(nextAction);
          
          // Update context with results
          this.contextManager.addStep({
            step: stepCount,
            action: nextAction,
            result: executionResult,
            timestamp: new Date(),
          });
          
          // Store in memory for future reference
          await this.memoryManager.store(
            `Action: ${nextAction.type} - ${nextAction.payload} | Result: ${JSON.stringify(executionResult)}`,
            'action_result',
            sessionId
          );
          
        } catch (error) {
          spinner.fail(`Step ${stepCount}: ${chalk.red('Error occurred')}`);
          
          // Attempt recovery
          const recovery = await this.recoverFromFailure(error as Error, stepCount);
          if (!recovery.canContinue) {
            logger.error('💥 Agent cannot continue. Aborting mission.', { error });
            break;
          }
          
          logger.info('🔧 Attempting recovery...', { strategy: recovery.strategy });
        }
      }
      
      if (stepCount >= this.config.maxSteps) {
        logger.warn(`⚠️  Reached maximum steps (${this.config.maxSteps}). Mission incomplete.`);
      }
      
    } catch (error) {
      logger.error('💥 Fatal error during objective execution', { error, objective });
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Start interactive mode for conversational agent use
   */
  async startInteractiveMode(): Promise<void> {
    logger.info('💬 Starting interactive mode. Type "exit" to quit.');
    
    while (true) {
      const { input } = await inquirer.prompt([
        {
          type: 'input',
          name: 'input',
          message: chalk.cyan('spiral> '),
        },
      ]);
      
      if (input.toLowerCase().trim() === 'exit') {
        logger.info('👋 Goodbye!');
        break;
      }
      
      if (input.trim()) {
        const spinner = ora('🤔 Thinking...').start();
        
        try {
          // Process the input as a mini-objective
          await this.executeObjective(input);
          spinner.succeed('✅ Complete');
        } catch (error) {
          spinner.fail('❌ Error');
          logger.error('Interactive command failed', { error, input });
        }
      }
    }
  }

  /**
   * Ask the LLM for the next step in the plan
   */
  private async askLLMForNextStep(context: any): Promise<any> {
    const prompt = this.buildReasoningPrompt(context);
    
    if (this.config.verbose) {
      logger.debug('🧠 LLM Prompt:', { prompt });
    }
    
    const response = await this.llmProvider.chat(prompt);
    
    // Parse the response into an action
    return this.parseActionFromResponse(response);
  }

  /**
   * Execute a specific action
   */
  private async executeAction(action: any): Promise<any> {
    const spinner = ora(`Executing ${action.type}...`).start();
    
    try {
      const result = await this.actionExecutor.execute(action);
      
      if (result.success) {
        spinner.succeed(`${chalk.green('✓')} ${action.type} completed`);
      } else {
        spinner.fail(`${chalk.red('✗')} ${action.type} failed`);
      }
      
      return result;
    } catch (error) {
      spinner.fail(`${chalk.red('✗')} ${action.type} error`);
      throw error;
    }
  }

  /**
   * Build the reasoning prompt for the LLM
   */
  private buildReasoningPrompt(context: any): string {
    return `
You are Spiral Agent, an autonomous CLI agent that thinks, plans, and executes complex development tasks.

CURRENT OBJECTIVE: ${context.objective}

HISTORY OF ACTIONS TAKEN:
${context.history.map((step: any, idx: number) => 
  `${idx + 1}. ${step.action.type}: ${step.action.payload} -> ${step.result.success ? 'SUCCESS' : 'FAILED'}`
).join('\n')}

Based on the objective and history, what is the single next action you should take?

Choose from these action types:
- READ: Read a file (e.g., READ:/path/to/file)
- SHELL: Execute a shell command (e.g., SHELL:ls -la)
- CODE: Write or modify code (e.g., CODE:/path/to/file:function_to_add())
- INFO: Request information or ask a question (e.g., INFO:What is the project structure?)
- MEMORY: Search your memory for relevant information (e.g., MEMORY:find similar projects)
- FINISH: Complete the objective

Respond in JSON format:
{
  "reasoning": "Your step-by-step reasoning",
  "type": "ACTION_TYPE",
  "payload": "specific parameters for the action"
}
`;
  }

  /**
   * Parse LLM response into an executable action
   */
  private parseActionFromResponse(response: string): any {
    try {
      // Clean up the response and extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      return {
        type: parsed.type || 'INFO',
        payload: parsed.payload || '',
        reasoning: parsed.reasoning || 'No reasoning provided',
      };
    } catch (error) {
      logger.warn('Failed to parse LLM response, using fallback', { response, error });
      
      // Fallback parsing
      return {
        type: 'INFO',
        payload: 'Could not parse the previous response. Please clarify the next action.',
        reasoning: 'Response parsing failed',
      };
    }
  }

  /**
   * Recover from failures
   */
  private async recoverFromFailure(error: Error, stepCount: number): Promise<{ canContinue: boolean; strategy: string }> {
    logger.error(`💥 Step ${stepCount} failed:`, { error: error.message });
    
    // Simple recovery strategies
    if (stepCount < 3) {
      return { canContinue: true, strategy: 'retry-with-context' };
    }
    
    if (error.message.includes('permission')) {
      return { canContinue: false, strategy: 'permission-error' };
    }
    
    return { canContinue: true, strategy: 'continue-with-error-context' };
  }

  /**
   * Search agent memory
   */
  async searchMemory(query: string, limit: number = 10): Promise<MemoryResult[]> {
    return await this.memoryManager.search(query, limit);
  }

  /**
   * Clear agent memory
   */
  async clearMemory(): Promise<void> {
    await this.memoryManager.clear();
  }

  /**
   * Get agent status
   */
  async getStatus(): Promise<AgentStatus> {
    const memoryCount = await this.memoryManager.getCount();
    const pluginCount = await this.pluginManager.getLoadedCount();
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    
    return {
      healthy: true,
      memoryCount,
      pluginCount,
      uptime: `${uptime}s`,
      lastActivity: this.isRunning ? 'Now' : undefined,
    };
  }

  /**
   * List installed plugins
   */
  async listPlugins(): Promise<Array<{ name: string; description: string }>> {
    return await this.pluginManager.list();
  }
}
