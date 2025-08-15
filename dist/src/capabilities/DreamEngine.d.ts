export interface CreativePrompt {
    type: 'story' | 'poem' | 'art' | 'music' | 'code' | 'idea' | 'vision';
    theme: string;
    mood: string;
    style: string;
    constraints?: string[];
    inspiration?: string[];
}
export interface CreativeOutput {
    title: string;
    content: string;
    metadata: {
        genre: string;
        complexity: number;
        emotionalImpact: number;
        originality: number;
        technicalExecution: number;
    };
    variations?: string[];
    artisticNotes?: string;
}
export interface DreamState {
    creativity: number;
    inspiration: number;
    focus: number;
    imagination: number;
    currentMuse: string;
}
export declare class DreamEngine {
    private dreamState;
    private creativePalette;
    private museLibrary;
    constructor();
    /**
     * Generate creative content based on a prompt
     */
    dream(prompt: CreativePrompt): Promise<CreativeOutput>;
    /**
     * Generate a short story with rich narrative
     */
    createStory(theme: string, style?: string): Promise<CreativeOutput>;
    /**
     * Compose poetry with emotional depth
     */
    composePoetry(theme: string, style?: string): Promise<CreativeOutput>;
    /**
     * Design conceptual art descriptions
     */
    designArt(theme: string, style?: string): Promise<CreativeOutput>;
    /**
     * Generate innovative ideas and concepts
     */
    generateIdea(domain: string, constraints?: string[]): Promise<CreativeOutput>;
    /**
     * Create musical compositions (lyrical descriptions)
     */
    composeMusic(genre: string, theme: string): Promise<CreativeOutput>;
    /**
     * Generate creative code concepts
     */
    dreamCode(concept: string, language?: string): Promise<CreativeOutput>;
    /**
     * Generate visionary concepts
     */
    envisionFuture(domain: string): Promise<CreativeOutput>;
    /**
     * Generate the actual creative content
     */
    private generateCreativeContent;
    private generateStory;
    private generatePoetry;
    private generateArtDescription;
    private generateMusicDescription;
    private generateCodeConcept;
    private generateInnovativeIdea;
    private generateVision;
    private generateTitle;
    private createNarrative;
    private createPoem;
    private createArtVision;
    private createMusicVision;
    private createCodeVision;
    private createInnovativeVision;
    private createFutureVision;
    private generateVariations;
    private getStyleEmphasis;
    private enhanceDreamState;
    private initializeCreativePalette;
    private initializeMuseLibrary;
    /**
     * Get current dream state
     */
    getDreamState(): DreamState;
    /**
     * Enhance creativity through meditation
     */
    meditate(duration?: number): Promise<void>;
}
//# sourceMappingURL=DreamEngine.d.ts.map