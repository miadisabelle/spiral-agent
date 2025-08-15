/**
 * Test setup and utilities for Spiral CLI
 */
/**
 * Create a test agent configuration
 */
export declare function createTestAgentConfig(): {
    verbose: boolean;
    dryRun: boolean;
    model: string;
    maxSteps: number;
    temperature: number;
};
/**
 * Mock LLM responses for testing
 */
export declare const mockResponses: {
    simple: string;
    finish: string;
    read: string;
};
//# sourceMappingURL=setup.d.ts.map