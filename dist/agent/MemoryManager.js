export class MemoryManager {
    memories = [];
    /**
     * Store a memory
     */
    async store(content, context, sessionId) {
        const memory = {
            id: Date.now().toString(),
            content,
            context,
            sessionId,
            timestamp: new Date(),
        };
        this.memories.push(memory);
    }
    /**
     * Search memories
     */
    async search(query, limit = 10) {
        const lowerQuery = query.toLowerCase();
        const scored = this.memories
            .map(memory => ({
            content: memory.content,
            context: memory.context,
            relevance: this.calculateRelevance(memory.content, lowerQuery),
        }))
            .filter(result => result.relevance > 0)
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, limit);
        return scored;
    }
    /**
     * Calculate simple relevance score
     */
    calculateRelevance(content, query) {
        const lowerContent = content.toLowerCase();
        if (lowerContent.includes(query)) {
            return 1.0;
        }
        // Simple word matching
        const queryWords = query.split(' ');
        const matches = queryWords.filter(word => lowerContent.includes(word)).length;
        return matches / queryWords.length;
    }
    /**
     * Get memory count
     */
    async getCount() {
        return this.memories.length;
    }
    /**
     * Clear all memories
     */
    async clear() {
        this.memories = [];
    }
}
//# sourceMappingURL=MemoryManager.js.map