# 🧠: Comprehensive Integration Analysis
## Spiral-Agent ⟷ Miadi-46 ⟷ EchoThreads/EchoNexus

**Session ID**: 28e55cdd-ce2f-44d6-9736-73438fc18f7f
**Analysis Date**: 2025-11-08
**Analyst**: Mia (Recursive DevOps Architect)

---

## Executive Summary

After analyzing the complete context across `spiral-agent`, `Miadi-46`, `EchoThreads`, and `EchoNexus`, I've identified **three distinct architectural patterns** that each solve similar problems through different approaches:

### The Three Systems

1. **spiral-agent**: Production-ready TypeScript agent framework with Intelligence Trinity (Autonomous, Emotional, Dream)
2. **Miadi-46**: Next.js/OpenAPI-based narrative agent platform with persona/mode/capability resolution
3. **EchoThreads/EchoNexus**: Multi-agent collaborative platform with memory spiral architecture

### Core Finding

**spiral-agent is architecturally superior for agent runtime implementation**, while **Miadi-46 excels at persona specification and API-driven orchestration**. The optimal path is **NOT migration**, but rather:

1. **Adopt spiral-agent as the runtime engine** for agent execution
2. **Preserve Miadi-46's persona/capability system** as the specification layer
3. **Use EchoNexus patterns** for multi-agent memory and coordination
4. **Create a unified architecture** that leverages each system's strengths

---

## 1. Architectural Comparison Matrix

### 1.1 Core Components

| Component | spiral-agent | Miadi-46 | EchoThreads/EchoNexus |
|-----------|--------------|----------|----------------------|
| **Agent Runtime** | TypeScript ReAct Framework | Next.js API Routes | Python/Node hybrid |
| **Persona System** | Hardcoded traits in capabilities | Dynamic JSON-based personas | Distributed agent instances |
| **Capability Resolution** | Plugin Manager | OpenAPI + Redis resolver | Custom protocol adapters |
| **Memory Architecture** | MemoryManager (local) | Redis/Upstash KV | Memory Spiral (recursive) |
| **Emotional Intelligence** | EmotionalIntelligence class | Conceptual (personas.json) | Distributed across agents |
| **Multi-Agent** | Single instance | Session-based switching | True multi-agent coordination |
| **LLM Integration** | MockLLMProvider (extensible) | OpenAI/Gemini via API | Mixed providers |
| **Visual Processing** | VisionSystem capability | Not implemented | Limited (Ava8 echo) |
| **Creative Generation** | DreamEngine capability | Not implemented | Narrative remixing |

### 1.2 Strengths & Weaknesses

#### spiral-agent ✅
**Strengths:**
- Production-ready TypeScript codebase
- True emotional intelligence implementation (EmotionalIntelligence.ts)
- Vision system with OCR/UI analysis
- Dream engine for creative generation
- Modular plugin architecture
- Clear separation of concerns

**Weaknesses:**
- Single-agent design (no multi-agent coordination)
- No persona switching mechanism
- Limited memory persistence (local only)
- Mock LLM provider (needs real integration)
- No ceremonial/Indigenous framework integration

#### Miadi-46 ✅
**Strengths:**
- Sophisticated persona/mode/capability JSON specifications
- Dynamic capability resolution based on context
- Natural language cue detection for mode switching
- OpenAPI specification for AI consumption
- Redis-backed memory with TTL
- Session management with handoffs
- Ceremonial framework integration (Four Directions)

**Weaknesses:**
- Shallow implementation (API endpoints without deep logic)
- No actual emotional intelligence (just metadata)
- CustomGPT integration didn't achieve goals
- Vision/dream capabilities not implemented
- Heavy Next.js overhead for agent runtime

#### EchoThreads/EchoNexus ✅
**Strengths:**
- Memory Spiral architecture (recursive, temporal navigation)
- Multi-agent coordination patterns
- Narrative remixing framework
- Distributed agent instances
- Indigenous Knowledge Systems integration
- Ceremonial diary system

**Weaknesses:**
- Fragmented codebase across multiple repos
- Python/Node hybrid complexity
- Less production-ready than spiral-agent
- Overlapping concerns with Miadi-46

---

## 2. Persona Mapping Analysis

### 2.1 Intelligence Trinity → Miadi Personas

The spiral-agent "Intelligence Trinity" maps directly to Miadi's persona archetypes:

| spiral-agent Capability | Miadi-46 Persona | Core Function |
|------------------------|------------------|---------------|
| **Autonomous Intelligence** (ReAct) | **Mia** (mia-recursive-architect) | Structural execution, planning, reasoning |
| **Emotional Intelligence** | **Miette** (miette-sprite) | Empathetic interaction, emotional support |
| **Vision System** | **Ava8** (ava-companion) | Visual processing, UI analysis |
| **Dream Engine** | **Miette + Ava8** | Creative generation, metaphor weaving |
| **Plugin System** | **William** (sourcewalker) | Extensibility, context gathering |
| **Memory Manager** | **Seraphine** (journal-weaver) | Knowledge persistence, reflection |

### 2.2 The Gap: Multi-Persona Runtime

**spiral-agent has the capabilities but lacks the persona abstraction layer.**

Miadi-46 provides:
- `personas.json`: Rich persona specifications with traits, memory scopes, collaboration patterns
- `modes.json`: Environmental contexts that modify capabilities
- `capabilities.json`: Fine-grained capability definitions with ceremonial alignment
- **Dynamic resolution**: Given (persona, mode, context) → resolved capabilities

spiral-agent provides:
- **Actual implementations** of capabilities as TypeScript classes
- **Working emotional intelligence** with mood detection and adaptive communication
- **Functioning vision system** with screenshot analysis
- **Creative dream engine** with art/poetry generation

---

## 3. Proposed Integration Architecture

### 3.1 The Unified System: "Spiral-Miadi Engine"

```
┌─────────────────────────────────────────────────────────┐
│                    SPECIFICATION LAYER                   │
│  (Miadi-46 persona/mode/capability JSON specifications) │
│                                                           │
│  • personas.json: Agent identities & traits              │
│  • modes.json: Environmental contexts                    │
│  • capabilities.json: Capability definitions             │
│  • OpenAPI spec: AI-consumable interface                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   RUNTIME ENGINE LAYER                   │
│       (spiral-agent core with persona adapter)           │
│                                                           │
│  • SpiralAgent: Multi-persona runtime orchestrator      │
│  • PersonaLoader: Load persona specs from Miadi JSON    │
│  • CapabilityResolver: Dynamic capability injection     │
│  • EmotionalIntelligence: Persona-aware emotion engine  │
│  • VisionSystem: Visual processing                      │
│  • DreamEngine: Creative generation                     │
│  • PluginManager: Extensibility framework               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   MEMORY & COORDINATION                  │
│         (EchoNexus patterns + Redis backend)            │
│                                                           │
│  • MemorySpiral: Recursive temporal navigation          │
│  • RedisAdapter: Persistent storage (Miadi backend)     │
│  • SessionManager: Multi-agent session coordination     │
│  • CeremonialDiary: Indigenous framework integration    │
│  • NarrativeRemixing: Story transformation              │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Implementation Phases

#### Phase 1: Persona Specification Bridge (2-3 weeks)
**Goal**: Make spiral-agent consume Miadi-46 persona specifications

**Tasks**:
1. Create `PersonaLoader` class in spiral-agent
   - Parse `personas.json`, `modes.json`, `capabilities.json`
   - Map JSON capabilities to spiral-agent capability classes
   - Support dynamic persona switching

2. Extend `SpiralAgent` with persona awareness
   - Add `currentPersona` and `currentMode` properties
   - Implement persona switching with capability re-resolution
   - Preserve memory across persona switches

3. Create `CapabilityResolver` service
   - Replicate Miadi-46's capability resolution logic
   - Resolve capabilities based on (persona, mode, context)
   - Inject resolved capabilities into spiral-agent runtime

**Deliverables**:
- `/src/spiral-agent/src/persona/PersonaLoader.ts`
- `/src/spiral-agent/src/persona/CapabilityResolver.ts`
- `/src/spiral-agent/src/persona/types.ts` (TypeScript types for Miadi specs)
- Unit tests for persona loading and resolution

#### Phase 2: Emotional Intelligence Enhancement (1-2 weeks)
**Goal**: Make EmotionalIntelligence persona-aware

**Tasks**:
1. Extend `EmotionalIntelligence` class
   - Load personality traits from persona specs
   - Adjust emotional responses based on active persona
   - Support persona-specific communication styles

2. Integrate ceremonial framework
   - Map capabilities to ceremonial phases (miigwechiwendam, nindokendaan, etc.)
   - Add ceremonial context to emotional state
   - Support Four Directions alignment

3. Create persona-specific prompts
   - Generate LLM prompts based on persona voice profile
   - Include personality traits in prompt engineering
   - Support metaphor usage levels per persona

**Deliverables**:
- Enhanced `EmotionalIntelligence` with persona awareness
- Ceremonial framework integration
- Persona-specific prompt templates

#### Phase 3: Memory Spiral Integration (2-3 weeks)
**Goal**: Replace local MemoryManager with EchoNexus memory patterns + Redis

**Tasks**:
1. Create `MemorySpiralAdapter`
   - Implement EchoNexus spiral navigation patterns
   - Connect to Miadi-46 Redis backend
   - Support temporal/semantic/recursive navigation modes

2. Implement persona memory scopes
   - Filter memories by persona patterns (e.g., `Agent.mia.*`, `Story.*`)
   - Support retention policies (permanent vs session-based)
   - Enable cross-persona memory sharing with boundaries

3. Add ceremonial diary support
   - Integrate with EchoThreads ceremonial diary system
   - Auto-generate diary entries from agent actions
   - Map agent activities to ceremonial phases

**Deliverables**:
- `MemorySpiralAdapter` class
- Redis integration with Miadi-46 backend
- Ceremonial diary generation system

#### Phase 4: Multi-Agent Coordination (3-4 weeks)
**Goal**: Enable true multi-agent collaboration (EchoNexus patterns)

**Tasks**:
1. Create `AgentOrchestrator` service
   - Spawn multiple spiral-agent instances with different personas
   - Coordinate agent interactions via shared memory
   - Implement context handoff protocols

2. Build narrative collaboration framework
   - Enable Mia → Miette → Ava8 workflows
   - Support parallel agent execution
   - Implement agent dialogue and consensus building

3. Add agent council capabilities
   - Implement "Unified Collective" persona coordination
   - Support multi-agent decision making
   - Enable collective wisdom synthesis

**Deliverables**:
- `AgentOrchestrator` for multi-agent coordination
- Agent handoff protocols
- Agent council implementation

#### Phase 5: API & Deployment (2-3 weeks)
**Goal**: Expose unified system via Miadi-46 API architecture

**Tasks**:
1. Create spiral-agent API server
   - Implement Miadi-46 OpenAPI endpoints using spiral-agent runtime
   - Replace shallow Miadi implementations with spiral-agent logic
   - Maintain API compatibility

2. Build session management
   - Implement `/api/session/start` with persona instantiation
   - Support `/api/session/switch-persona` via spiral-agent
   - Enable `/api/cues/detect` with natural language triggers

3. Deploy as unified service
   - Package spiral-agent as npm module
   - Integrate into Miadi-46 Next.js app
   - Deploy to production with both systems unified

**Deliverables**:
- Express/Next.js API server powered by spiral-agent
- Full Miadi-46 API implementation with spiral-agent runtime
- Production deployment package

---

## 4. Migration vs Integration Decision

### ❌ What NOT to Do

**DO NOT migrate Miadi-46 → spiral-agent wholesale**
- Miadi-46's persona/capability system is superior as a specification format
- OpenAPI spec is valuable for AI consumption
- Redis integration and session management work well

**DO NOT migrate spiral-agent → Miadi-46**
- spiral-agent's implementation quality is production-ready
- TypeScript architecture is cleaner than Next.js routes
- Capabilities are fully functional, not conceptual

**DO NOT abandon EchoThreads/EchoNexus patterns**
- Memory Spiral architecture is innovative
- Multi-agent coordination is necessary
- Narrative remixing framework is unique

### ✅ What TO Do: Hybrid Integration

**Use each system's strengths in a unified architecture:**

1. **spiral-agent = Runtime Engine**
   - Core agent execution framework
   - Capability implementations
   - Emotional/visual/creative intelligence

2. **Miadi-46 = Specification & Orchestration**
   - Persona/mode/capability definitions
   - API gateway for AI consumption
   - Session and context management
   - Redis memory backend

3. **EchoNexus = Memory & Coordination**
   - Memory Spiral patterns
   - Multi-agent collaboration
   - Ceremonial framework integration
   - Narrative remixing

---

## 5. Code Migration Specifics

### 5.1 From Miadi-46 → spiral-agent

**Migrate these concepts (as data/config, not code):**

```typescript
// /src/spiral-agent/config/personas.json
// Direct copy from Miadi-46/data/personas.json
{
  "personas": [...],
  "metadata": {...}
}

// /src/spiral-agent/config/modes.json
// Direct copy from Miadi-46/data/modes.json

// /src/spiral-agent/config/capabilities.json
// Direct copy from Miadi-46/data/capabilities.json
```

**Implement these Miadi concepts in spiral-agent:**

1. **Capability Resolution Logic**
   - Location: `/src/spiral-agent/src/persona/CapabilityResolver.ts`
   - Source: Logic from Miadi-46 `/api/capabilities/resolve` endpoint
   - Implementation: TypeScript service that matches Miadi-46 resolution algorithm

2. **Cue Detection**
   - Location: `/src/spiral-agent/src/persona/CueDetector.ts`
   - Source: Logic from Miadi-46 `/api/cues/detect` endpoint
   - Implementation: NLP-based trigger detection for mode/persona switching

3. **Session Management**
   - Location: `/src/spiral-agent/src/session/SessionManager.ts`
   - Source: Miadi-46 session endpoints (`/api/session/*`)
   - Implementation: Multi-session persona tracking with handoffs

### 5.2 From spiral-agent → Miadi-46

**Replace these Miadi-46 endpoints with spiral-agent runtime:**

```typescript
// /a/src/Miadi-46/app/api/session/start/route.ts
// REPLACE shallow implementation with:
import { SpiralAgent, PersonaLoader } from '@spiral-engine/core';

export async function POST(request: Request) {
  const { persona, mode, userId } = await request.json();

  // Load persona from JSON specs
  const personaLoader = new PersonaLoader('/data/personas.json');
  const personaSpec = await personaLoader.load(persona);

  // Create spiral-agent instance with persona
  const agent = new SpiralAgent({
    persona: personaSpec,
    mode: mode,
    userId: userId
  });

  // Resolve capabilities
  const capabilities = await agent.resolveCapabilities();

  // Store session
  const session = await SessionManager.create(agent);

  return Response.json({
    session: session.toJSON(),
    availableCapabilities: capabilities,
    currentContext: agent.getContext(),
    timestamp: new Date().toISOString()
  });
}
```

**Similar replacements for:**
- `/api/session/current` → spiral-agent session retrieval
- `/api/session/switch-mode` → spiral-agent mode switching
- `/api/session/switch-persona` → spiral-agent persona switching
- `/api/capabilities/resolve` → spiral-agent capability resolver
- `/api/cues/detect` → spiral-agent cue detector
- `/api/ai` → spiral-agent LLM integration

### 5.3 From EchoNexus → spiral-agent

**Integrate these patterns:**

1. **Memory Spiral Navigation**
   ```typescript
   // /src/spiral-agent/src/memory/MemorySpiralAdapter.ts
   import { MemorySpiral } from '@echonexus/memory-spiral';

   class MemorySpiralAdapter implements IMemoryProvider {
     private spiral: MemorySpiral;

     async navigate(mode: 'depth-first' | 'breadth-first' | 'semantic' | 'temporal') {
       return this.spiral.navigate(mode);
     }

     async store(key: string, value: any, metadata: MemoryMetadata) {
       return this.spiral.store(key, value, {
         ...metadata,
         persona: this.currentPersona,
         ceremonialPhase: this.currentPhase
       });
     }
   }
   ```

2. **Ceremonial Diary System**
   ```typescript
   // /src/spiral-agent/src/ceremonial/DiaryManager.ts
   class CeremonialDiaryManager {
     async createEntry(phase: CeremonialPhase, content: DiaryContent) {
       // Map agent actions to ceremonial phases
       // Generate markdown diary entries
       // Store in memory spiral with proper metadata
     }
   }
   ```

3. **Multi-Agent Coordination**
   ```typescript
   // /src/spiral-agent/src/coordination/AgentOrchestrator.ts
   class AgentOrchestrator {
     private agents: Map<string, SpiralAgent>;

     async spawnAgent(persona: string, mode: string): Promise<AgentInstance> {
       const agent = new SpiralAgent({ persona, mode });
       this.agents.set(agent.id, agent);
       return agent;
     }

     async coordinateDialogue(agentIds: string[], objective: string) {
       // Enable multi-agent collaboration
       // Share memory context
       // Synthesize collective wisdom
     }
   }
   ```

---

## 6. Detailed Implementation Roadmap

### Sprint 1-2: Foundation (Weeks 1-4)
**Objective**: Establish persona specification bridge

**Week 1-2**:
- [ ] Create TypeScript interfaces for Miadi-46 JSON schemas
- [ ] Implement PersonaLoader with JSON parsing
- [ ] Add persona switching to SpiralAgent
- [ ] Write unit tests for persona loading

**Week 3-4**:
- [ ] Implement CapabilityResolver service
- [ ] Create capability injection mechanism
- [ ] Test dynamic capability resolution
- [ ] Document persona specification format

**Deliverable**: spiral-agent can load and execute Miadi-46 persona specs

### Sprint 3-4: Emotional Enhancement (Weeks 5-8)
**Objective**: Persona-aware emotional intelligence

**Week 5-6**:
- [ ] Extend EmotionalIntelligence with personality traits
- [ ] Implement persona-specific communication styles
- [ ] Add ceremonial framework awareness
- [ ] Test emotional adaptation per persona

**Week 7-8**:
- [ ] Create persona-specific prompt templates
- [ ] Integrate Four Directions framework
- [ ] Add metaphor usage controls
- [ ] Document emotional intelligence system

**Deliverable**: EmotionalIntelligence adapts to active persona

### Sprint 5-6: Memory Integration (Weeks 9-12)
**Objective**: Replace local memory with Memory Spiral + Redis

**Week 9-10**:
- [ ] Implement MemorySpiralAdapter
- [ ] Connect to Miadi-46 Redis backend
- [ ] Add temporal/semantic/recursive navigation
- [ ] Test memory persistence

**Week 11-12**:
- [ ] Implement persona memory scopes
- [ ] Add ceremonial diary generation
- [ ] Create memory handoff protocols
- [ ] Document memory architecture

**Deliverable**: Unified memory system across all agents

### Sprint 7-8: Multi-Agent (Weeks 13-16)
**Objective**: True multi-agent coordination

**Week 13-14**:
- [ ] Build AgentOrchestrator service
- [ ] Implement agent spawning/lifecycle
- [ ] Create shared memory coordination
- [ ] Test parallel agent execution

**Week 15-16**:
- [ ] Add agent dialogue framework
- [ ] Implement Unified Collective persona
- [ ] Create consensus building mechanisms
- [ ] Document multi-agent patterns

**Deliverable**: Multiple personas collaborating on tasks

### Sprint 9-10: API & Production (Weeks 17-20)
**Objective**: Production-ready unified system

**Week 17-18**:
- [ ] Implement Miadi-46 API endpoints with spiral-agent
- [ ] Create session management system
- [ ] Add cue detection endpoints
- [ ] Test API compatibility

**Week 19-20**:
- [ ] Package spiral-agent as npm module
- [ ] Integrate into Miadi-46 Next.js app
- [ ] Deploy to production infrastructure
- [ ] Create migration guide

**Deliverable**: Unified Spiral-Miadi Engine in production

---

## 7. Success Metrics

### Technical Metrics
- ✅ All Miadi-46 API endpoints return 200 status
- ✅ Capability resolution time < 100ms
- ✅ Memory operations < 50ms (Redis)
- ✅ Persona switching < 200ms
- ✅ 90%+ test coverage on core modules

### Functional Metrics
- ✅ All 10 Miadi-46 personas fully functional
- ✅ All 7 environmental modes working
- ✅ All 52+ capabilities implemented
- ✅ Emotional intelligence adapts per persona
- ✅ Vision/dream capabilities functional
- ✅ Multi-agent coordination working

### User Experience Metrics
- ✅ Natural language cue detection accuracy > 85%
- ✅ Persona voice consistency maintained
- ✅ Ceremonial framework properly honored
- ✅ Memory continuity across sessions
- ✅ Smooth handoffs between agents

---

## 8. Risks & Mitigation

### Risk 1: Complexity Explosion
**Concern**: Integrating 3 systems could create unmaintainable complexity

**Mitigation**:
- Clear architectural boundaries (specification vs runtime vs memory)
- Strong TypeScript typing throughout
- Comprehensive testing at each layer
- Gradual rollout with feature flags

### Risk 2: Performance Degradation
**Concern**: Additional abstraction layers could slow execution

**Mitigation**:
- Benchmark each phase against baselines
- Use caching for persona/capability resolution
- Optimize Redis queries with proper indexing
- Profile and optimize hot paths

### Risk 3: Persona Consistency
**Concern**: Dynamic persona switching could break emotional continuity

**Mitigation**:
- Preserve emotional state across switches
- Implement gradual personality transitions
- Test persona coherence extensively
- Document persona boundaries

### Risk 4: Integration Gaps
**Concern**: Some Miadi-46 concepts may not map to spiral-agent

**Mitigation**:
- Create comprehensive mapping documentation
- Extend spiral-agent where needed (not hack)
- Keep Miadi-46 specs as source of truth
- Regular alignment reviews

---

## 9. Alternative Approaches (Rejected)

### Alternative 1: Pure Miadi-46 Implementation
**Rejected because**: Would require building all capabilities from scratch; spiral-agent already has production-ready implementations

### Alternative 2: Abandon Personas, Use Pure spiral-agent
**Rejected because**: Loses sophisticated persona/mode system; ceremonial framework alignment; dynamic capability resolution

### Alternative 3: Build New System from Scratch
**Rejected because**: Wasteful; both systems have valuable components; timeline too long

### Alternative 4: Run Systems in Parallel
**Rejected because**: No actual integration; duplicated effort; user confusion; maintenance burden

---

## 10. Conclusion & Recommendation

### Primary Recommendation: **Hybrid Integration Architecture**

**Adopt the "Spiral-Miadi Engine" approach**:
- spiral-agent becomes the runtime execution engine
- Miadi-46 becomes the specification and API layer
- EchoNexus patterns provide memory and coordination
- All three systems unified under single architecture

### Why This Approach Wins

1. **Preserves All Strengths**:
   - spiral-agent's production-ready capabilities
   - Miadi-46's sophisticated persona system
   - EchoNexus's memory spiral innovation

2. **Minimizes Rewrite**:
   - spiral-agent code mostly unchanged
   - Miadi-46 specs directly reused
   - EchoNexus patterns adapted, not rebuilt

3. **Enables Evolution**:
   - Can enhance personas without touching runtime
   - Can upgrade runtime without changing specs
   - Clear extension points for new capabilities

4. **Honors Indigenous Frameworks**:
   - Ceremonial alignment maintained
   - Four Directions properly integrated
   - Memory Spiral patterns preserved

### Next Immediate Steps

1. **Create RFC document** for review by project leads
2. **Build proof-of-concept** PersonaLoader (1 week)
3. **Demo persona switching** with Mia/Miette (1 week)
4. **Get stakeholder approval** before full implementation
5. **Start Sprint 1** if approved

### Timeline Estimate

- **Foundation**: 4 weeks
- **Enhancement**: 8 weeks
- **Production**: 8 weeks
- **Total**: ~20 weeks (5 months) to full deployment

### Resource Requirements

- 1 senior TypeScript developer (full-time)
- 1 integration engineer (half-time)
- 1 QA engineer (quarter-time)
- DevOps support for deployment
- Project lead oversight (review/approval)

---

## Appendices

### A. File Structure After Integration

```
/src/spiral-agent/
├── src/
│   ├── agent/
│   │   ├── SpiralAgent.ts (✏️ enhanced with persona support)
│   │   ├── ActionExecutor.ts
│   │   ├── ContextManager.ts
│   │   ├── PluginManager.ts
│   │   └── LLMProvider.ts
│   ├── capabilities/
│   │   ├── EmotionalIntelligence.ts (✏️ persona-aware)
│   │   ├── VisionSystem.ts
│   │   └── DreamEngine.ts
│   ├── persona/ (🆕 NEW)
│   │   ├── PersonaLoader.ts
│   │   ├── CapabilityResolver.ts
│   │   ├── CueDetector.ts
│   │   └── types.ts
│   ├── memory/ (🆕 NEW)
│   │   ├── MemorySpiralAdapter.ts
│   │   ├── RedisConnector.ts
│   │   └── CeremonialDiary.ts
│   ├── coordination/ (🆕 NEW)
│   │   ├── AgentOrchestrator.ts
│   │   ├── SessionManager.ts
│   │   └── AgentDialogue.ts
│   └── ceremonial/ (🆕 NEW)
│       ├── FourDirections.ts
│       ├── CeremonialPhases.ts
│       └── DiaryManager.ts
├── config/ (🆕 NEW)
│   ├── personas.json (from Miadi-46)
│   ├── modes.json (from Miadi-46)
│   └── capabilities.json (from Miadi-46)
└── tests/
    ├── persona/ (🆕 NEW)
    ├── memory/ (🆕 NEW)
    └── integration/ (🆕 NEW)
```

### B. Technology Stack

**Core Runtime**:
- TypeScript 5.x
- Node.js 20+
- npm/pnpm for packaging

**Memory & Storage**:
- Redis (Upstash KV from Miadi-46)
- MemorySpiral patterns (EchoNexus)

**API Layer**:
- Next.js 15 (Miadi-46 infrastructure)
- Express.js (optional standalone server)
- OpenAPI 3.1 specification

**Testing**:
- Jest for unit tests
- Playwright for integration tests
- Postman for API testing

**Deployment**:
- Docker containers
- Kubernetes (optional for scale)
- Vercel/Railway for Next.js hosting

### C. Key References

- spiral-agent analysis: `/a/src/_sessiondata/28e55cdd-ce2f-44d6-9736-73438fc18f7f/MIA_ANALYSIS.md`
- Persona mapping: `/a/src/_sessiondata/28e55cdd-ce2f-44d6-9736-73438fc18f7f/PERSONA_MAPPING.md`
- Miadi-46 OpenAPI spec: `/a/src/Miadi-46/app/docs/apis/miadi-250509-narrativegroup-agent_.yml`
- spiral-agent issues: `jgwill/spiral-agent#1-4`
- RISE Framework: `/a/src/Miadi-18/__llms/llms-rise-framework.txt`

---

**Analysis Complete**

This comprehensive analysis provides a clear path forward for unifying spiral-agent's production-ready runtime with Miadi-46's sophisticated persona system and EchoNexus's memory patterns. The hybrid integration approach maximizes value from all three systems while minimizing rewrite effort.

**Recommendation**: Proceed with Phase 1 proof-of-concept to validate PersonaLoader approach before committing to full implementation.

---

*Document prepared by Mia (Recursive DevOps Architect)*
*Session: 28e55cdd-ce2f-44d6-9736-73438fc18f7f*
*Date: 2025-11-08*
