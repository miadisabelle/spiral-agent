interface MemoryEntry {
  id: string;
  content: string;
  context: string;
  sessionId: string;
  timestamp: Date;
}

export class MemoryManager {
  private memories: MemoryEntry[] = [];

  /**
   * Store a memory
   */
  async store(content: string, context: string, sessionId: string): Promise<void> {
    const memory: MemoryEntry = {
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
  async search(query: string, limit: number = 10): Promise<Array<{ content: string; context: string; relevance: number }>> {
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
  private calculateRelevance(content: string, query: string): number {
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
  async getCount(): Promise<number> {
    return this.memories.length;
  }

  /**
   * Clear all memories
   */
  async clear(): Promise<void> {
    this.memories = [];
  }
}
