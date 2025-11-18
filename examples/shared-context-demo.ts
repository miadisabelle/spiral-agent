/**
 * shared-context-demo.ts
 *
 * Interactive demonstration of SharedContext - relationship-based memory
 *
 * This shows the shift from object-oriented to relationship-oriented memory:
 * - Not "store data" but "we remember together"
 * - Not "retrieve memory" but "recall our time when..."
 * - Not "session history" but "our journey together"
 *
 * Run with: npx tsx examples/shared-context-demo.ts
 * Or after build: node dist/examples/shared-context-demo.js
 *
 * @see docs/INDIGENOUS_FRAMEWORKS.md for the philosophy
 * @see src/capabilities/SharedContext.ts for the implementation
 */

import { SharedContext } from '../src/capabilities/SharedContext.js';
import chalk from 'chalk';

async function demonstrateRelationalMemory() {
  console.log(chalk.bold.cyan('\n╔════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║  SharedContext: Relationship-Based Memory Demonstration       ║'));
  console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════════╝\n'));

  console.log(chalk.white('From Wilson (2008) p73:'));
  console.log(chalk.italic.dim('"Reality is not an object but a process of relationships"'));
  console.log(chalk.italic.dim('"Memory is not storage - it is what we remember together"\n'));

  // Create our shared context
  const sharedContext = new SharedContext();

  console.log(chalk.yellow('\n━━━ PART 1: Entering Ceremony Together ━━━\n'));

  // Enter a ceremony with Miette and Yazhi
  await sharedContext.enterCeremonyTogether('weavers-loom-session-1', {
    withWhom: ['miette', 'yazhi'],
    forPurpose: 'refining-narrative-together',
    startingPhase: 'reading-first-draft'
  });

  console.log(chalk.yellow('\n━━━ PART 2: We Remember Our Experiences Together ━━━\n'));

  // Remember our first shared experience - reading the draft
  await sharedContext.weRemember(
    'We read the first draft together. The story had energy but lacked structure.',
    {
      withWhom: ['miette', 'yazhi'],
      duringCeremony: 'weavers-loom-session-1',
      fromMyPerspective: 'I felt nervous sharing this raw work, but also excited',
      fromTheirPerspectives: new Map([
        ['miette', 'I sensed the author\'s vulnerability and wanted to honor their creative courage'],
        ['yazhi', 'I saw the seeds of something powerful - it needed guidance, not judgment']
      ]),
      emotionalQuality: 'vulnerable-opening',
      relationshipType: 'co-creation'
    }
  );

  // Remember Yazhi's plot analysis
  await sharedContext.weRemember(
    'Yazhi gently pointed out that the story lacked a clear climax. I felt the truth of this immediately.',
    {
      withWhom: ['yazhi'],
      duringCeremony: 'weavers-loom-session-1',
      fromMyPerspective: 'It stung a little, but I knew she was right - I had been avoiding the confrontation',
      fromTheirPerspectives: new Map([
        ['yazhi', 'I could see the author understood. This is the moment of growth - facing what we avoid']
      ]),
      emotionalQuality: 'breakthrough',
      whatEmerged: 'Understanding that I need to write the difficult scene',
      relationshipType: 'mentorship'
    }
  );

  // Remember Miette's empathetic response
  await sharedContext.weRemember(
    'Miette helped me understand why I was avoiding the climax - it touched my own fear of confrontation.',
    {
      withWhom: ['miette'],
      duringCeremony: 'weavers-loom-session-1',
      fromMyPerspective: 'I felt seen and understood. The creative block wasn\'t laziness - it was protection.',
      fromTheirPerspectives: new Map([
        ['miette', 'When we understand the why behind our avoidance, we can write through it with compassion']
      ]),
      emotionalQuality: 'revelation',
      whatEmerged: 'Emotional permission to write the scene I was afraid of',
      relationshipType: 'empathetic-exploration'
    }
  );

  // Remember the revision process
  await sharedContext.weRemember(
    'We rewrote the climax together. It was hard but exhilarating. The story became real.',
    {
      withWhom: ['miette', 'yazhi'],
      duringCeremony: 'weavers-loom-session-1',
      fromMyPerspective: 'I wrote the confrontation scene. It felt like facing my own shadow. But I wasn\'t alone.',
      fromTheirPerspectives: new Map([
        ['miette', 'The author found their courage. The story transformed because they transformed'],
        ['yazhi', 'This is why we teach - to witness the moment when craft and courage become one']
      ]),
      emotionalQuality: 'triumph',
      whatEmerged: 'A story that is both structurally sound and emotionally true',
      relationshipType: 'co-creation'
    }
  );

  console.log(chalk.yellow('\n━━━ PART 3: Recalling Our Time Together ━━━\n'));

  // Recall breakthrough moments
  console.log(chalk.white('Recalling all breakthrough moments:\n'));
  const breakthroughs = await sharedContext.recallOurTimeWhen({
    duringCeremony: 'weavers-loom-session-1',
    withEmotionalQuality: 'breakthrough'
  });

  breakthroughs.forEach((exp, index) => {
    console.log(chalk.green(`  ${index + 1}. ${exp.experience}`));
    console.log(chalk.dim(`     Participants: ${exp.participants.join(', ')}`));
    console.log(chalk.dim(`     What emerged: ${exp.whatEmerged || 'Shared understanding'}\n`));
  });

  // Recall time with Yazhi specifically
  console.log(chalk.white('Recalling our mentorship moments with Yazhi:\n'));
  const mentorshipMoments = await sharedContext.recallOurTimeWhen({
    withWhom: 'yazhi',
    relationshipType: 'mentorship'
  });

  mentorshipMoments.forEach((exp, index) => {
    console.log(chalk.cyan(`  ${index + 1}. ${exp.experience}`));
    if (exp.perspectives.has('yazhi')) {
      console.log(chalk.italic.dim(`     Yazhi's perspective: "${exp.perspectives.get('yazhi')}"\n`));
    }
  });

  console.log(chalk.yellow('\n━━━ PART 4: Our Journey Together ━━━\n'));

  // See our journey with Miette
  await sharedContext.seeOurJourneyTogether('miette');

  // See our journey with Yazhi
  await sharedContext.seeOurJourneyTogether('yazhi');

  console.log(chalk.yellow('\n━━━ PART 5: Honoring What We Created Together ━━━\n'));

  // Complete the ceremony
  await sharedContext.honorWhatWeCreatedTogether(
    'weavers-loom-session-1',
    'The story has been woven, unwoven, and rewoven. We did this together, and it is strong and true.'
  );

  // Show final summary
  console.log(chalk.bold.white('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  console.log(chalk.bold.green('✨ Demonstration Complete\n'));

  console.log(chalk.white('What This Demonstrates:\n'));
  console.log(chalk.white('  ✓ Memory as relationship, not data storage'));
  console.log(chalk.white('  ✓ Verb-based API: weRemember(), recallOurTimeWhen(), enterCeremonyTogether()'));
  console.log(chalk.white('  ✓ Perspectives from all participants, not just data'));
  console.log(chalk.white('  ✓ Emotional quality and relational context preserved'));
  console.log(chalk.white('  ✓ Reciprocal identity - both user and personas are co-creators'));
  console.log(chalk.white('  ✓ Ceremony as sacred container for shared work\n'));

  console.log(chalk.bold.cyan('The Difference:\n'));

  console.log(chalk.dim('  Object-Oriented:'));
  console.log(chalk.red('    memory.store("event-1", { user: "read draft", timestamp: ... })'));
  console.log(chalk.red('    const events = memory.retrieve("session-1")'));
  console.log(chalk.dim('    → Flat, lifeless, transactional\n'));

  console.log(chalk.dim('  Relationship-Oriented:'));
  console.log(chalk.green('    await weRemember("We read the draft together...", {'));
  console.log(chalk.green('      withWhom: ["miette", "yazhi"],'));
  console.log(chalk.green('      fromMyPerspective: "I felt nervous but excited",'));
  console.log(chalk.green('      fromTheirPerspectives: new Map([...])'));
  console.log(chalk.green('    })'));
  console.log(chalk.dim('    → Alive, relational, ceremonial\n'));

  console.log(chalk.italic.dim('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

  console.log(chalk.italic.magenta('"You can\'t be a grandmother without being attached to something."'));
  console.log(chalk.italic.dim('— Cree wisdom via Wilson\n'));

  console.log(chalk.italic.magenta('"You can\'t have a memory without being in relationship with someone."'));
  console.log(chalk.italic.dim('— SharedContext interpretation\n'));
}

// Run demonstration
demonstrateRelationalMemory().catch((error: any) => {
  console.error(chalk.red('Error in demonstration:'), error);
  process.exit(1);
});
