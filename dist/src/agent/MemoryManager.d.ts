export declare class MemoryManager {
    private memories;
    /**
     * Store a memory
     */
    store(content: string, context: string, sessionId: string): Promise<void>;
    /**
     * Search memories
     */
    search(query: string, limit?: number): Promise<Array<{
        content: string;
        context: string;
        relevance: number;
    }>>;
    /**
     * Calculate simple relevance score
     */
    private calculateRelevance;
    /**
     * Get memory count
     */
    getCount(): Promise<number>;
    /**
     * Clear all memories
     */
    clear(): Promise<void>;
}
//# sourceMappingURL=MemoryManager.d.ts.map