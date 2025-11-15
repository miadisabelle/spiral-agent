# RFC: Spiral-Miadi Integration Architecture
## Persona-Aware Agent Runtime

**RFC Status**: 🚧 DRAFT - Awaiting Stakeholder Review
**Version**: 1.0
**Date**: 2025-11-08
**Author**: Mia (Recursive DevOps Architect)
**Session**: 28e55cdd-ce2f-44d6-9736-73438fc18f7f

---

## Abstract

This RFC proposes integrating spiral-agent's production-ready TypeScript runtime with Miadi-46's persona/mode/capability specification system and EchoNexus's memory patterns. The integration creates a unified "Spiral-Miadi Engine" that combines:

1. **spiral-agent**: Runtime execution engine with working capabilities
2. **Miadi-46**: Persona/mode/capability JSON specifications
3. **EchoNexus**: Memory Spiral patterns for multi-agent coordination

**Key Insight**: This is NOT a migration - it's a hybrid integration that preserves each system's strengths.

---

## Problem Statement

### Current Reality

**spiral-agent** (Production Strengths):
- ✅ Working EmotionalIntelligence with mood detection
- ✅ Functioning VisionSystem with OCR/UI analysis
- ✅ Creative DreamEngine for art/poetry generation
- ✅ Clean TypeScript architecture
- ❌ No persona abstraction layer
- ❌ Single-agent design
- ❌ Local-only memory
- ❌ Mock LLM provider

**Miadi-46** (Specification Strengths):
- ✅ Sophisticated persona/mode/capability JSON specs
- ✅ 10 personas with personality traits, memory scopes, voice profiles
- ✅ 7 environmental modes with context variables
- ✅ 52+ capabilities with ceremonial alignment
- ✅ OpenAPI spec for AI consumption
- ✅ Redis memory backend
- ❌ Shallow implementation (API endpoints without logic)
- ❌ No actual emotional intelligence
- ❌ Vision/dream capabilities not implemented
- ❌ CustomGPT integration didn't achieve goals

**EchoNexus** (Memory & Coordination):
- ✅ Memory Spiral architecture (recursive/temporal navigation)
- ✅ Multi-agent coordination patterns
- ✅ Ceremonial diary system
- ✅ Indigenous Knowledge Systems integration
- ❌ Fragmented codebase
- ❌ Less production-ready than spiral-agent
- ❌ Python/Node hybrid complexity

### Desired Outcome

A unified agent system where:
- Personas defined in JSON specs execute via spiral-agent capabilities
- Emotional intelligence adapts to active persona's personality traits
- Memory persists across sessions via Memory Spiral + Redis
- Multiple personas can collaborate on complex tasks
- All interactions honor ceremonial framework protocols
- Natural language cues trigger smooth persona transitions

---

## Proposed Solution

### Architecture: Three-Layer Integration

```
┌─────────────────────────────────────────────────────────┐
│              SPECIFICATION LAYER                         │
│        (Miadi-46 JSON Specifications)                   │
│                                                           │
│  personas.json | modes.json | capabilities.json         │
│  OpenAPI spec for AI consumption                        │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│               RUNTIME ENGINE LAYER                       │
│         (spiral-agent with Persona Bridge)              │
│                                                           │
│  PersonaLoader → SpiralAgent → EmotionalIntelligence    │
│  CapabilityResolver → VisionSystem → DreamEngine        │
│  CueDetector → PluginManager → SessionManager           │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│          MEMORY & COORDINATION LAYER                     │
│    (EchoNexus Patterns + Redis Backend)                │
│                                                           │
│  MemorySpiral → RedisAdapter → CeremonialDiary          │
│  AgentOrchestrator → NarrativeRemixing                  │
└─────────────────────────────────────────────────────────┘
```

### Implementation Proof-of-Concept

**Already Built** (in `/src/spiral-agent/src/persona/`):

1. **types.ts**: TypeScript interfaces for Miadi-46 JSON schemas
2. **PersonaLoader.ts**: Loads persona specs from JSON
3. **persona-loader-demo.ts**: Executable demonstration

**Example Usage**:
```typescript
import { PersonaLoader } from './src/persona/PersonaLoader';

const loader = new PersonaLoader('/a/src/Miadi-46/data');
await loader.initialize();

// Load Miette persona
const miette = await loader.load('miette-sprite');
console.log(miette.voiceProfile.tone); // "warm-reflective"
console.log(miette.capabilities); // ["CreativeWriting", "UserEngagement", ...]

// Extract personality traits
const traits = loader.getPersonalityTraitsMap(miette);
console.log(traits.playful); // 0.9
console.log(traits.empathetic); // 0.85
```

**Proof**: Run `npx ts-node examples/persona-loader-demo.ts` to see it working.

---

## Implementation Plan

### Phase 1: Persona-Aware Runtime (4 weeks)

**Week 1-2: PersonaLoader Enhancement**
- [x] Create TypeScript interfaces (DONE)
- [x] Implement PersonaLoader class (DONE)
- [x] Build working demo (DONE)
- [ ] Add ModeLoader for modes.json
- [ ] Add CapabilityRegistry for capabilities.json
- [ ] Write comprehensive unit tests

**Week 3-4: SpiralAgent Integration**
- [ ] Extend `SpiralAgent` constructor to accept persona ID
- [ ] Implement dynamic capability injection based on persona
- [ ] Add `currentPersona` and `currentMode` properties
- [ ] Create persona switching method

**Deliverable**: spiral-agent can instantiate with any Miadi-46 persona

### Phase 2: Emotional Intelligence Adaptation (2 weeks)

**Week 5: Personality Trait Integration**
- [ ] Extend `EmotionalIntelligence` to accept PersonalityTraits
- [ ] Adjust base emotional state based on traits
- [ ] Adapt communication style per voice profile
- [ ] Test emotional consistency across personas

**Week 6: Ceremonial Framework**
- [ ] Map capabilities to ceremonial phases
- [ ] Add ceremonial context to emotional responses
- [ ] Implement Four Directions awareness
- [ ] Create ceremonial diary entries for agent actions

**Deliverable**: EmotionalIntelligence adapts to active persona

### Phase 3: Memory Spiral Integration (3 weeks)

**Week 7-8: MemorySpiralAdapter**
- [ ] Create adapter interface
- [ ] Connect to Miadi-46 Redis backend
- [ ] Implement temporal navigation
- [ ] Implement semantic search
- [ ] Implement spiral (recursive) navigation

**Week 9: Persona Memory Scopes**
- [ ] Filter memories by persona patterns
- [ ] Implement retention policies
- [ ] Enable cross-persona memory sharing
- [ ] Test memory continuity across sessions

**Deliverable**: Persistent memory with spiral navigation

### Phase 4: Multi-Agent Orchestration (4 weeks)

**Week 10-11: AgentOrchestrator**
- [ ] Build orchestrator service
- [ ] Implement agent spawning/lifecycle
- [ ] Create shared memory coordination
- [ ] Test parallel execution

**Week 12-13: Collaborative Workflows**
- [ ] Implement Mia → Miette → Ava8 handoffs
- [ ] Add UnifiedCollective synthesis
- [ ] Create agent dialogue framework
- [ ] Test consensus building

**Deliverable**: Multiple personas collaborating on tasks

### Phase 5: Production Deployment (3 weeks)

**Week 14-15: API Integration**
- [ ] Implement Miadi-46 API endpoints using spiral-agent
- [ ] Create session management system
- [ ] Add cue detection endpoints
- [ ] Test API compatibility

**Week 16: Deployment**
- [ ] Package spiral-agent as npm module
- [ ] Integrate into Miadi-46 Next.js app
- [ ] Deploy to production
- [ ] Create migration documentation

**Deliverable**: Unified Spiral-Miadi Engine in production

---

## Detailed Specifications

### Specification Documents

All detailed specifications are in `/src/spiral-agent/rispecs/`:

1. **ApplicationLogic.md**: Workflow and advancing patterns
   - Persona-aware agent initialization
   - Dynamic capability resolution
   - Persona switching with continuity
   - Ceremonial framework integration
   - Multi-agent collaboration
   - Memory spiral navigation

2. **Prompts.md**: (To be created)
   - Persona-specific prompt templates
   - Ceremonial phase prompts
   - Emotional adaptation prompts

3. **DataSchemas.md**: (To be created)
   - Persona JSON schema validation
   - Mode specification format
   - Capability definition structure

4. **Implementation.md**: (To be created)
   - Code examples
   - API documentation
   - Testing strategies

### Code Locations

```
/src/spiral-agent/
├── src/
│   ├── persona/                    [NEW - Phase 1]
│   │   ├── PersonaLoader.ts        ✅ COMPLETE
│   │   ├── ModeLoader.ts           🚧 TODO
│   │   ├── CapabilityResolver.ts   🚧 TODO
│   │   ├── CueDetector.ts          🚧 TODO
│   │   └── types.ts                ✅ COMPLETE
│   ├── capabilities/
│   │   ├── EmotionalIntelligence.ts [ENHANCE - Phase 2]
│   │   ├── VisionSystem.ts
│   │   └── DreamEngine.ts
│   ├── memory/                     [NEW - Phase 3]
│   │   ├── MemorySpiralAdapter.ts
│   │   └── RedisConnector.ts
│   ├── coordination/               [NEW - Phase 4]
│   │   ├── AgentOrchestrator.ts
│   │   └── SessionManager.ts
│   └── ceremonial/                 [NEW - Phase 2]
│       ├── CeremonialDiary.ts
│       └── FourDirections.ts
├── examples/
│   └── persona-loader-demo.ts      ✅ COMPLETE
└── rispecs/                        [NEW]
    ├── ApplicationLogic.md         ✅ COMPLETE
    ├── INTEGRATION_RFC.md          ✅ THIS DOCUMENT
    ├── Prompts.md                  🚧 TODO
    ├── DataSchemas.md              🚧 TODO
    └── Implementation.md           🚧 TODO
```

---

## Success Criteria

### Technical Metrics
- ✅ All 10 Miadi-46 personas load successfully
- ✅ Capability resolution time < 100ms
- ✅ Persona switching < 200ms
- ✅ Memory operations < 50ms (Redis)
- ✅ 90%+ test coverage on core modules

### Functional Metrics
- ✅ All 52+ capabilities mapped to implementations
- ✅ Emotional intelligence adapts per persona
- ✅ Vision/dream capabilities functional
- ✅ Multi-agent coordination working
- ✅ Ceremonial diary auto-generation

### User Experience Metrics
- ✅ Natural language cue detection > 85% accuracy
- ✅ Persona voice consistency maintained
- ✅ Memory continuity across sessions
- ✅ Smooth handoffs between personas

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Complexity explosion | High | Clear architectural boundaries, strong typing |
| Performance degradation | Medium | Benchmark each phase, optimize hot paths |
| Persona inconsistency | Medium | Comprehensive personality testing |
| Integration gaps | Low | Keep Miadi specs as source of truth |

---

## Alternatives Considered

### ❌ Option 1: Migrate Miadi-46 → spiral-agent wholesale
**Rejected**: Loses sophisticated persona system, OpenAPI spec, Redis integration

### ❌ Option 2: Migrate spiral-agent → Miadi-46
**Rejected**: Loses production-ready implementations, TypeScript architecture

### ❌ Option 3: Build from scratch
**Rejected**: Wasteful, both systems have valuable components

### ✅ Option 4: Hybrid Integration (THIS RFC)
**Selected**: Preserves all strengths, minimizes rewrite

---

## Dependencies

### External
- Miadi-46 data/ folder accessible at `/a/src/Miadi-46/data`
- Redis instance (Upstash KV from Miadi-46)
- TypeScript 5.x, Node.js 20+
- EchoNexus memory patterns

### Internal
- spiral-agent core (SpiralAgent, capabilities, plugins)
- Miadi-46 JSON specifications (personas, modes, capabilities)
- EchoNexus Memory Spiral patterns

---

## Timeline

**Total**: 16 weeks (~4 months) to production deployment

- **Phase 1**: Weeks 1-4 (Persona-aware runtime)
- **Phase 2**: Weeks 5-6 (Emotional adaptation)
- **Phase 3**: Weeks 7-9 (Memory integration)
- **Phase 4**: Weeks 10-13 (Multi-agent)
- **Phase 5**: Weeks 14-16 (Production)

---

## Resources Required

- 1 senior TypeScript developer (full-time)
- 1 integration engineer (half-time)
- 1 QA engineer (quarter-time)
- DevOps support for deployment
- Project lead oversight (review/approval)

---

## Next Steps

### Immediate Actions (This Week)

1. **Review this RFC** with stakeholders
2. **Run PersonaLoader demo** to validate proof-of-concept
3. **Get approval** for Phase 1 implementation
4. **Create GitHub issues** for Phase 1 tasks

### Week 1 Tasks (If Approved)

1. Implement ModeLoader class
2. Create CapabilityRegistry
3. Write unit tests for PersonaLoader
4. Start CapabilityResolver implementation

---

## Appendices

### A. Demo Instructions

**Run the PersonaLoader proof-of-concept**:

```bash
cd /src/spiral-agent
npm install
npx ts-node examples/persona-loader-demo.ts
```

Expected output shows:
- All 10 personas loaded from Miadi-46
- Specific persona details (Miette, Mia, Ava)
- Personality trait extraction
- Capability queries
- Memory scope patterns

### B. RISE Framework Application

This integration follows RISE Framework principles:

**R**everse-engineer: spiral-agent capabilities extracted
**I**ntent-extract: Miadi-46 persona specifications analyzed
**S**pecify: ApplicationLogic.md with advancing patterns
**E**xport: This RFC as executable plan + working code

See `/src/spiral-agent/rispecs/ApplicationLogic.md` for detailed RISE analysis.

### C. References

- Previous analysis: `/a/src/_sessiondata/28e55cdd-ce2f-44d6-9736-73438fc18f7f/MIA_ANALYSIS.md`
- Persona mapping: `/a/src/_sessiondata/28e55cdd-ce2f-44d6-9736-73438fc18f7f/PERSONA_MAPPING.md`
- Miadi-46 OpenAPI: `/a/src/Miadi-46/app/docs/apis/miadi-250509-narrativegroup-agent_.yml`
- RISE Framework: `/a/src/Miadi-18/__llms/llms-rise-framework.txt`
- WillWrite RISPECs: `/src/storytelling/rispecs/ApplicationLogic.md`
- AetherialProject capabilities: `/a/src/AetherialProject/AETHERIAL_CAPABILITIES.md`

---

**RFC Prepared by**: Mia (Recursive DevOps Architect)
**Date**: 2025-11-08
**Status**: Awaiting Stakeholder Review

**Approval Required From**:
- [ ] Technical Lead
- [ ] Product Owner
- [ ] Architecture Review Board

**Feedback Deadline**: 2025-11-15

---

*This RFC represents the synthesis of spiral-agent's runtime capabilities, Miadi-46's persona specifications, and EchoNexus's memory patterns into a unified, production-ready agent platform that honors ceremonial frameworks while providing sophisticated multi-persona collaboration.*
