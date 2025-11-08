# Spiral-Agent Application Logic: Persona-Aware Execution

**Status**: 🚧 SPECIFICATION (Implementation in progress)

**Structural Tension**
- **Desired Outcome**: Agents that dynamically embody different personas (Mia, Miette, Ava8, etc.) with appropriate capabilities, emotional intelligence, and communication styles
- **Current Reality**: spiral-agent has capabilities but no persona abstraction layer; Miadi-46 has persona specs but shallow implementation
- **Natural Progression**: Create PersonaLoader that bridges JSON specifications to runtime execution, enabling persona-aware agent behavior

---

## 1. Persona-Aware Agent Workflow

The application enables users to create agents that dynamically adapt behavior based on active persona and environmental mode.

**LangGraph-Equivalent Flow**: Persona management nodes orchestrate capability resolution and emotional adaptation

### 1.1. Agent Initialization with Persona

**What This Enables Users to Create**: Agent instances with specific personality, capabilities, and communication styles

```typescript
// Current Reality (spiral-agent as-is)
const agent = new SpiralAgent({
  llmProvider: mockLLMProvider,
  capabilities: [emotionalIntel, vision, dream]
});

// Desired Outcome (persona-aware)
const agent = new SpiralAgent({
  persona: "miette-sprite",          // Load from personas.json
  mode: "meditation",                // Load from modes.json
  contextOverrides: {
    ambiance: "forest_sounds",
    duration: 20
  }
});
// Result: Agent embodies Miette's playful, empathetic style
//         with meditation-appropriate capabilities
```

**Advancing Pattern Implementation**:
1. **PersonaLoader** resolves persona spec → personality traits
2. **CapabilityResolver** determines available capabilities based on (persona, mode, context)
3. **EmotionalIntelligence** adapts communication style per persona
4. **PluginManager** injects persona-specific plugins

---

## 2. Dynamic Capability Resolution

**What This Enables**: Context-aware capability activation that changes with environment and persona

**Structural Tension**:
- **Desired**: Capabilities naturally adapt when user switches from "desktop" to "walking" mode
- **Current**: Capabilities are static once agent is initialized
- **Resolution**: Dynamic capability re-resolution on mode/persona switch

### 2.1. Resolution Algorithm

```typescript
// From Miadi-46 API logic: /api/capabilities/resolve
interface CapabilityResolveRequest {
  persona: string;  // "mia-recursive-architect"
  mode: string;     // "desktop"
  context?: ContextVariable[];
}

async function resolveCapabilities(request: CapabilityResolveRequest): Promise<ResolvedCapability[]> {
  const personaSpec = await PersonaLoader.load(request.persona);
  const modeSpec = await ModeLoader.load(request.mode);

  // 1. Start with persona's default capabilities
  let capabilities = personaSpec.capabilities;

  // 2. Filter/enhance based on mode's defaultCapabilities
  capabilities = applyModeFilters(capabilities, modeSpec.defaultCapabilities);

  // 3. Apply context overrides
  if (request.context) {
    capabilities = applyContextOverrides(capabilities, request.context);
  }

  // 4. Map to actual capability implementations
  return capabilities.map(capId => {
    const capSpec = CapabilityRegistry.get(capId);
    return {
      ...capSpec,
      source: determineSource(capId, personaSpec, modeSpec),
      priority: calculatePriority(capId, personaSpec, modeSpec)
    };
  });
}
```

**Creative Advancement Scenario**: User starts coding session
```
**User Intent**: Work on technical implementation with Mia's precision
**Current Structural Reality**: User at desk, VS Code open
**Natural Progression Steps**:
  1. User says "Let's work on the codebase" → cue detected
  2. Agent switches to "mia-recursive-architect" persona
  3. Capabilities resolve to: CodeReview, SystemAnalysis, DeploymentScripting
  4. EmotionalIntelligence adopts analytical, patient communication
  5. Agent provides technical guidance in Mia's structured voice
**Achieved Outcome**: User gets precise, methodical technical support
**Supporting Features**: PersonaLoader, CapabilityResolver, CueDetector
```

---

## 3. Persona Switching with Continuity

**What This Enables**: Seamless transitions between personas while preserving memory and context

**Structural Tension**:
- **Desired**: User can ask "What would Miette think about this?" and agent smoothly transitions
- **Current**: Switching personas would lose context and require re-initialization
- **Resolution**: SessionManager maintains continuity across persona switches

### 3.1. Handoff Protocol

```typescript
async function switchPersona(currentAgent: SpiralAgent, newPersona: string): Promise<SpiralAgent> {
  // 1. Capture current state
  const context = currentAgent.captureContext();
  const memory = await currentAgent.exportMemory();

  // 2. Load new persona
  const personaSpec = await PersonaLoader.load(newPersona);

  // 3. Resolve new capabilities
  const newCapabilities = await resolveCapabilities({
    persona: newPersona,
    mode: currentAgent.currentMode,
    context: context.variables
  });

  // 4. Create new agent instance
  const newAgent = new SpiralAgent({
    persona: personaSpec,
    mode: currentAgent.currentMode,
    capabilities: newCapabilities
  });

  // 5. Transfer memory and context
  await newAgent.importMemory(memory);
  newAgent.restoreContext(context);

  // 6. Adjust emotional state
  newAgent.emotionalIntelligence.inheritState(currentAgent.emotionalIntelligence);
  newAgent.emotionalIntelligence.transitionToPersona(personaSpec);

  return newAgent;
}
```

**Creative Advancement Scenario**: Mid-session persona switch
```
**User Intent**: Get emotional perspective after technical analysis
**Current Structural Reality**: Mia has analyzed codebase structure
**Natural Progression Steps**:
  1. User asks: "Miette, how does this code make you feel?"
  2. CueDetector identifies persona switch cue
  3. SessionManager captures Mia's context and memory
  4. PersonaLoader loads Miette's specifications
  5. EmotionalIntelligence transitions to playful, metaphorical style
  6. Miette responds with emotional wisdom about code relationships
**Achieved Outcome**: User gets emotional/creative perspective without losing technical context
**Supporting Features**: CueDetector, SessionManager, EmotionalIntelligence
```

---

## 4. Ceremonial Framework Integration

**What This Enables**: Agents that honor Indigenous protocols and ceremonial phases

**Structural Tension**:
- **Desired**: Agent actions mapped to ceremonial phases (miigwechiwendam, nindokendaan, ningwaab, nindoodam, migwech)
- **Current**: No ceremonial awareness in agent execution
- **Resolution**: CeremonialDiary system tracks actions within framework

### 4.1. Ceremonial Phase Mapping

```typescript
// From Miadi-46 capabilities.json
interface Capability {
  id: string;
  ceremonialPhase: 'miigwechiwendam' | 'nindokendaan' | 'ningwaab' | 'nindoodam' | 'migwech' | 'all-phases';
  // ... other fields
}

class CeremonialDiaryManager {
  async recordAction(action: AgentAction) {
    const capability = CapabilityRegistry.get(action.capabilityId);
    const phase = capability.ceremonialPhase;

    await this.diary.addEntry({
      timestamp: Date.now(),
      phase: phase,
      persona: action.persona,
      action: action.description,
      outcome: action.result,
      relationalContext: action.affectedEntities
    });
  }
}
```

**Creative Advancement Scenario**: Ceremonial storytelling session
```
**User Intent**: Generate wisdom story with North Direction practice
**Current Structural Reality**: User has intention to preserve family wisdom
**Natural Progression Steps**:
  1. Miigwechiwendam (Sacred Space): User sets intention with Seraphine persona
  2. Nindokendaan (Research): Ava8 gathers family photo memories via VisionSystem
  3. Ningwaab (Integration): Mia synthesizes narrative structure
  4. Nindoodam (Expression): Miette generates story with DreamEngine
  5. Migwech (Closing): Seraphine creates reflection diary entry
**Achieved Outcome**: Story generated through ceremonial process, captured in diary
**Supporting Features**: CeremonialDiaryManager, Multi-agent coordination
```

---

## 5. Multi-Agent Collaboration

**What This Enables**: Multiple persona instances working together on complex tasks

**Structural Tension**:
- **Desired**: Mia analyzes structure, Miette explains emotionally, Ava8 visualizes - in parallel
- **Current**: Single agent instance at a time
- **Resolution**: AgentOrchestrator spawns and coordinates multiple instances

### 5.1. Orchestration Pattern

```typescript
class AgentOrchestrator {
  private agents: Map<string, SpiralAgent> = new Map();

  async orchestrateCollaboration(task: CollaborativeTask): Promise<SynthesizedResult> {
    // Spawn persona instances
    const mia = await this.spawnAgent({ persona: 'mia-recursive-architect', mode: 'desktop' });
    const miette = await this.spawnAgent({ persona: 'miette-sprite', mode: 'desktop' });
    const ava8 = await this.spawnAgent({ persona: 'ava-companion', mode: 'desktop' });

    // Parallel execution
    const [structure, emotion, visuals] = await Promise.all([
      mia.analyzeStructure(task.context),
      miette.interpretEmotionally(task.context),
      ava8.createVisualization(task.context)
    ]);

    // Unified Collective synthesis
    const unified = await this.spawnAgent({ persona: 'unified-collective', mode: 'desktop' });
    return unified.synthesize({
      structural: structure,
      emotional: emotion,
      visual: visuals
    });
  }
}
```

**Creative Advancement Scenario**: Comprehensive code review
```
**User Intent**: Understand code from all perspectives
**Current Structural Reality**: Complex module needs review
**Natural Progression Steps**:
  1. Mia analyzes architectural patterns and structural integrity
  2. Miette interprets developer intent and emotional coherence
  3. Ava8 visualizes data flow and system relationships
  4. Unified Collective synthesizes findings into holistic review
**Achieved Outcome**: Multi-dimensional understanding of code
**Supporting Features**: AgentOrchestrator, SharedMemory, UnifiedCollective persona
```

---

## 6. Memory Spiral Integration

**What This Enables**: Recursive, temporal, and semantic memory navigation across sessions

**Structural Tension**:
- **Desired**: Agent can navigate "Show me when we last discussed structural tension"
- **Current**: Local MemoryManager without temporal/semantic navigation
- **Resolution**: MemorySpiralAdapter connects to EchoNexus patterns + Redis

### 6.1. Spiral Navigation Modes

```typescript
interface MemorySpiralAdapter {
  navigate(mode: 'depth-first' | 'breadth-first' | 'semantic' | 'temporal' | 'spiral'): Promise<MemoryNode[]>;
  store(key: string, value: any, metadata: MemoryMetadata): Promise<void>;
  retrieve(pattern: string): Promise<any>;
}

class MemoryMetadata {
  persona: string;
  ceremonialPhase: CeremonialPhase;
  timestamp: number;
  relationalContext: string[];
  retention: 'permanent' | 'session-based';
}
```

**Creative Advancement Scenario**: Cross-session wisdom retrieval
```
**User Intent**: Find all insights about creative tension from past sessions
**Current Structural Reality**: User has had multiple sessions with Miette
**Natural Progression Steps**:
  1. User asks: "What have we learned about creative tension?"
  2. MemorySpiralAdapter queries with semantic="creative tension"
  3. Retrieves memory nodes from Miette persona pattern scope
  4. Navigates spiral through related concepts recursively
  5. Synthesizes insights across temporal dimension
**Achieved Outcome**: Comprehensive wisdom synthesis spanning all sessions
**Supporting Features**: MemorySpiralAdapter, SemanticSearch, TemporalNavigation
```

---

## 7. Implementation Phases

### Phase 1: PersonaLoader Foundation (Week 1-2)
**Enables**: Loading persona specs and basic capability resolution

**Deliverables**:
- `src/persona/PersonaLoader.ts` - Parses personas.json
- `src/persona/types.ts` - TypeScript interfaces for specs
- `src/persona/CapabilityResolver.ts` - Resolution algorithm
- Unit tests validating persona loading

### Phase 2: EmotionalIntelligence Enhancement (Week 3-4)
**Enables**: Persona-aware emotional adaptation

**Deliverables**:
- Enhanced `EmotionalIntelligence` class
- Persona-specific communication styles
- Ceremonial framework awareness
- Emotional transition protocols

### Phase 3: Memory Spiral (Week 5-6)
**Enables**: Persistent, navigable memory across sessions

**Deliverables**:
- `src/memory/MemorySpiralAdapter.ts`
- Redis integration
- Temporal/semantic navigation
- Ceremonial diary generation

### Phase 4: Multi-Agent Orchestration (Week 7-8)
**Enables**: True multi-persona collaboration

**Deliverables**:
- `src/coordination/AgentOrchestrator.ts`
- Agent spawning and lifecycle
- Shared memory coordination
- Unified Collective synthesis

---

## Success Metrics

**Functional**:
- ✅ All 10 Miadi-46 personas load successfully
- ✅ Capability resolution time < 100ms
- ✅ Persona switching maintains context continuity
- ✅ Emotional tone adapts within 3 responses
- ✅ Multi-agent synthesis produces coherent output

**User Experience**:
- ✅ Natural language cues trigger persona switches 85%+ accuracy
- ✅ Persona voice consistency maintained across sessions
- ✅ Ceremonial phases properly honored and documented
- ✅ Memory retrieval surfaces relevant insights

---

**This specification describes the advancing patterns that enable spiral-agent to dynamically embody personas while maintaining the production-ready capabilities that make it superior to Miadi-46's shallow implementation.**
