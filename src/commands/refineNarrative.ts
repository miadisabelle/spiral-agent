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

import { promises as fs } from 'fs';
import path from 'path';
import { NarrativeAnalysis } from '../capabilities/NarrativeAnalysis.js';
import type {
  PlotAnalysisReport,
  PacingAnalysisReport,
  CharacterAnalysisReport
} from '../capabilities/NarrativeAnalysis.js';
import { logger } from '../utils/logger.js';
import chalk from 'chalk';

export interface RefineNarrativeOptions {
  inputFile: string;
  outputDir: string;
  passes?: number; // Default: 3 (plot, pacing, character)
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
export async function refineNarrative(options: RefineNarrativeOptions): Promise<RefineNarrativeResult> {
  const { inputFile, outputDir, passes = 3, verbose = false } = options;

  logger.info(chalk.bold.cyan('\n🌀 Spiral-Miadi Engine: Iterative Narrative Refinement'));
  logger.info(chalk.cyan('═'.repeat(60)));
  logger.info(chalk.yellow(`📖 Input: ${inputFile}`));
  logger.info(chalk.yellow(`📁 Output: ${outputDir}`));
  logger.info(chalk.yellow(`🔄 Passes: ${passes} (${getPassNames(passes).join(', ')})`));
  logger.info(chalk.cyan('═'.repeat(60)) + '\n');

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Initialize Yazhi (the developmental editor)
  const narrativeAnalyzer = new NarrativeAnalysis();

  // Read initial story
  let currentStory: string;
  try {
    currentStory = await fs.readFile(inputFile, 'utf-8');
  } catch (error) {
    logger.error(chalk.red(`❌ Failed to read input file: ${inputFile}`));
    throw error;
  }

  let version = 1;
  const critiques: RefineNarrativeResult['critiques'] = {};

  logger.info(chalk.green(`✅ V${version} loaded (${currentStory.length} characters)`));

  // Save V1 (original)
  await saveVersion(outputDir, version, currentStory, 'original');

  // PASS 1: Plot Structure Analysis
  if (passes >= 1) {
    logger.info(chalk.bold.magenta(`\n${'━'.repeat(60)}`));
    logger.info(chalk.bold.magenta('📊 PASS 1: PLOT STRUCTURE ANALYSIS'));
    logger.info(chalk.bold.magenta('━'.repeat(60)));

    const plotAnalysis = await narrativeAnalyzer.analyzePlotStructure(currentStory);
    critiques.plot = plotAnalysis;

    // Save critique
    await saveCritique(outputDir, 'Pass1_PLOT_ANALYSIS', plotAnalysis, 'Plot Structure');

    logger.info(chalk.cyan(`\n📝 Yazhi's Plot Feedback:`));
    logAnalysisReport(plotAnalysis);

    // Revise story based on plot feedback
    logger.info(chalk.yellow(`\n✍️  Miette revising story based on plot feedback...`));
    currentStory = await reviseStoryWithFeedback(currentStory, plotAnalysis, 'plot');
    version++;

    // Save V2
    await saveVersion(outputDir, version, currentStory, 'plot-revised');
    logger.info(chalk.green(`✅ V${version} saved (plot-revised, ${currentStory.length} characters)`));
  }

  // PASS 2: Pacing and Rhythm Analysis
  if (passes >= 2) {
    logger.info(chalk.bold.magenta(`\n${'━'.repeat(60)}`));
    logger.info(chalk.bold.magenta('🎵 PASS 2: PACING AND RHYTHM ANALYSIS'));
    logger.info(chalk.bold.magenta('━'.repeat(60)));

    const pacingAnalysis = await narrativeAnalyzer.analyzePacingAndRhythm(currentStory);
    critiques.pacing = pacingAnalysis;

    await saveCritique(outputDir, 'Pass2_PACING_ANALYSIS', pacingAnalysis, 'Pacing and Rhythm');

    logger.info(chalk.cyan(`\n📝 Yazhi's Pacing Feedback:`));
    logAnalysisReport(pacingAnalysis);

    logger.info(chalk.yellow(`\n✍️  Miette revising story based on pacing feedback...`));
    currentStory = await reviseStoryWithFeedback(currentStory, pacingAnalysis, 'pacing');
    version++;

    await saveVersion(outputDir, version, currentStory, 'pacing-revised');
    logger.info(chalk.green(`✅ V${version} saved (pacing-revised, ${currentStory.length} characters)`));
  }

  // PASS 3: Character Development Analysis
  if (passes >= 3) {
    logger.info(chalk.bold.magenta(`\n${'━'.repeat(60)}`));
    logger.info(chalk.bold.magenta('🎭 PASS 3: CHARACTER DEVELOPMENT ANALYSIS'));
    logger.info(chalk.bold.magenta('━'.repeat(60)));

    const characterAnalysis = await narrativeAnalyzer.analyzeCharacterDevelopment(currentStory);
    critiques.character = characterAnalysis;

    await saveCritique(outputDir, 'Pass3_CHARACTER_ANALYSIS', characterAnalysis, 'Character Development');

    logger.info(chalk.cyan(`\n📝 Yazhi's Character Feedback:`));
    logAnalysisReport(characterAnalysis);

    logger.info(chalk.yellow(`\n✍️  Miette revising story based on character feedback...`));
    currentStory = await reviseStoryWithFeedback(currentStory, characterAnalysis, 'character');
    version++;

    await saveVersion(outputDir, version, currentStory, 'character-revised-FINAL');
    logger.info(chalk.green(`✅ V${version} saved (character-revised) - ${chalk.bold('FINAL VERSION')}`));
  }

  // Summary
  logger.info(chalk.bold.cyan(`\n${'═'.repeat(60)}`));
  logger.info(chalk.bold.green('🎉 REFINEMENT COMPLETE!'));
  logger.info(chalk.bold.cyan('═'.repeat(60)));
  logger.info(chalk.white(`📚 Story evolved through ${version} versions`));
  logger.info(chalk.white(`📁 All outputs saved to: ${chalk.yellow(outputDir)}`));
  logger.info(chalk.white(`📊 Critiques: ${Object.keys(critiques).length} passes`));
  logger.info(chalk.white(`\n${chalk.italic('"The story has been woven, unwoven, and rewoven. It is strong and true."')}`));
  logger.info(chalk.dim(`                                        — Grandma Yazhi\n`));

  return {
    finalStory: currentStory,
    version,
    outputDir,
    critiques
  };
}

/**
 * Revise story incorporating editorial feedback (MOCK IMPLEMENTATION)
 *
 * TODO: Replace with real LLM integration when LLMProvider is activated
 */
async function reviseStoryWithFeedback(
  story: string,
  feedback: any,
  passType: 'plot' | 'pacing' | 'character'
): Promise<string> {
  // Simulate revision time
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock revision: Add editorial notes as comments
  const revisionNote = `\n\n---\n**[Revision Note - ${passType.toUpperCase()} PASS]**\n` +
    `Yazhi's feedback incorporated:\n` +
    `- Strengths acknowledged: ${feedback.strengths.length} points\n` +
    `- Weaknesses addressed: ${feedback.weaknesses.length} issues\n` +
    `- Suggestions implemented: ${feedback.actionableSuggestions.length} improvements\n` +
    `---\n\n`;

  // In real implementation, this would:
  // 1. Construct prompt with story + feedback
  // 2. Call LLM to generate revised version
  // 3. Return complete revised story

  return story + revisionNote;
}

/**
 * Save story version to file
 */
async function saveVersion(
  outputDir: string,
  version: number,
  content: string,
  label: string
): Promise<void> {
  const filename = `V${version}_${label}.md`;
  const filepath = path.join(outputDir, filename);
  await fs.writeFile(filepath, content, 'utf-8');
}

/**
 * Save critique report to markdown file
 */
async function saveCritique(
  outputDir: string,
  filename: string,
  analysis: any,
  passName: string
): Promise<void> {
  const content = formatCritiqueReport(analysis, passName);
  const filepath = path.join(outputDir, `${filename}.md`);
  await fs.writeFile(filepath, content, 'utf-8');
}

/**
 * Format critique as markdown
 */
function formatCritiqueReport(analysis: any, passName: string): string {
  return `# ${passName} Analysis
**Grandma Yazhi's Observations**

Generated: ${analysis.timestamp.toISOString()}

---

## ✅ STRENGTHS

${analysis.strengths.length > 0
  ? analysis.strengths.map((s: string) => `- ${s}`).join('\n')
  : '- (No specific strengths identified in this pass)'
}

---

## ⚠️ WEAKNESSES

${analysis.weaknesses.length > 0
  ? analysis.weaknesses.map((w: string) => `- ${w}`).join('\n')
  : '- (No significant weaknesses identified)'
}

---

## 💡 ACTIONABLE SUGGESTIONS

${analysis.actionableSuggestions.length > 0
  ? analysis.actionableSuggestions.map((a: string, i: number) => `${i + 1}. ${a}`).join('\n')
  : '- (No additional suggestions at this time)'
}

---

## 🔍 OBSERVATIONS

${analysis.structuralObservations || analysis.rhythmObservations || analysis.characterObservations}

---

*This analysis was generated by the Spiral-Miadi Engine's NarrativeAnalysis capability, embodying the wisdom of Yazhi, Keeper of Stories.*
`;
}

/**
 * Log analysis report to console
 */
function logAnalysisReport(analysis: any): void {
  if (analysis.strengths.length > 0) {
    logger.info(chalk.green(`  ✅ Strengths (${analysis.strengths.length}):`));
    analysis.strengths.forEach((s: string) => {
      logger.info(chalk.green(`     • ${s}`));
    });
  }

  if (analysis.weaknesses.length > 0) {
    logger.info(chalk.yellow(`  ⚠️  Weaknesses (${analysis.weaknesses.length}):`));
    analysis.weaknesses.forEach((w: string) => {
      logger.info(chalk.yellow(`     • ${w}`));
    });
  }

  if (analysis.actionableSuggestions.length > 0) {
    logger.info(chalk.cyan(`  💡 Suggestions (${analysis.actionableSuggestions.length}):`));
    analysis.actionableSuggestions.forEach((a: string, i: number) => {
      logger.info(chalk.cyan(`     ${i + 1}. ${a}`));
    });
  }
}

/**
 * Get human-readable pass names
 */
function getPassNames(passes: number): string[] {
  const allPasses = ['Plot', 'Pacing', 'Character'];
  return allPasses.slice(0, passes);
}
