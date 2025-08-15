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
export declare class SpiralAgent {
    private config;
    private contextManager;
    private actionExecutor;
    private llmProvider;
    private memoryManager;
    private pluginManager;
    private visionSystem;
    private dreamEngine;
    private emotionalIntelligence;
    private isRunning;
    private startTime;
    constructor(config: SpiralAgentConfig);
    /**
     * Execute an objective autonomously using the ReAct framework
     */
    executeObjective(objective: string): Promise<void>;
    /**
     * Start interactive mode for conversational agent use
     */
    startInteractiveMode(): Promise<void>;
    /**
     * Ask the LLM for the next step in the plan
     */
    private askLLMForNextStep;
    /**
     * Execute a specific action
     */
    private executeAction;
    /**
     * Build the reasoning prompt for the LLM
     */
    private buildReasoningPrompt;
    /**
     * Parse LLM response into an executable action
     */
    private parseActionFromResponse;
    /**
     * Recover from failures
     */
    private recoverFromFailure;
    /**
     * Search agent memory
     */
    searchMemory(query: string, limit?: number): Promise<MemoryResult[]>;
    /**
     * Clear agent memory
     */
    clearMemory(): Promise<void>;
    /**
     * Get agent status
     */
    getStatus(): Promise<AgentStatus>;
    /**
     * List installed plugins
     */
    listPlugins(): Promise<Array<{
        name: string;
        description: string;
    }>>;
}
//# sourceMappingURL=SpiralAgent.d.ts.map