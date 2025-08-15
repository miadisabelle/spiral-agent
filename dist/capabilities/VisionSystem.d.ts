export interface VisionResult {
    description: string;
    objects: string[];
    text: string[];
    emotions: string[];
    colors: string[];
    composition: string;
    artisticStyle?: string;
    technicalDetails?: string;
}
export interface VisionCapabilities {
    canAnalyzeImages: boolean;
    canReadText: boolean;
    canDetectObjects: boolean;
    canAnalyzeArt: boolean;
    canExtractCode: boolean;
}
export declare class VisionSystem {
    private capabilities;
    constructor();
    /**
     * Analyze an image and return comprehensive insights
     */
    analyzeImage(imagePath: string): Promise<VisionResult>;
    /**
     * Take a screenshot and analyze it
     */
    analyzeScreenshot(): Promise<VisionResult>;
    /**
     * Extract text from an image (OCR)
     */
    extractText(imagePath: string): Promise<string[]>;
    /**
     * Analyze code in an image (for screenshots of IDEs)
     */
    analyzeCodeInImage(imagePath: string): Promise<{
        language: string;
        functions: string[];
        issues: string[];
        suggestions: string[];
    }>;
    /**
     * Generate artistic analysis of images
     */
    analyzeArtwork(imagePath: string): Promise<{
        style: string;
        mood: string;
        techniques: string[];
        influences: string[];
        criticalAnalysis: string;
    }>;
    /**
     * Perform the actual vision analysis (mock implementation)
     */
    private performVisionAnalysis;
    private generateDescription;
    private detectObjects;
    private analyzeEmotions;
    private extractColors;
    private analyzeComposition;
    private determineArtisticStyle;
    private analyzeTechnicalDetails;
    private determineBestUse;
    /**
     * Get system capabilities
     */
    getCapabilities(): VisionCapabilities;
}
//# sourceMappingURL=VisionSystem.d.ts.map