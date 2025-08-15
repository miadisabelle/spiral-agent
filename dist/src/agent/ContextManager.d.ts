interface ExecutionStep {
    step: number;
    action: any;
    result: any;
    timestamp: Date;
}
interface ExecutionContext {
    sessionId: string;
    objective: string;
    startTime: Date;
    history: ExecutionStep[];
    currentStep: number;
}
export declare class ContextManager {
    private context;
    /**
     * Initialize a new execution context
     */
    initialize(sessionId: string, objective: string): void;
    /**
     * Add a step to the execution history
     */
    addStep(step: ExecutionStep): void;
    /**
     * Get the current context
     */
    getCurrentContext(): ExecutionContext;
    /**
     * Get execution summary
     */
    getSummary(): {
        sessionId: string;
        objective: string;
        duration: number;
        steps: number;
        success: number;
        failures: number;
    };
    /**
     * Clear the context
     */
    clear(): void;
}
export {};
//# sourceMappingURL=ContextManager.d.ts.map