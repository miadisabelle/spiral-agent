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

import { logger } from '../utils/logger.js';
import chalk from 'chalk';

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

export class NarrativeAnalysis {
  private editorState: EditorState;
  private analysisHistory: Map<string, any>;
  private wisdomPrinciples: Map<string, string[]>;

  constructor() {
    this.editorState = {
      wisdom: 92,
      structural: 98,
      mentoring: 90,
      analytical: 95,
      currentFocus: 'idle'
    };

    this.analysisHistory = new Map();
    this.wisdomPrinciples = new Map();

    this.initializeWisdomPrinciples();

    logger.info('👵 Yazhi, Keeper of Stories, is ready to guide your narrative');
  }

  /**
   * Analyze plot structure using Robert McKee's Story principles
   */
  async analyzePlotStructure(story: string): Promise<PlotAnalysisReport> {
    this.editorState.currentFocus = 'plot';
    logger.info(chalk.cyan('📊 Yazhi begins plot structure analysis...'));

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const suggestions: string[] = [];
    let observations = '';

    // === STRUCTURAL ANALYSIS ===
    const hasThreeActStructure = this.detectThreeActStructure(story);
    const hasIncitingIncident = this.detectIncitingIncident(story);
    const hasClim ax = this.detectClimax(story);
    const causeEffectChain = this.analyzeCauseEffect(story);

    // Strengths detection
    if (hasThreeActStructure) {
      strengths.push('Clear three-act structure provides solid narrative architecture');
    }
    if (hasIncitingIncident) {
      strengths.push('Strong inciting incident that propels the narrative forward');
    }
    if (causeEffectChain.score > 0.7) {
      strengths.push('Effective cause-effect progression creates logical flow');
    }

    // Weaknesses detection
    if (!hasClimax) {
      weaknesses.push('Missing or weak climax - the story needs a clear emotional/structural peak');
      suggestions.push('Identify the moment of highest tension and expand it into a full scene');
    }
    if (causeEffectChain.score < 0.5) {
      weaknesses.push('Weak cause-effect chain - events feel disconnected');
      suggestions.push('Strengthen causal links between plot points - each event should flow naturally from the previous');
    }

    // Check for plot gaps
    const plotGaps = this.detectPlotGaps(story);
    if (plotGaps.length > 0) {
      weaknesses.push(`Structural gaps detected: ${plotGaps.join(', ')}`);
      suggestions.push('Fill narrative gaps by showing the progression between major events');
    }

    // Stakes analysis
    const stakesAnalysis = this.analyzeStakes(story);
    if (!stakesAnalysis.areClear) {
      weaknesses.push('Unclear stakes - what does the protagonist risk?');
      suggestions.push('Explicitly establish what the character stands to lose');
    }

    observations = this.generatePlotObservations(story, {
      structure: hasThreeActStructure,
      inciting: hasIncitingIncident,
      climax: hasClimax,
      causeEffect: causeEffectChain,
      stakes: stakesAnalysis
    });

    const report: PlotAnalysisReport = {
      strengths,
      weaknesses,
      actionableSuggestions: suggestions,
      structuralObservations: observations,
      timestamp: new Date()
    };

    logger.info(chalk.green(`✅ Plot analysis complete: ${strengths.length} strengths, ${weaknesses.length} areas for improvement`));

    this.analysisHistory.set('plot', report);
    this.editorState.currentFocus = 'idle';

    return report;
  }

  /**
   * Analyze pacing and rhythm using Ursula K. Le Guin's principles
   */
  async analyzePacingAndRhythm(story: string): Promise<PacingAnalysisReport> {
    this.editorState.currentFocus = 'pacing';
    logger.info(chalk.cyan('🎵 Yazhi analyzes the rhythm and breath of your narrative...'));

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const suggestions: string[] = [];

    // Rhythm analysis
    const rhythmAnalysis = this.analyzeNarrativeRhythm(story);
    const sceneLength = this.analyzeSceneLengths(story);
    const transitions = this.analyzeTransitions(story);

    // Strengths
    if (rhythmAnalysis.hasVariedPacing) {
      strengths.push('Varied pacing creates engaging rhythm - you know when to rush and when to linger');
    }
    if (sceneLength.isBalanced) {
      strengths.push('Scene lengths are well-balanced, preventing monotony');
    }

    // Weaknesses
    if (rhythmAnalysis.hasRushedSections) {
      weaknesses.push('Some sections feel rushed - important moments need more breath');
      suggestions.push('Slow down at emotional peaks - let the reader feel the weight of the moment');
    }
    if (rhythmAnalysis.hasDraggingSections) {
      weaknesses.push('Some sections drag - the narrative loses momentum');
      suggestions.push('Tighten exposition and move more quickly through setup');
    }
    if (!transitions.areSmooth) {
      weaknesses.push('Jarring transitions disrupt narrative flow');
      suggestions.push('Create smoother bridges between scenes and chapters');
    }

    const observations = this.generatePacingObservations(story, {
      rhythm: rhythmAnalysis,
      scenes: sceneLength,
      transitions
    });

    const report: PacingAnalysisReport = {
      strengths,
      weaknesses,
      actionableSuggestions: suggestions,
      rhythmObservations: observations,
      timestamp: new Date()
    };

    logger.info(chalk.green(`✅ Pacing analysis complete: ${strengths.length} strengths, ${weaknesses.length} areas for improvement`));

    this.analysisHistory.set('pacing', report);
    this.editorState.currentFocus = 'idle';

    return report;
  }

  /**
   * Analyze character development using Lisa Cron's Story Genius principles
   */
  async analyzeCharacterDevelopment(story: string): Promise<CharacterAnalysisReport> {
    this.editorState.currentFocus = 'character';
    logger.info(chalk.cyan('🎭 Yazhi examines the souls of your characters...'));

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const suggestions: string[] = [];

    // Character analysis
    const characters = this.identifyCharacters(story);
    const arcs = this.analyzeCharacterArcs(story, characters);
    const authenticity = this.analyzeAuthenticity(story, characters);
    const misbeliefs = this.detectMisbeliefs(story, characters);

    // Strengths
    if (arcs.hasGrowth) {
      strengths.push('Characters demonstrate genuine growth and transformation');
    }
    if (authenticity.score > 0.8) {
      strengths.push('Characters feel authentic and believable');
    }
    if (misbeliefs.length > 0) {
      strengths.push('Characters have clear internal conflicts and misbeliefs to overcome');
    }

    // Weaknesses
    if (!arcs.hasGrowth) {
      weaknesses.push('Characters lack meaningful arcs - they end where they began');
      suggestions.push('Give characters internal transformations that mirror the external plot');
    }
    if (authenticity.score < 0.6) {
      weaknesses.push('Characters feel flat or generic');
      suggestions.push('Add specific details, contradictions, and vulnerabilities that make characters feel real');
    }
    if (arcs.inconsistencies.length > 0) {
      weaknesses.push(`Character inconsistencies: ${arcs.inconsistencies.join(', ')}`);
      suggestions.push('Ensure character actions align with their established traits and motivations');
    }

    const observations = this.generateCharacterObservations(story, {
      characters,
      arcs,
      authenticity,
      misbeliefs
    });

    const report: CharacterAnalysisReport = {
      strengths,
      weaknesses,
      actionableSuggestions: suggestions,
      characterObservations: observations,
      timestamp: new Date()
    };

    logger.info(chalk.green(`✅ Character analysis complete: ${strengths.length} strengths, ${weaknesses.length} areas for improvement`));

    this.analysisHistory.set('character', report);
    this.editorState.currentFocus = 'idle';

    return report;
  }

  // ========== PRIVATE ANALYSIS METHODS ==========

  private initializeWisdomPrinciples(): void {
    this.wisdomPrinciples.set('plot', [
      'Every story needs structure - beginning, middle, end',
      'Cause and effect drive narrative forward',
      'Stakes must be clear and escalating',
      'The climax is inevitable yet surprising'
    ]);

    this.wisdomPrinciples.set('pacing', [
      'Vary your rhythm - fast and slow, action and reflection',
      'Linger at emotional peaks, rush through setup',
      'Transitions are bridges, not gaps',
      'Every scene earns its place'
    ]);

    this.wisdomPrinciples.set('character', [
      'Characters must want something, even if just a glass of water',
      'Internal and external conflicts mirror each other',
      'Authenticity comes from contradiction and vulnerability',
      'Growth is transformation, not just change'
    ]);
  }

  private detectThreeActStructure(story: string): boolean {
    // Simple heuristic: presence of chapter breaks or section markers
    const sections = story.split(/chapter|###|---/i);
    return sections.length >= 3;
  }

  private detectIncitingIncident(story: string): boolean {
    // Look for narrative disruption keywords early in the story
    const firstQuarter = story.substring(0, story.length / 4);
    const incitingKeywords = /appeared|bloomed|discovered|arrived|changed|transformed/i;
    return incitingKeywords.test(firstQuarter);
  }

  private detectClimax(story: string): boolean {
    // Look for high-tension language in the final third
    const finalThird = story.substring((story.length * 2) / 3);
    const climaxKeywords = /confronted|faced|realized|breakthrough|truth|finally/i;
    return climaxKeywords.test(finalThird);
  }

  private analyzeCauseEffect(story: string): { score: number; gaps: string[] } {
    // Simplified: check for transition words
    const transitionWords = story.match(/because|therefore|as a result|then|so|thus/gi) || [];
    const score = Math.min(transitionWords.length / 10, 1.0); // Normalize to 0-1
    return { score, gaps: [] };
  }

  private detectPlotGaps(story: string): string[] {
    // Placeholder - would need more sophisticated analysis
    return [];
  }

  private analyzeStakes(story: string): { areClear: boolean; stakes: string[] } {
    // Look for risk/consequence language
    const riskKeywords = /lose|risk|danger|threat|consequences|fail/i;
    return {
      areClear: riskKeywords.test(story),
      stakes: []
    };
  }

  private generatePlotObservations(story: string, analysis: any): string {
    return `The narrative demonstrates ${analysis.structure ? 'a clear structural foundation' : 'structural ambiguity'}. ` +
           `${analysis.inciting ? 'The inciting incident effectively disrupts the status quo.' : 'The inciting incident needs strengthening.'} ` +
           `${analysis.climax ? 'The climax provides satisfying resolution.' : 'The narrative lacks a clear climactic moment.'} ` +
           `The cause-effect chain scores ${(analysis.causeEffect.score * 100).toFixed(0)}%, ` +
           `${analysis.causeEffect.score > 0.7 ? 'creating strong logical progression.' : 'suggesting gaps in narrative logic.'}`;
  }

  private analyzeNarrativeRhythm(story: string): any {
    const paragraphs = story.split('\n\n').filter(p => p.trim().length > 0);
    const avgLength = paragraphs.reduce((sum, p) => sum + p.length, 0) / paragraphs.length;
    const variance = paragraphs.reduce((sum, p) => sum + Math.abs(p.length - avgLength), 0) / paragraphs.length;

    return {
      hasVariedPacing: variance > avgLength * 0.3,
      hasRushedSections: paragraphs.some(p => p.length < avgLength * 0.3),
      hasDraggingSections: paragraphs.some(p => p.length > avgLength * 2)
    };
  }

  private analyzeSceneLengths(story: string): { isBalanced: boolean } {
    // Simplified scene detection
    const scenes = story.split(/\n\n\n|\*\*\*/);
    if (scenes.length < 2) return { isBalanced: true };

    const lengths = scenes.map(s => s.length);
    const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((sum, l) => sum + Math.abs(l - avg), 0) / lengths.length;

    return { isBalanced: variance < avg * 0.5 };
  }

  private analyzeTransitions(story: string): { areSmooth: boolean; issues: string[] } {
    // Look for jarring time/location jumps without transition markers
    const chapters = story.split(/chapter/i);
    return {
      areSmooth: chapters.length > 0, // Simplified
      issues: []
    };
  }

  private generatePacingObservations(story: string, analysis: any): string {
    return `The narrative rhythm ${analysis.rhythm.hasVariedPacing ? 'demonstrates pleasing variation' : 'feels monotonous'}. ` +
           `${analysis.rhythm.hasRushedSections ? 'Some important moments pass too quickly.' : 'Pacing through key moments is appropriate.'} ` +
           `${analysis.rhythm.hasDraggingSections ? 'Certain sections lose momentum and need tightening.' : 'The story maintains good momentum throughout.'} ` +
           `Scene lengths ${analysis.scenes.isBalanced ? 'are well-balanced.' : 'show too much variation.'}`;
  }

  private identifyCharacters(story: string): string[] {
    // Simple extraction - look for proper nouns/names
    const namePattern = /\b[A-Z][a-z]+\b/g;
    const matches = story.match(namePattern) || [];
    const uniqueNames = [...new Set(matches)];
    return uniqueNames.filter(name =>
      !['Chapter', 'The', 'She', 'He', 'It', 'Then', 'When', 'But'].includes(name)
    );
  }

  private analyzeCharacterArcs(story: string, characters: string[]): any {
    // Simplified: check if character appears in beginning and end
    const firstQuarter = story.substring(0, story.length / 4);
    const lastQuarter = story.substring((story.length * 3) / 4);

    return {
      hasGrowth: characters.some(char =>
        firstQuarter.includes(char) && lastQuarter.includes(char)
      ),
      inconsistencies: []
    };
  }

  private analyzeAuthenticity(story: string, characters: string[]): { score: number } {
    // Look for emotional language, contradictions, specific details
    const authenticityMarkers = /felt|feared|hoped|wanted|loved|hated|trembled|whispered/gi;
    const matches = story.match(authenticityMarkers) || [];
    const score = Math.min(matches.length / 20, 1.0);
    return { score };
  }

  private detectMisbeliefs(story: string, characters: string[]): string[] {
    // Look for internal conflict keywords
    const misbeliefKeywords = /believed|thought|assumed|feared|doubted/i;
    return misbeliefKeywords.test(story) ? ['Internal conflicts detected'] : [];
  }

  private generateCharacterObservations(story: string, analysis: any): string {
    return `${analysis.characters.length} significant characters identified. ` +
           `${analysis.arcs.hasGrowth ? 'Characters demonstrate meaningful growth arcs.' : 'Characters lack transformation.'} ` +
           `Authenticity score: ${(analysis.authenticity.score * 100).toFixed(0)}%. ` +
           `${analysis.misbeliefs.length > 0 ? 'Internal conflicts add depth.' : 'Consider adding more internal struggles.'}`;
  }

  /**
   * Get the current state of Yazhi's editorial focus
   */
  getEditorState(): EditorState {
    return { ...this.editorState };
  }

  /**
   * Retrieve past analysis for reference
   */
  getAnalysisHistory(type?: 'plot' | 'pacing' | 'character'): any {
    if (type) {
      return this.analysisHistory.get(type);
    }
    return Object.fromEntries(this.analysisHistory);
  }
}
