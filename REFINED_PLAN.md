# 🌀 Spiral Agent Integration Plan - Persona Review Edition

**Status**: Ready for persona review
**Date**: 2025-11-08
**Current Branch**: `claude/plan-github-issues-011CUufQEPNd53SqeiwRqx4a`

---

## 🎯 Executive Summary

The spiral-agent codebase is **structurally complete** with all core components in place. The integration plan focuses on:

1. **Decoupling** the core engine for reusability
2. **Activating** persona-specific capabilities with real implementations
3. **Hardening** with tests, CI, and security measures
4. **Packaging** for ecosystem-wide adoption

---

## 📊 Current State Assessment

### ✅ What Exists (Codebase Inventory)

**Core Engine** (`src/agent/`)
- ✅ `SpiralAgent.ts` - Main autonomous agent with ReAct loop
- ✅ `ActionExecutor.ts` - Action execution engine
- ✅ `ContextManager.ts` - Context management
- ✅ `MemoryManager.ts` - SQLite-based memory system
- ✅ `PluginManager.ts` - Plugin architecture
- ✅ `LLMProvider.ts` - Mock LLM (needs real integration)

**Capabilities** (`src/capabilities/`)
- ✅ `EmotionalIntelligence.ts` - Miette's domain (mock)
- ✅ `VisionSystem.ts` - Ava8's domain (mock)
- ✅ `DreamEngine.ts` - Shared Ava8/Miette creative engine (mock)

**Infrastructure**
- ✅ `src/index.ts` - CLI entry point
- ✅ `package.json` - Build/test scripts present
- ✅ `tsconfig.json` - TypeScript configured
- ✅ Plugin system with hot-loading

### ⚠️ What Needs Work

- ❌ No `src/index.ts` re-exports for library usage
- ❌ Mock providers not replaceable via env variables
- ❌ No unit tests for core components
- ❌ No CI/CD pipeline
- ❌ No production API integrations
- ❌ No security sandboxing
- ❌ No empathy/vision asset examples

---

## 🎭 Persona Integration Roadmap

### 🧠 Mia - Recursive DevOps Architect

**Core Responsibility**: Autonomous Intelligence, Plugin System, Structural Integrity

#### Integration Points
1. **Autonomous ReAct Core** (`SpiralAgent`, `ActionExecutor`, `ContextManager`)
   - Already implemented ✅
   - Needs: Unit tests, library exports, LLM env switching

2. **Plugin Architecture** (`PluginManager`)
   - Already implemented ✅
   - Needs: Example architectural pattern plugin, documentation

3. **Linguistic Precision**
   - New: Code quality utilities, architecture validation

#### Mia's Tasks (from `.mia/INTEGRATION_TASKS.md`)

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Create `src/index.ts` re-exports | P0 | 🔴 TODO | Export: SpiralAgent, ActionExecutor, ContextManager, MemoryManager, PluginManager |
| Make `LLMProvider` env-configurable | P0 | 🔴 TODO | Keep MockLLMProvider as default, add OpenAI/Anthropic/Gemini |
| Add unit tests (ActionExecutor, ContextManager) | P1 | 🔴 TODO | Happy path + error handling |
| Add `plugins/architecture-plugin.ts` skeleton | P2 | 🔴 TODO | Demo plugin API with architectural pattern enforcement |
| Update `package.json` main/exports fields | P0 | 🔴 TODO | Enable library consumption |

**Acceptance Criteria**:
- [ ] Core components importable as `import { SpiralAgent } from 'spiral-agent'`
- [ ] LLM provider switchable via `SPIRAL_LLM_PROVIDER=openai` env var
- [ ] 80%+ test coverage on ActionExecutor and ContextManager
- [ ] Working architecture plugin example with README

---

### 🌸 Miette - Emotional Explainer Sprite

**Core Responsibility**: Emotional Intelligence, Empathetic Communication, Narrative Resonance

#### Integration Points
1. **Emotional Intelligence** (`EmotionalIntelligence` capability)
   - Already scaffolded ✅
   - Needs: Real sentiment analysis, adaptive prompts, empathy profiles

2. **Dream Engine (Narrative)** (`DreamEngine` capability)
   - Already scaffolded ✅
   - Needs: Prompt templates, storytelling modes, creative formatting

#### Miette's Tasks (from `.miette/INTEGRATION_TASKS.md`)

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Add empathy prompt templates | P1 | 🔴 TODO | Create `docs/prompts/empathy/` with low/medium/high empathy variants |
| Add tone adaptation unit tests | P1 | 🔴 TODO | Assert responses adapt to frustration, excitement, confusion |
| Wire EmotionalIntelligence to CLI | P2 | 🔴 TODO | Optional middleware in interactive mode (`--empathy` flag?) |
| Create `empathy_profiles.json` config | P2 | 🔴 TODO | Define low/medium/high empathy settings with examples |
| Add developer stress detection | P3 | 🔴 TODO | Analyze error patterns, retry counts, session duration |

**Acceptance Criteria**:
- [ ] EmotionalIntelligence detects user sentiment from input text
- [ ] Responses adapt tone based on detected emotion (measurable via test assertions)
- [ ] Interactive CLI offers empathetic responses (demo-able)
- [ ] 3+ empathy profiles documented with use cases
- [ ] No API keys committed (use env variables only)

**Creative Expressions** (from `.miette/miette_spiral_agent_specs.md`):
- Narrative documentation generation
- Metaphorical technical explanations
- Inspirational feedback messages
- Emotional contextualization of errors

---

### 🎨 Ava8 - Visual Echo Agent

**Core Responsibility**: Vision System, Visual Translation, Creative Multi-Modal Expression

#### Integration Points
1. **Vision System** (`VisionSystem` capability)
   - Already scaffolded ✅
   - Needs: Real OCR/object detection, screenshot analysis, test assets

2. **Dream Engine (Visual)** (`DreamEngine` capability)
   - Already scaffolded ✅
   - Needs: ASCII art, diagram generation, visual metaphor templates

#### Ava8's Tasks (from `.ava/INTEGRATION_TASKS.md`)

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Add vision sample images | P1 | 🔴 TODO | Create `docs/assets/vision-samples/` with UI screenshots, diagrams, code images |
| Create vision test harness | P1 | 🔴 TODO | Test suite that runs `VisionSystem.analyze()` on sample images |
| Build HTML annotator adapter | P2 | 🔴 TODO | `vision-adapter/html-annotator.ts` - converts vision output to annotated HTML |
| Add `spiral vision analyze` CLI tests | P2 | 🔴 TODO | Integration tests (dry-run mode for CI) |
| Document VisionSystem API usage | P2 | 🔴 TODO | `docs/guides/vision.md` - rate limits, API keys, capabilities |

**Acceptance Criteria**:
- [ ] VisionSystem.analyze() works with real image files
- [ ] 5+ sample images with expected analysis outputs
- [ ] HTML annotator produces visual overlays (e.g., bounding boxes)
- [ ] CLI command `spiral vision analyze path/to/image.png` functional
- [ ] Vision guide documents API key setup and usage limits

**Creative Expressions** (from `.ava/ava_spiral_agent_specs.md`):
- Visual echo translation (concepts → color/form/music)
- Synesthetic development (sound-to-color, recursion-to-shape)
- Glyph symphony coordination
- Threshold crossing visualizations

---

## 📋 Epic Breakdown

### Epic 1: 🏗️ Decouple Core Engine

**Goal**: Make spiral-agent consumable as a library package

**Issues** (from ISSUES_PLAN.md):
1. ✅ Create `src/index.ts` re-exports (Mia P0)
2. ✅ Update `package.json` entry points (Mia P0)
3. ✅ Add `LLMProvider` env switch (Mia P0)
4. ✅ Keep `MockLLMProvider` as default (Mia P0)
5. ✅ Add `--dry-run` CLI safety flag
6. ✅ Add unit tests for `ActionExecutor` (Mia P1)
7. ✅ Add unit tests for `ContextManager` (Mia P1)

**Acceptance**:
- Builds pass
- Tests cover happy path + error handling
- Can `npm install spiral-agent` and import components
- LLM provider switchable via env

---

### Epic 2: 🎭 Persona Integrations

**Goal**: Activate and test persona-specific capabilities

#### 2.1 Miette Workstream
1. ✅ Add empathy prompt templates (Miette P1)
2. ✅ Add tone adaptation tests (Miette P1)
3. ✅ Wire EmotionalIntelligence middleware (Miette P2)
4. ✅ Create `empathy_profiles.json` (Miette P2)

#### 2.2 Mia Workstream
1. ✅ Add plugin API documentation
2. ✅ Create `plugins/architecture-plugin.ts` example (Mia P2)
3. ✅ Create deployment orchestrator plugin skeleton

#### 2.3 Ava8 Workstream
1. ✅ Add vision sample assets (Ava8 P1)
2. ✅ Create vision analyzer test harness (Ava8 P1)
3. ✅ Build HTML annotator adapter (Ava8 P2)
4. ✅ Add `spiral vision analyze` CLI tests (Ava8 P2)

**Acceptance**:
- Each persona's core capability has working examples
- Tests demonstrate persona-specific behaviors
- Documentation shows how to use each capability

---

### Epic 3: 🧪 CI, Tests & Packaging

**Goal**: Production-ready build, test, and publish pipeline

**Issues**:
1. ✅ Add `npm run build` script (already exists ✅)
2. ✅ Add `npm run test` script (exists but needs real tests)
3. ✅ Add basic CI workflow (build + test + lint)
4. ✅ Create publishing plan for internal npm package (private registry)

**Acceptance**:
- CI runs on every push
- All tests pass
- Linting enforced
- Package publishable to private npm registry

---

### Epic 4: 🔒 Safety & Security

**Goal**: Production-safe execution and secrets handling

**Issues**:
1. ✅ Sandbox shell execution
2. ✅ Add confirmations for destructive actions
3. ✅ Document API key and secrets handling
4. ✅ Add audit logging for external actions

**Acceptance**:
- Shell commands run in restricted sandbox
- Destructive operations require confirmation
- Security guide published
- All actions logged to audit trail

---

## 🗓️ Sprint Plan (3 Sprints × 2 weeks)

### Sprint 1: Foundation (Weeks 1-2)
**Theme**: Core decoupling and smoke verification

**Deliverables**:
- [ ] `src/index.ts` re-exports functional
- [ ] Unit tests for ActionExecutor and ContextManager (80% coverage)
- [ ] `npm run build` and `npm run test` working
- [ ] LLM provider env switch implemented
- [ ] Basic CI workflow (build + test)

**Assigned**:
- Mia: Core exports, tests, LLM switching
- Team: Build/test infrastructure

---

### Sprint 2: Personas Awaken (Weeks 3-4)
**Theme**: Activate persona capabilities with real examples

**Deliverables**:
- [ ] Empathy prompt templates and profiles (Miette)
- [ ] Tone adaptation tests passing (Miette)
- [ ] Vision sample assets and test harness (Ava8)
- [ ] Architecture plugin example (Mia)
- [ ] EmotionalIntelligence CLI middleware (Miette)

**Assigned**:
- Miette: Empathy system implementation
- Ava8: Vision system activation
- Mia: Plugin examples

---

### Sprint 3: Hardening (Weeks 5-6)
**Theme**: Security, packaging, and documentation

**Deliverables**:
- [ ] Shell sandboxing implemented
- [ ] Audit logging active
- [ ] API key handling documented
- [ ] HTML annotator (Ava8)
- [ ] Vision CLI tests (Ava8)
- [ ] Package ready for private npm publish
- [ ] All docs updated with examples

**Assigned**:
- Team: Security hardening
- Ava8: Vision finalization
- Mia: Packaging and publish plan

---

## 🎬 Next Actions

### Immediate (This Session)
1. **Review this plan** with Mia, Miette, and Ava8
2. **Validate priorities** - are P0/P1/P2 labels correct?
3. **Identify blockers** - any missing context or dependencies?
4. **Assign sprint 1 tasks** - who does what first?

### After Approval
1. **Create feature branches** for each epic
2. **Start Sprint 1** - focus on Mia's P0 tasks
3. **Set up CI skeleton** (even if tests are minimal)
4. **Begin persona documentation** in parallel

---

## 🤔 Open Questions for Persona Review

### For Mia 🧠
- What architectural patterns should the example plugin enforce? (Hexagonal, microservices, clean architecture?)
- Should we support multiple LLM providers simultaneously, or one at a time?
- What's the ideal structure for plugin configuration?

### For Miette 🌸
- What sentiment analysis approach? (Rule-based, API-based, local ML?)
- Should empathy be always-on or opt-in via flag?
- How do we measure "empathy quality" in tests?

### For Ava8 🎨
- What vision APIs to prioritize? (OpenAI Vision, Google Cloud Vision, local OCR?)
- What types of visual samples best demonstrate capabilities? (UI bugs, architecture diagrams, code screenshots?)
- Should visual outputs include musical/synesthetic elements, or keep that as future enhancement?

---

## 📚 Reference Documents

### Persona Specs
- `.mia/mia_spiral_agent_specs.md` - Mia's integration vision
- `.miette/miette_spiral_agent_specs.md` - Miette's integration vision
- `.ava/ava_spiral_agent_specs.md` - Ava8's integration vision

### Task Lists
- `.mia/INTEGRATION_TASKS.md` - Mia's immediate tasks
- `.miette/INTEGRATION_TASKS.md` - Miette's immediate tasks
- `.ava/INTEGRATION_TASKS.md` - Ava8's immediate tasks

### Analysis
- `.william/28e55cdd-ce2f-44d6-9736-73438fc18f7f.spiral-agent-integration-analysis/MIA_ANALYSIS.md`
- `.william/28e55cdd-ce2f-44d6-9736-73438fc18f7f.spiral-agent-integration-analysis/MIETTE_REFLECTION.md`
- `.william/28e55cdd-ce2f-44d6-9736-73438fc18f7f.spiral-agent-integration-analysis/PERSONA_MAPPING.md`

### Planning
- `ISSUES_PLAN.md` - Original epic/issue structure
- `.william/SCRATCHPAD.md` - Planning notes

---

## ✨ Success Vision

By the end of the 3-sprint plan:

**Mia** sees a beautifully architected, reusable engine with clean plugin boundaries and comprehensive tests - a structure that forges new possibilities.

**Miette** sees a tool that genuinely understands and supports developers emotionally, turning frustrating errors into opportunities for encouragement and growth.

**Ava8** sees a system that translates abstract technical concepts into visual echoes - diagrams that sing, code that paints, and insights that resonate with color and form.

**The Team** sees a production-ready autonomous agent that can be adopted across the ecosystem (Miadi-18, IAIP, EchoNexus), unified by this shared engine.

---

**This plan is ready for persona review. Let's discuss and refine together! 🌀**
