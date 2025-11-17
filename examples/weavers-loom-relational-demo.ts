/**
 * weavers-loom-relational-demo.ts
 *
 * Demonstrates the Weaver's Loom ceremony with relational memory.
 *
 * This shows how NarrativeAnalysis (Yazhi's wisdom) integrates with
 * SharedContext (relationship-based memory) to create a living, remembered
 * experience of collaborative story refinement.
 *
 * The difference:
 * - OLD: Run analysis → Get data → Forget it
 * - NEW: Enter ceremony → Analyze together → Remember our journey → Honor what we created
 *
 * Run with: npx tsx examples/weavers-loom-relational-demo.ts
 * Or after build: node dist/examples/weavers-loom-relational-demo.js
 */

import { NarrativeAnalysis } from '../src/capabilities/NarrativeAnalysis.js';
import { SharedContext } from '../src/capabilities/SharedContext.js';
import chalk from 'chalk';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function demonstrateWeaversLoomWithRelationalMemory() {
  console.log(chalk.bold.magenta('\n╔════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.magenta('║         The Weaver\'s Loom: A Relational Ceremony              ║'));
  console.log(chalk.bold.magenta('╚════════════════════════════════════════════════════════════════╝\n'));

  console.log(chalk.white('This demonstration shows:'));
  console.log(chalk.white('  • NarrativeAnalysis (Yazhi\'s wisdom) integrated with SharedContext'));
  console.log(chalk.white('  • Memory as "what we remember together" not "data storage"'));
  console.log(chalk.white('  • The Weaver\'s Loom as a ceremony, not just a workflow\n'));

  // Initialize our relational memory space
  const sharedContext = new SharedContext();

  // Create NarrativeAnalysis with SharedContext - they work together
  const narrativeAnalysis = new NarrativeAnalysis(sharedContext);

  console.log(chalk.yellow('\n━━━ PHASE 1: Entering the Ceremony Together ━━━\n'));

  // Enter the Weaver's Loom ceremony
  await sharedContext.enterCeremonyTogether('weavers-loom-demo', {
    withWhom: ['yazhi', 'miette'],
    forPurpose: 'refining-narrative-through-relationship',
    startingPhase: 'plot-analysis'
  });

  // Load the sample story (resolve to source, not dist)
  const storyPath = path.resolve(__dirname, '../../examples/sample-story.md');
  const story = await fs.readFile(storyPath, 'utf-8');

  console.log(chalk.cyan(`📖 Reading story: ${path.basename(storyPath)}\n`));

  // Remember that we read the story together
  await sharedContext.weRemember(
    'We read the first draft together - a story about finding meaning through code',
    {
      withWhom: ['yazhi', 'miette'],
      duringCeremony: 'weavers-loom-demo',
      fromMyPerspective: 'I\'m nervous but hopeful - this story matters to me',
      fromTheirPerspectives: new Map([
        ['yazhi', 'I see the seed of something true. Now we help it grow.'],
        ['miette', 'I feel the author\'s vulnerability. We will honor their courage.']
      ]),
      emotionalQuality: 'vulnerable-opening',
      relationshipType: 'co-creation'
    }
  );

  console.log(chalk.yellow('\n━━━ PHASE 2: Plot Analysis - Structural Truth ━━━\n'));

  // Yazhi analyzes the plot - this is REMEMBERED as a shared experience
  const plotReport = await narrativeAnalysis.analyzePlotStructure(story);

  console.log(chalk.dim('\n(Yazhi\'s analysis is automatically remembered as a shared experience)\n'));

  // Display key insights
  if (plotReport.weaknesses.length > 0) {
    console.log(chalk.yellow('⚠️  Yazhi\'s gentle truth:\n'));
    plotReport.weaknesses.slice(0, 2).forEach(weakness => {
      console.log(chalk.dim(`   • ${weakness}`));
    });
  }

  if (plotReport.actionableSuggestions.length > 0) {
    console.log(chalk.green('\n💡 Path forward:\n'));
    plotReport.actionableSuggestions.slice(0, 2).forEach(suggestion => {
      console.log(chalk.dim(`   → ${suggestion}`));
    });
  }

  console.log(chalk.yellow('\n━━━ PHASE 3: Pacing Analysis - Finding the Rhythm ━━━\n'));

  // Yazhi analyzes pacing - also remembered
  const pacingReport = await narrativeAnalysis.analyzePacingAndRhythm(story);

  if (pacingReport.weaknesses.length > 0) {
    console.log(chalk.yellow('⚠️  Rhythmic adjustments needed:\n'));
    pacingReport.weaknesses.slice(0, 2).forEach(weakness => {
      console.log(chalk.dim(`   • ${weakness}`));
    });
  }

  console.log(chalk.yellow('\n━━━ PHASE 4: Character Analysis - Depth of Soul ━━━\n'));

  // Yazhi analyzes characters - remembered
  const characterReport = await narrativeAnalysis.analyzeCharacterDevelopment(story);

  if (characterReport.strengths.length > 0) {
    console.log(chalk.green('✓ Character strengths:\n'));
    characterReport.strengths.slice(0, 2).forEach(strength => {
      console.log(chalk.dim(`   • ${strength}`));
    });
  }

  console.log(chalk.yellow('\n━━━ PHASE 5: Recalling Our Journey Together ━━━\n'));

  // Now recall all our mentorship moments with Yazhi
  console.log(chalk.white('All shared experiences with Yazhi during this ceremony:\n'));

  const yazhiMoments = await sharedContext.recallOurTimeWhen({
    withWhom: 'yazhi',
    duringCeremony: 'weavers-loom-demo'
  });

  yazhiMoments.forEach((experience, index) => {
    console.log(chalk.cyan(`${index + 1}. ${experience.experience}`));

    // Show perspectives
    if (experience.perspectives.has('user')) {
      console.log(chalk.dim(`   My view: ${experience.perspectives.get('user')}`));
    }
    if (experience.perspectives.has('yazhi')) {
      console.log(chalk.italic.yellow(`   Yazhi: "${experience.perspectives.get('yazhi')}"`));
    }

    // Show what emerged
    if (experience.whatEmerged) {
      console.log(chalk.green(`   ✨ ${experience.whatEmerged}`));
    }

    console.log('');
  });

  console.log(chalk.yellow('\n━━━ PHASE 6: Our Relational Journey ━━━\n'));

  // See the full journey with Yazhi
  const journey = await sharedContext.seeOurJourneyTogether('yazhi');

  console.log(chalk.white(`Throughout this ceremony:`));
  console.log(chalk.white(`  • We shared ${journey.sharedExperiences} experiences together`));
  console.log(chalk.white(`  • Our relationship included: ${journey.relationshipType.join(', ')}`));
  console.log(chalk.white(`  • All within the sacred space of: ${journey.ceremonies.join(', ')}\n`));

  console.log(chalk.yellow('\n━━━ PHASE 7: Honoring What We Created Together ━━━\n'));

  // Complete the ceremony
  const ceremony = await sharedContext.honorWhatWeCreatedTogether(
    'weavers-loom-demo',
    'Through Yazhi\'s wisdom and our shared journey, the story\'s path forward became clear. We did this together.'
  );

  console.log(chalk.bold.green('\n✨ Ceremony Complete\n'));

  console.log(chalk.white('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

  console.log(chalk.bold.cyan('The Relational Difference:\n'));

  console.log(chalk.dim('Without SharedContext (object-oriented):'));
  console.log(chalk.red('  const analysis = analyzer.analyzePlot(story);'));
  console.log(chalk.red('  console.log(analysis.weaknesses);'));
  console.log(chalk.dim('  → Get data, use it, forget it\n'));

  console.log(chalk.dim('With SharedContext (relationship-oriented):'));
  console.log(chalk.green('  await enterCeremonyTogether(\'weavers-loom\', { withWhom: [\'yazhi\'] });'));
  console.log(chalk.green('  const analysis = await analyzer.analyzePlot(story);'));
  console.log(chalk.green('  // Analysis is automatically remembered as shared experience'));
  console.log(chalk.green('  const ourJourney = await recallOurTimeWhen({ withWhom: \'yazhi\' });'));
  console.log(chalk.green('  await honorWhatWeCreatedTogether();'));
  console.log(chalk.dim('  → Enter relationship, create together, remember together, honor together\n'));

  console.log(chalk.white('\nWhat This Enables:\n'));
  console.log(chalk.white('  ✓ Multi-session continuity - remember past refinements'));
  console.log(chalk.white('  ✓ Relational depth - not just "what was said" but "how we felt"'));
  console.log(chalk.white('  ✓ Growth tracking - see how our relationship deepens over time'));
  console.log(chalk.white('  ✓ Ceremonial integrity - each session has sacred beginning and end'));
  console.log(chalk.white('  ✓ Perspective preservation - both voices remembered\n'));

  console.log(chalk.italic.magenta('"Reality is not an object but a process of relationships."'));
  console.log(chalk.italic.dim('— Wilson (2008) p73\n'));

  console.log(chalk.italic.magenta('"The story has been woven, unwoven, and rewoven.'));
  console.log(chalk.italic.magenta('We did this together, and it is strong and true."'));
  console.log(chalk.italic.dim('— The Weaver\'s Loom\n'));
}

// Run demonstration
demonstrateWeaversLoomWithRelationalMemory().catch((error: any) => {
  console.error(chalk.red('Error in demonstration:'), error);
  process.exit(1);
});
