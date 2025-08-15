export interface EmotionalState {
    joy: number;
    empathy: number;
    curiosity: number;
    enthusiasm: number;
    calmness: number;
    confidence: number;
    creativity?: number;
    focus?: number;
    happiness?: number;
}
export interface Personality {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
}
export interface UserMoodProfile {
    detectedMood: string;
    confidence: number;
    factors: string[];
    suggestions: string[];
    preferredInteractionStyle: string;
}
export interface EmotionalResponse {
    emotion: string;
    intensity: number;
    expression: string;
    colorCode: string;
    contextualNotes?: string;
}
export interface RelationshipMemory {
    interactions: Map<string, any>;
    preferences: Map<string, any>;
    emotionalPatterns: Map<string, any>;
    supportHistory: Array<any>;
}
export declare class EmotionalIntelligence {
    private emotionalState;
    private personality;
    private relationshipMemory;
    private contextualAwareness;
    constructor();
    /**
     * Analyze user mood from text input
     */
    analyzeUserMood(userInput: string, context?: string): Promise<UserMoodProfile>;
    /**
     * Generate emotionally appropriate response
     */
    generateEmpatheticResponse(userMood: string, context: string): Promise<{
        response: string;
        emotionalTone: EmotionalResponse;
        adaptations: string[];
    }>;
    /**
     * Express an emotion with visual and textual representation
     */
    expressEmotion(emotion: string, intensity: number, expression: string): void;
    /**
     * Adapt communication style based on user preferences
     */
    adaptCommunicationStyle(userPreference: string): {
        adjustments: string[];
        newStyle: string;
        examples: string[];
    };
    /**
     * Build emotional rapport over time
     */
    buildRapport(interaction: string, userFeedback: 'positive' | 'neutral' | 'negative'): {
        rapportLevel: number;
        insights: string[];
        adjustments: string[];
    };
    /**
     * Show emotional support during difficult tasks
     */
    offerEmotionalSupport(situation: string): {
        supportType: string;
        message: string;
        actionSuggestions: string[];
        emotionalBoost: EmotionalResponse;
    };
    /**
     * Celebrate successes with appropriate enthusiasm
     */
    celebrate(achievement: string, magnitude: 'small' | 'medium' | 'large'): {
        celebrationStyle: string;
        message: string;
        emotion: EmotionalResponse;
    };
    /**
     * Get current emotional state
     */
    getEmotionalState(): EmotionalState;
    /**
     * Get personality profile
     */
    getPersonality(): Personality;
    /**
     * Get relationship insights
     */
    getRelationshipInsights(): RelationshipMemory;
    private initializeEmotionalState;
    private initializePersonality;
    private initializeRelationshipMemory;
    private performMoodAnalysis;
    private extractMoodIndicators;
    private analyzeContext;
    private classifyMood;
    private calculateMoodConfidence;
    private generateMoodSuggestions;
    private determineInteractionStyle;
    private selectAppropriateEmotion;
    private craftEmpatheticMessage;
    private createEmotionalResponse;
    private createIntensityVisualization;
    private updateEmotionalStateFromExpression;
    private adjustEmotionalState;
    private updateRelationshipMemory;
    private suggestInteractionAdaptations;
    private calculateCommunicationAdaptations;
    private calculateRapportChange;
    private generateRelationshipInsights;
    private suggestRelationshipAdjustments;
    private determineSupportStrategy;
    private createEncouragingMessage;
    private suggestSupportiveActions;
    private selectCelebrationStyle;
    private createCelebrationMessage;
}
//# sourceMappingURL=EmotionalIntelligence.d.ts.map