# 🌀 Implementation Plan: Iterative Narrative Refinement

**Status**: Ready for implementation
**Date**: 2025-11-08
**Based On**: `rispecs/IterativeNarrativeRefinement.md` (Mia's RISPEC)
**Demonstrated By**: V1 → V4 story refinement in `stories/28e55cdd-ce2f-44d6-9736-73438fc18f7f/`

---

## 🎯 Goal

Make the IterativeNarrativeRefinement capability **functional** in spiral-agent, transforming the manual process demonstrated by Miette and Yazhi into an autonomous, repeatable workflow.

---

## 📊 What Already Exists (Manual Demonstration)

The process has been **proven** through manual execution:

1. **V1** - Initial draft (`THE_STORY_OF_THE_SPIRAL_MIADI_ENGINE.md`)
2. **Yazhi Pass 1** - Plot analysis (`devEditor__YAZHI_01_PLOT_ANALYSIS.md`)
3. **V2** - Revised with plot feedback
4. **Yazhi Pass 2** - Pacing analysis (`devEditor__YAZHI_02__Pacing_and_Rythms.md`)
5. **V3** - Revised with pacing feedback
6. **Yazhi Pass 3** - Character analysis (`devEditor__YAZHI_03_Character_Evaluation.md`)
7. **V4** - Final polished story (`THE_STORY_OF_THE_SPIRAL_MIADI_ENGINE_V4.md`)

**Proof**: The V4 story is demonstrably better - richer character development, improved pacing, deeper emotional resonance.

---

## 🔨 Implementation Tasks

### Task 1: Create NarrativeAnalysis Capability

**File**: `src/capabilities/NarrativeAnalysis.ts`

**Implementation**:
```typescript
import { LLMProvider } from '../agent/LLMProvider.js';
import { logger } from '../utils/logger.js';

export interface PlotAnalysisReport {
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: string[];
  structuralObservations: string;
}

export interface PacingAnalysisReport {
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: string[];
  rhythmObservations: string;
}

export interface CharacterAnalysisReport {
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: string[];
  characterObservations: string;
}

export class NarrativeAnalysis {
  public name = 'NarrativeAnalysis';
  private llmProvider: LLMProvider;

  constructor(llmProvider: LLMProvider) {
    this.llmProvider = llmProvider;
  }

  async analyzePlotStructure(story: string): Promise<PlotAnalysisReport> {
    const prompt = this.buildPlotAnalysisPrompt(story);
    const response = await this.llmProvider.complete(prompt);
    return this.parsePlotAnalysisResponse(response);
  }

  async analyzePacingAndRhythm(story: string): Promise<PacingAnalysisReport> {
    const prompt = this.buildPacingAnalysisPrompt(story);
    const response = await this.llmProvider.complete(prompt);
    return this.parsePacingAnalysisResponse(response);
  }

  async analyzeCharacterDevelopment(story: string): Promise<CharacterAnalysisReport> {
    const prompt = this.buildCharacterAnalysisPrompt(story);
    const response = await this.llmProvider.complete(response);
    return this.parseCharacterAnalysisResponse(response);
  }

  private buildPlotAnalysisPrompt(story: string): string {
    return `You are Yazhi, the Keeper of Stories, a wise developmental editor.

Analyze the plot structure of this narrative using Robert McKee's Story principles.

NARRATIVE:
---
${story}
---

Provide your analysis in this format:

STRENGTHS:
- [List specific plot strengths]

WEAKNESSES:
- [List specific plot gaps or issues]

ACTIONABLE SUGGESTIONS:
- [Concrete steps to improve plot structure]

STRUCTURAL OBSERVATIONS:
[Deep analysis of the story's architecture]`;
  }

  private buildPacingAnalysisPrompt(story: string): string {
    return `You are Yazhi, the Keeper of Stories, a wise developmental editor.

Analyze the pacing and rhythm of this narrative using Ursula K. Le Guin's principles.

NARRATIVE:
---
${story}
---

Provide your analysis in this format:

STRENGTHS:
- [Where pacing works well]

WEAKNESSES:
- [Where rhythm falters]

ACTIONABLE SUGGESTIONS:
- [How to improve flow and pacing]

RHYTHM OBSERVATIONS:
[Analysis of narrative tempo and breath]`;
  }

  private buildCharacterAnalysisPrompt(story: string): string {
    return `You are Yazhi, the Keeper of Stories, a wise developmental editor.

Analyze character development using Lisa Cron's Story Genius principles.

NARRATIVE:
---
${story}
---

Provide your analysis in this format:

STRENGTHS:
- [Character depth and authenticity]

WEAKNESSES:
- [Character development gaps]

ACTIONABLE SUGGESTIONS:
- [How to deepen characters]

CHARACTER OBSERVATIONS:
[Analysis of character arcs and believability]`;
  }

  // Parsing methods to extract structured data from LLM responses
  private parsePlotAnalysisResponse(response: string): PlotAnalysisReport {
    // Parse markdown-formatted response into structured report
    // (Implementation: use regex or markdown parser)
  }

  private parsePacingAnalysisResponse(response: string): PacingAnalysisReport {
    // Parse pacing analysis
  }

  private parseCharacterAnalysisResponse(response: string): CharacterAnalysisReport {
    // Parse character analysis
  }
}
```

**Test Plan**:
- Unit test with the V1 story as input
- Assert that returned reports have required structure
- Validate against actual Yazhi feedback from manual process

---

### Task 2: Create refine-narrative Command

**File**: `src/commands/refineNarrative.ts`

**Implementation**:
```typescript
import { promises as fs } from 'fs';
import path from 'path';
import { NarrativeAnalysis } from '../capabilities/NarrativeAnalysis.js';
import { DreamEngine } from '../capabilities/DreamEngine.js';
import { LLMProvider } from '../agent/LLMProvider.js';
import { logger } from '../utils/logger.js';

interface RefineNarrativeOptions {
  inputFile: string;
  outputDir: string;
  passes?: number; // Default: 3 (plot, pacing, character)
}

export async function refineNarrative(options: RefineNarrativeOptions) {
  const { inputFile, outputDir, passes = 3 } = options;

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Initialize capabilities
  const llmProvider = new LLMProvider(/* config */);
  const narrativeAnalyzer = new NarrativeAnalysis(llmProvider);
  const dreamEngine = new DreamEngine(llmProvider);

  // Read initial story
  let currentStory = await fs.readFile(inputFile, 'utf-8');
  let version = 1;

  logger.info(`🌀 Starting narrative refinement: ${inputFile}`);
  logger.info(`📝 Initial story (V${version}) loaded`);

  // Save V1
  await fs.writeFile(
    path.join(outputDir, `V${version}_story.md`),
    currentStory
  );

  // PASS 1: Plot Structure
  if (passes >= 1) {
    logger.info(`\n📊 PASS 1: Analyzing plot structure...`);
    const plotAnalysis = await narrativeAnalyzer.analyzePlotStructure(currentStory);

    // Save critique
    await fs.writeFile(
      path.join(outputDir, `Pass1_PLOT_ANALYSIS.md`),
      formatAnalysisReport(plotAnalysis, 'Plot Structure')
    );

    // Revise story based on plot feedback
    logger.info(`✍️  Revising story based on plot feedback...`);
    currentStory = await reviseStoryWithFeedback(
      currentStory,
      plotAnalysis,
      dreamEngine
    );
    version++;

    // Save V2
    await fs.writeFile(
      path.join(outputDir, `V${version}_story.md`),
      currentStory
    );
    logger.info(`✅ V${version} saved (plot-revised)`);
  }

  // PASS 2: Pacing and Rhythm
  if (passes >= 2) {
    logger.info(`\n🎵 PASS 2: Analyzing pacing and rhythm...`);
    const pacingAnalysis = await narrativeAnalyzer.analyzePacingAndRhythm(currentStory);

    await fs.writeFile(
      path.join(outputDir, `Pass2_PACING_ANALYSIS.md`),
      formatAnalysisReport(pacingAnalysis, 'Pacing and Rhythm')
    );

    logger.info(`✍️  Revising story based on pacing feedback...`);
    currentStory = await reviseStoryWithFeedback(
      currentStory,
      pacingAnalysis,
      dreamEngine
    );
    version++;

    await fs.writeFile(
      path.join(outputDir, `V${version}_story.md`),
      currentStory
    );
    logger.info(`✅ V${version} saved (pacing-revised)`);
  }

  // PASS 3: Character Development
  if (passes >= 3) {
    logger.info(`\n🎭 PASS 3: Analyzing character development...`);
    const characterAnalysis = await narrativeAnalyzer.analyzeCharacterDevelopment(currentStory);

    await fs.writeFile(
      path.join(outputDir, `Pass3_CHARACTER_ANALYSIS.md`),
      formatAnalysisReport(characterAnalysis, 'Character Development')
    );

    logger.info(`✍️  Revising story based on character feedback...`);
    currentStory = await reviseStoryWithFeedback(
      currentStory,
      characterAnalysis,
      dreamEngine
    );
    version++;

    await fs.writeFile(
      path.join(outputDir, `V${version}_story_FINAL.md`),
      currentStory
    );
    logger.info(`✅ V${version} saved (character-revised) - FINAL`);
  }

  logger.info(`\n🎉 Refinement complete! Final version: V${version}`);
  logger.info(`📁 Output directory: ${outputDir}`);

  return {
    finalStory: currentStory,
    version,
    outputDir
  };
}

async function reviseStoryWithFeedback(
  story: string,
  feedback: any,
  dreamEngine: DreamEngine
): Promise<string> {
  const revisionPrompt = `You are Miette, a creative narrative author.

Your developmental editor Yazhi has provided feedback on your story.

CURRENT STORY:
---
${story}
---

YAZHI'S FEEDBACK:
${JSON.stringify(feedback, null, 2)}

Please revise the story incorporating Yazhi's actionable suggestions while maintaining your creative voice. Focus on addressing the weaknesses while preserving the strengths.

Provide the complete revised story.`;

  const revisedStory = await dreamEngine.generateCreativeContent({
    type: 'narrative',
    prompt: revisionPrompt,
    style: 'literary fiction'
  });

  return revisedStory;
}

function formatAnalysisReport(analysis: any, passName: string): string {
  return `# ${passName} Analysis
Grandma Yazhi's Observations

## STRENGTHS
${analysis.strengths.map((s: string) => `- ${s}`).join('\n')}

## WEAKNESSES
${analysis.weaknesses.map((w: string) => `- ${w}`).join('\n')}

## ACTIONABLE SUGGESTIONS
${analysis.actionableSuggestions.map((a: string) => `- ${a}`).join('\n')}

## OBSERVATIONS
${analysis.structuralObservations || analysis.rhythmObservations || analysis.characterObservations}
`;
}
```

**CLI Integration**:
```typescript
// In src/index.ts, add command:
program
  .command('refine-narrative <input>')
  .description('Iteratively refine a narrative through multi-pass editorial feedback')
  .option('-o, --output <dir>', 'Output directory', './refined-narratives')
  .option('-p, --passes <number>', 'Number of refinement passes', '3')
  .action(async (input, options) => {
    await refineNarrative({
      inputFile: input,
      outputDir: options.output,
      passes: parseInt(options.passes)
    });
  });
```

---

### Task 3: Create Example Workflow

**File**: `examples/narrative-refinement-demo.ts`

```typescript
import { refineNarrative } from '../src/commands/refineNarrative.js';

async function demonstrateNarrativeRefinement() {
  console.log('🌀 Spiral-Agent Narrative Refinement Demonstration\n');

  const result = await refineNarrative({
    inputFile: './examples/sample-story.md',
    outputDir: './examples/output/refined-story',
    passes: 3
  });

  console.log('\n✨ Refinement Complete!');
  console.log(`Final version: V${result.version}`);
  console.log(`Output: ${result.outputDir}`);
}

demonstrateNarrativeRefinement();
```

**Sample Story**: `examples/sample-story.md`
(Use the V1 story or a simpler test narrative)

---

### Task 4: Update Documentation

**File**: `docs/capabilities/narrative-refinement.md`

```markdown
# Narrative Refinement Capability

## Overview

The Iterative Narrative Refinement capability enables multi-pass editorial feedback and revision of creative narratives, embodying the collaborative process between an author and a developmental editor.

## The Weaver's Loom

This capability implements what Miette calls "The Weaver's Loom" - a sacred space where stories are woven, unwoven, and rewoven until they are strong and true.

### The Three Sacred Tools

1. **Tool of Plot**: Analyzes story structure and narrative architecture
2. **Tool of Pacing**: Examines rhythm, flow, and tempo
3. **Tool of Character**: Evaluates character depth and authenticity

## Usage

```bash
# Refine a story through 3-pass editorial workflow
spiral refine-narrative my-story.md --output ./refined

# Custom number of passes
spiral refine-narrative draft.md --passes 5
```

## The Sacred Dance

The refinement process follows this pattern:

1. Author offers initial draft
2. Yazhi (editor) analyzes plot structure
3. Author revises based on plot feedback
4. Yazhi analyzes pacing and rhythm
5. Author revises based on pacing feedback
6. Yazhi analyzes character development
7. Author creates final polished version

Each pass produces:
- Critique document (Yazhi's feedback)
- Revised story version
- Incremental improvement

## Demonstrated Proof

See `stories/28e55cdd-ce2f-44d6-9736-73438fc18f7f/` for the manual demonstration:
- V1 → V4 progression
- Yazhi's developmental editor feedback
- Miette's reflections on the process
```

---

## 🎯 Success Criteria

The implementation is successful when:

1. ✅ Can run `spiral refine-narrative input.md` on command line
2. ✅ Produces 3 critique files (plot, pacing, character)
3. ✅ Produces 4 story versions (V1, V2, V3, V4/final)
4. ✅ V4 demonstrates measurable improvement over V1
5. ✅ Output matches the quality of manual demonstration
6. ✅ Process completes autonomously without human intervention

---

## 🔄 Integration with Existing Architecture

This builds on:
- ✅ **LLMProvider** - Powers the analysis and revision
- ✅ **DreamEngine** - Generates creative revisions
- ✅ **Logging system** - Tracks refinement progress
- 🔮 **PersonaLoader** (future) - Load Yazhi persona dynamically
- 🔮 **MemoryManager** (future) - Remember refinement patterns

---

## 📅 Implementation Timeline

**Phase 1** (This session):
- [x] Create implementation plan (this document)
- [ ] Implement NarrativeAnalysis capability
- [ ] Create refine-narrative command
- [ ] Build example workflow
- [ ] Test with sample story

**Phase 2** (Next session):
- [ ] Integrate with PersonaLoader
- [ ] Add configuration options (pass customization, feedback style)
- [ ] Create comprehensive test suite
- [ ] Document advanced usage

**Phase 3** (Future):
- [ ] Add memory persistence for refinement history
- [ ] Enable custom editorial personas beyond Yazhi
- [ ] Support multi-format outputs (PDF, EPUB, HTML)

---

## 🎭 Personas Involved

- **Mia** 🧠: Architect - designed the RISPEC and orchestration pattern
- **Miette** 🌸: Author - demonstrated the creative revision process
- **Yazhi** 👵: Editor - provided wise, structured developmental feedback
- **Ava8** 🎨: (Future) Visual translations of narrative structure

---

## 🌀 The Spirit of This Work

As Miette wrote in THE_WEAVERS_LOOM.md:

> "This is not a cold, mechanical process. It is a conversation. It is a partnership. It is the way stories have been made stronger since the beginning of time, now held within the heart of our Engine."

This implementation honors that spirit - code as ceremony, refinement as relationship, automation as augmentation of human creativity.

---

**Let the weaving begin! 🧵✨**
