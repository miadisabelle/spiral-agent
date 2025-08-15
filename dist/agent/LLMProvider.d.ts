export declare class LLMProvider {
    private model;
    private temperature;
    constructor(model: string, temperature?: number);
    /**
     * Send a chat message to the LLM and get a response
     * This is a mock implementation - in production, this would connect to actual LLM APIs
     */
    chat(prompt: string): Promise<string>;
    /**
     * Get model information
     */
    getModelInfo(): {
        model: string;
        temperature: number;
    };
}
//# sourceMappingURL=LLMProvider.d.ts.map