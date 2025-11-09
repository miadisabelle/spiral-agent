/**
 * refineNarrative - Iterative Narrative Refinement Command
 *
 * Orchestrates the multi-pass editorial workflow between:
 * - Miette (Author) - creative revision
 * - Yazhi (Editor) - developmental feedback
 *
 * Implements "The Weaver's Loom" - the sacred dance of creation and critique.
 *
 * @see rispecs/IterativeNarrativeRefinement.md
 * @see NARRATIVE_REFINEMENT_IMPLEMENTATION.md
 */
import type { PlotAnalysisReport, PacingAnalysisReport, CharacterAnalysisReport } from '../capabilities/NarrativeAnalysis.js';
export interface RefineNarrativeOptions {
    inputFile: string;
    outputDir: string;
    passes?: number;
    verbose?: boolean;
}
export interface RefineNarrativeResult {
    finalStory: string;
    version: number;
    outputDir: string;
    critiques: {
        plot?: PlotAnalysisReport;
        pacing?: PacingAnalysisReport;
        character?: CharacterAnalysisReport;
    };
}
/**
 * Main refinement orchestration function
 */
export declare function refineNarrative(options: RefineNarrativeOptions): Promise<RefineNarrativeResult>;
//# sourceMappingURL=refineNarrative.d.ts.map