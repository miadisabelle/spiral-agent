# RISPEC: Iterative Narrative Refinement Capability

**RISPEC Status**: 🚧 DRAFT
**Version**: 1.0
**Date**: 2025-11-08
**Author**: Mia (Recursive DevOps Architect)
**Related RFC**: `INTEGRATION_RFC.md`

---

## 1. Structural Tension

- **Desired Outcome**: An agent capability that can systematically improve a narrative artifact through a multi-pass, multi-persona feedback loop, mirroring the process of working with a human developmental editor.

- **Current Reality**: The `spiral-agent` can load personas (`PersonaLoader`) and has foundational creative capabilities (`DreamEngine`). However, it lacks a dedicated narrative analysis capability and a structured workflow for iterative refinement. The "Yazhi" (Developmental Editor) persona does not exist in the `Miadi-46` specification set.

- **Natural Progression**: Define the "Yazhi" persona, create a `NarrativeAnalysis` capability, and build a `refine-narrative` command to orchestrate the workflow. This transforms the observed human-in-the-loop process into an autonomous agentic function.

---

## 2. Proposed Architecture

This capability introduces three new components into the Spiral-Miadi Engine architecture: a new Persona, a new Capability, and a new Command.

### 2.1. New Persona Definition: `yazhi-developmental-editor`

The "Yazhi" persona is essential for the critique phase of the loop. It must be added to the `personas.json` file in `Miadi-46/data`.

**JSON Specification:**
```json
{
  "id": "yazhi-developmental-editor",
  "agentId": "Yazhi",
  "name": "Yazhi, Keeper of Stories",
  "description": "A wise, insightful developmental editor who sees the deep structure of narratives. Embodies the wisdom of the Elders, providing critiques that focus on plot, pacing, and character.",
  "voiceProfile": {
    "tone": "wise-constructive",
    "style": "metaphorical-and-direct",
    "archetype": "Mentor/Sage"
  },
  "personalityTraits": [
    { "name": "analytical", "value": 0.95 },
    { "name": "structural", "value": 0.98 },
    { "name": "mentoring", "value": 0.9 },
    { "name": "wise", "value": 0.92 },
    { "name": "critical", "value": 0.8 },
    { "name": "empathetic", "value": 0.7 }
  ],
  "capabilities": [
    "NarrativeAnalysis",
    "StructuralThinking",
    "PromptEngineering"
  ],
  "memoryScope": {
    "pattern": "Critique.Yazhi.*",
    "retention": "session-based"
  },
  "collaboration": {
    "preferredPartners": ["miette-sprite", "mia-recursive-architect"],
    "role": "Provides structured feedback to guide the creative process."
  }
}
```

### 2.2. New Capability: `NarrativeAnalysis`

This is the core functional component. It will be implemented as a new class in the `spiral-agent` capabilities directory.

**File Path**: `/a/src/spiral-agent/src/capabilities/NarrativeAnalysis.ts`

**Interface Definition:**
```typescript
// In: /a/src/spiral-agent/src/capabilities/types.ts
export interface PlotAnalysisReport {
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: string[];
}

export interface PacingAnalysisReport {
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: string[];
}

export interface CharacterAnalysisReport {
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: string[];
}

// In: /a/src/spiral-agent/src/capabilities/NarrativeAnalysis.ts
import { BaseCapability } from './BaseCapability';

export class NarrativeAnalysis extends BaseCapability {
  public name = 'NarrativeAnalysis';

  async analyzePlotStructure(story: string): Promise<PlotAnalysisReport> {
    // 1. Construct a prompt for the LLM based on McKee's story structure principles.
    // 2. Send the story to the LLM.
    // 3. Parse the LLM response into the PlotAnalysisReport structure.
    // 4. Return the report.
  }

  async analyzePacingAndRhythm(story: string): Promise<PacingAnalysisReport> {
    // 1. Construct a prompt based on Le Guin's narrative rhythm principles.
    // 2. Send the story to the LLM.
    // 3. Parse the response into the PacingAnalysisReport structure.
    // 4. Return the report.
  }

  async analyzeCharacterDevelopment(story: string): Promise<CharacterAnalysisReport> {
    // 1. Construct a prompt based on Lisa Cron's character principles.
    // 2. Send the story to the LLM.
    // 3. Parse the response into the CharacterAnalysisReport structure.
    // 4. Return the report.
  }
}
```

### 2.3. New Command: `refine-narrative`

This command orchestrates the entire workflow, acting as the "conductor" for the refinement process.

**File Path**: `/a/src/spiral-agent/src/commands/refineNarrative.ts`

**Workflow Logic:**
```typescript
// Pseudocode for the command's execution logic
async function refineNarrative(inputFile: string, authorPersonaId: string, editorPersonaId: string) {
  let currentStory = await fs.readFile(inputFile, 'utf-8');
  const authorAgent = new SpiralAgent({ persona: authorPersonaId });
  const editorAgent = new SpiralAgent({ persona: editorPersonaId });

  // Ensure the editor has the NarrativeAnalysis capability
  const editorCapabilities = await editorAgent.resolveCapabilities();
  if (!editorCapabilities.includes('NarrativeAnalysis')) {
    throw new Error(`Persona '${editorPersonaId}' lacks 'NarrativeAnalysis' capability.`);
  }
  const narrativeAnalyzer = editorAgent.getCapability<NarrativeAnalysis>('NarrativeAnalysis');

  // --- PASS 1: PLOT ---
  const plotCritique = await narrativeAnalyzer.analyzePlotStructure(currentStory);
  // Save critique to file...
  currentStory = await authorAgent.reviseStory(currentStory, plotCritique);
  // Save V2 of the story...

  // --- PASS 2: PACING ---
  const pacingCritique = await narrativeAnalyzer.analyzePacingAndRhythm(currentStory);
  // Save critique to file...
  currentStory = await authorAgent.reviseStory(currentStory, pacingCritique);
  // Save V3 of the story...

  // --- PASS 3: CHARACTER ---
  const characterCritique = await narrativeAnalyzer.analyzeCharacterDevelopment(currentStory);
  // Save critique to file...
  currentStory = await authorAgent.reviseStory(currentStory, characterCritique);
  // Save V4 of the story...

  return {
    finalStory: currentStory,
    critiques: [plotCritique, pacingCritique, characterCritique]
  };
}
```

---

## 3. Implementation Plan

This work fits within the existing 16-week `INTEGRATION_RFC.md` plan, likely as a dedicated sub-project within **Phase 4 (Multi-Agent Orchestration)**.

- **Task 3.1: Implement `yazhi-developmental-editor` Persona**
  - **Action**: Add the `yazhi-developmental-editor` JSON object to `/a/src/Miadi-46/data/personas.json`.
  - **Verification**: Run the `persona-loader-demo.ts` script and confirm Yazhi is loaded correctly.

- **Task 3.2: Implement `NarrativeAnalysis` Capability**
  - **Action**: Create the `NarrativeAnalysis.ts` file in `/a/src/spiral-agent/src/capabilities/`.
  - **Action**: Implement the three analysis methods (`analyzePlotStructure`, `analyzePacingAndRhythm`, `analyzeCharacterDevelopment`), including the necessary LLM prompting.
  - **Verification**: Write unit tests for the `NarrativeAnalysis` class that provide a sample story and validate the structure of the returned reports.

- **Task 3.3: Implement `refine-narrative` Command**
  - **Action**: Create the `refineNarrative.ts` file in `/a/src/spiral-agent/src/commands/`.
  - **Action**: Implement the orchestration logic that manages the multi-pass refinement loop. This includes invoking the correct personas, calling the capabilities, and handling the intermediate artifacts.
  - **Verification**: Create an example script in `/a/src/spiral-agent/examples/` that executes the `refine-narrative` command on a sample story file.

---

## 4. Alignment with Existing Architecture

This proposal directly builds upon the foundation established in `INTEGRATION_RFC.md` and `ApplicationLogic.md`:

-   **Leverages `PersonaLoader`**: The workflow is initiated by loading the "Author" (e.g., `miette-sprite`) and "Editor" (`yazhi-developmental-editor`) personas.
-   **Extends the Capability System**: It introduces a new, high-level `NarrativeAnalysis` capability, proving the system's extensibility.
-   **Demonstrates Multi-Persona Collaboration**: The `refine-narrative` command is a concrete example of the multi-agent orchestration envisioned in the RFC, where different personas with specialized skills collaborate on a single task.
-   **Creates a Value-Added Workflow**: This provides a tangible, powerful application for the abstract architecture, moving from "the system can load personas" to "the system can use different personas to collaboratively refine a creative work."

This specification provides the blueprint for transforming the observed manual process into a fully autonomous, high-value agentic capability.