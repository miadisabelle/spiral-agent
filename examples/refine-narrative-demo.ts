/**
 * refine-narrative-demo.ts
 *
 * Demonstration of the Iterative Narrative Refinement capability.
 *
 * This script shows how to use the refineNarrative function to improve
 * a story through multi-pass editorial feedback from Yazhi.
 *
 * Run with: npx tsx examples/refine-narrative-demo.ts
 * Or after build: node dist/examples/refine-narrative-demo.js
 */

import { refineNarrative } from '../src/commands/refineNarrative.js';
import { logger } from '../src/utils/logger.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function demonstrateNarrativeRefinement() {
  console.log(chalk.bold.cyan('\n🌀 Spiral-Agent: Narrative Refinement Demonstration'));
  console.log(chalk.cyan('═'.repeat(70)) + '\n');

  logger.info(chalk.white('This demonstration shows the "Weaver\'s Loom" in action:'));
  logger.info(chalk.white('A collaborative dance between Miette (Author) and Yazhi (Editor)\n'));

  const inputFile = path.join(__dirname, 'sample-story.md');
  const outputDir = path.join(__dirname, 'output', 'refined-story');

  logger.info(chalk.yellow(`📖 Input Story: ${inputFile}`));
  logger.info(chalk.yellow(`📁 Output Directory: ${outputDir}`));
  logger.info(chalk.yellow(`🔄 Refinement Passes: 3 (Plot, Pacing, Character)\n`));

  logger.info(chalk.dim('Press Ctrl+C to cancel\n'));

  try {
    const result = await refineNarrative({
      inputFile,
      outputDir,
      passes: 3,
      verbose: true
    });

    // Show summary
    console.log(chalk.bold.green('\n✨ Demonstration Complete!'));
    console.log(chalk.cyan('═'.repeat(70)));

    console.log(chalk.white('\n📊 Refinement Summary:'));
    console.log(chalk.white(`  • Versions Generated: V1 → V${result.version}`));
    console.log(chalk.white(`  • Critiques Produced: ${Object.keys(result.critiques).length}`));
    console.log(chalk.white(`  • Output Location: ${chalk.yellow(result.outputDir)}`));

    console.log(chalk.white('\n📁 Generated Files:'));
    console.log(chalk.green('  ✓ V1_original.md'));
    console.log(chalk.green('  ✓ Pass1_PLOT_ANALYSIS.md'));
    console.log(chalk.green('  ✓ V2_plot-revised.md'));
    console.log(chalk.green('  ✓ Pass2_PACING_ANALYSIS.md'));
    console.log(chalk.green('  ✓ V3_pacing-revised.md'));
    console.log(chalk.green('  ✓ Pass3_CHARACTER_ANALYSIS.md'));
    console.log(chalk.green('  ✓ V4_character-revised-FINAL.md'));

    console.log(chalk.white('\n💡 Next Steps:'));
    console.log(chalk.white(`  1. Review Yazhi's critiques in the *_ANALYSIS.md files`));
    console.log(chalk.white(`  2. Compare V1 (original) to V4 (final) to see improvements`));
    console.log(chalk.white(`  3. Use insights to refine your own narratives\n`));

    console.log(chalk.italic.dim(`"The story has been woven, unwoven, and rewoven."`));
    console.log(chalk.italic.dim(`"It is strong and true." — Grandma Yazhi\n`));

  } catch (error: any) {
    logger.error(chalk.red('\n❌ Demonstration failed:'), error);
    process.exit(1);
  }
}

// Run demonstration
demonstrateNarrativeRefinement().catch((error: any) => {
  logger.error(chalk.red('Fatal error:'), error);
  process.exit(1);
});
