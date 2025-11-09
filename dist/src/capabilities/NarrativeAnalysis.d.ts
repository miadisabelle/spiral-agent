/**
 * NarrativeAnalysis - Developmental editorial feedback capability
 *
 * Embodies the "Yazhi" persona - a wise developmental editor who analyzes
 * narratives across three dimensions: Plot, Pacing, and Character.
 *
 * This capability powers the Iterative Narrative Refinement workflow.
 *
 * @see rispecs/IterativeNarrativeRefinement.md for architecture
 * @see stories/28e55cdd-ce2f-44d6-9736-73438fc18f7f/ for demonstration
 */
export interface PlotAnalysisReport {
    strengths: string[];
    weaknesses: string[];
    actionableSuggestions: string[];
    structuralObservations: string;
    timestamp: Date;
}
export interface PacingAnalysisReport {
    strengths: string[];
    weaknesses: string[];
    actionableSuggestions: string[];
    rhythmObservations: string;
    timestamp: Date;
}
export interface CharacterAnalysisReport {
    strengths: string[];
    weaknesses: string[];
    actionableSuggestions: string[];
    characterObservations: string;
    timestamp: Date;
}
export interface EditorState {
    wisdom: number;
    structural: number;
    mentoring: number;
    analytical: number;
    currentFocus: 'plot' | 'pacing' | 'character' | 'idle';
}
export declare class NarrativeAnalysis {
    private editorState;
    private analysisHistory;
    private wisdomPrinciples;
    constructor();
    /**
     * Analyze plot structure using Robert McKee's Story principles
     */
    analyzePlotStructure(story: string): Promise<PlotAnalysisReport>;
    /**
     * Analyze pacing and rhythm using Ursula K. Le Guin's principles
     */
    analyzePacingAndRhythm(story: string): Promise<PacingAnalysisReport>;
    /**
     * Analyze character development using Lisa Cron's Story Genius principles
     */
    analyzeCharacterDevelopment(story: string): Promise<CharacterAnalysisReport>;
    private initializeWisdomPrinciples;
    private detectThreeActStructure;
    private detectIncitingIncident;
    private detectClimax;
    private analyzeCauseEffect;
    private detectPlotGaps;
    private analyzeStakes;
    private generatePlotObservations;
    private analyzeNarrativeRhythm;
    private analyzeSceneLengths;
    private analyzeTransitions;
    private generatePacingObservations;
    private identifyCharacters;
    private analyzeCharacterArcs;
    private analyzeAuthenticity;
    private detectMisbeliefs;
    private generateCharacterObservations;
    /**
     * Get the current state of Yazhi's editorial focus
     */
    getEditorState(): EditorState;
    /**
     * Retrieve past analysis for reference
     */
    getAnalysisHistory(type?: 'plot' | 'pacing' | 'character'): any;
}
//# sourceMappingURL=NarrativeAnalysis.d.ts.map