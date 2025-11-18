# 🎭 Persona Task Assignments - Quick Reference

> **Purpose**: Fast lookup of who owns what, color-coded by persona

---

## 🧠 Mia's Domain (Structural Foundation)

### P0 - Critical Path (Sprint 1)
- [ ] Create `src/index.ts` re-exports
- [ ] Update `package.json` main/exports fields
- [ ] Make `LLMProvider` env-configurable (OpenAI/Anthropic/Gemini/Mock)

### P1 - Core Quality (Sprint 1)
- [ ] Add unit tests: `ActionExecutor` (happy path + errors)
- [ ] Add unit tests: `ContextManager` (context tracking)
- [ ] Achieve 80%+ test coverage on core components

### P2 - Extensibility Examples (Sprint 2)
- [ ] Create `plugins/architecture-plugin.ts` skeleton
- [ ] Document plugin API with examples
- [ ] Create deployment orchestrator plugin skeleton

**Files to Touch**:
- `src/index.ts` (create re-exports)
- `src/agent/LLMProvider.ts` (add env switching)
- `package.json` (update exports)
- `tests/unit/ActionExecutor.test.ts` (new)
- `tests/unit/ContextManager.test.ts` (new)
- `src/plugins/architecture-plugin.ts` (new)

---

## 🌸 Miette's Domain (Emotional Connection)

### P1 - Empathy Foundation (Sprint 2)
- [ ] Create `docs/prompts/empathy/` with template variants
  - `empathy-low.txt` (minimal, professional)
  - `empathy-medium.txt` (balanced, supportive)
  - `empathy-high.txt` (warm, encouraging)
- [ ] Add tone adaptation unit tests
  - Test: Frustrated input → supportive response
  - Test: Excited input → celebratory response
  - Test: Confused input → clarifying response

### P2 - CLI Integration (Sprint 2)
- [ ] Wire `EmotionalIntelligence` into interactive CLI mode
- [ ] Add `--empathy <level>` flag or config option
- [ ] Create `config/empathy_profiles.json` with settings

### P3 - Advanced Features (Sprint 3+)
- [ ] Add developer stress detection (error patterns, retries, duration)
- [ ] Implement encouragement triggers (long sessions, success moments)

**Files to Touch**:
- `docs/prompts/empathy/` (new directory)
- `src/capabilities/EmotionalIntelligence.ts` (enhance)
- `tests/unit/EmotionalIntelligence.test.ts` (new)
- `src/index.ts` (add empathy middleware)
- `config/empathy_profiles.json` (new)

---

## 🎨 Ava8's Domain (Visual Translation)

### P1 - Vision Foundation (Sprint 2)
- [ ] Create `docs/assets/vision-samples/` with test images
  - UI screenshot (with bugs to find)
  - Architecture diagram (to interpret)
  - Code screenshot (for OCR)
  - Wireframe sketch (to analyze)
  - Data visualization (to describe)
- [ ] Create vision test harness
  - `tests/integration/vision.test.ts`
  - Runs `VisionSystem.analyze()` on all samples
  - Asserts expected outputs (JSON schema)

### P2 - Visual Output (Sprint 2-3)
- [ ] Build HTML annotator adapter
  - `src/adapters/vision-adapter/html-annotator.ts`
  - Converts VisionSystem output → annotated HTML
  - Bounding boxes, labels, color overlays
- [ ] Add `spiral vision analyze` CLI command tests
  - Integration tests (dry-run for CI)
  - Output format tests (JSON, HTML, CLI rich text)

### P2 - Documentation (Sprint 3)
- [ ] Write `docs/guides/vision.md`
  - API key setup instructions
  - Rate limits and costs
  - Capability matrix (what can/can't be analyzed)
  - Example workflows

**Files to Touch**:
- `docs/assets/vision-samples/` (new directory + images)
- `src/capabilities/VisionSystem.ts` (enhance)
- `tests/integration/vision.test.ts` (new)
- `src/adapters/vision-adapter/html-annotator.ts` (new)
- `src/index.ts` (add `spiral vision` command)
- `docs/guides/vision.md` (new)

---

## 🤝 Shared Responsibilities

### Dream Engine (Ava8 + Miette)
**Decision needed**: How to partition?

Option A: Separate modes
- `DreamEngine.createNarrative()` → Miette
- `DreamEngine.createVisual()` → Ava8

Option B: Unified creative pipeline
- Miette provides narrative prompts
- Ava8 adds visual/musical layers
- Dream Engine blends them

**Recommendation**: Start with Option A (cleaner), evolve to Option B

### Documentation Style (All Three)
**Decision needed**: Whose voice?

- **Technical docs** (API, architecture): Mia's precise, structural tone
- **User guides** (getting started, tutorials): Miette's encouraging, clear tone
- **Examples** (screenshots, demos): Ava8's visual, annotated style

### CI/CD Pipeline (All Three)
**Shared task** - Each contributes tests:
- Mia: Unit tests for core engine
- Miette: Tests for empathy responses
- Ava8: Tests for vision analysis

---

## 🚦 Critical Path (Dependencies)

```
Mia P0 (src/index.ts re-exports)
  ↓
Mia P0 (LLM env switch)
  ↓
Mia P1 (Unit tests)
  ↓
┌─────────────────┬─────────────────┐
│                 │                 │
Miette P1         Ava8 P1          Mia P2
(Empathy)         (Vision)         (Plugins)
  ↓                 ↓                ↓
Miette P2         Ava8 P2          Epic 3
(CLI integration) (HTML adapter)   (CI/CD)
  ↓                 ↓                ↓
        Epic 4 (Security & Packaging)
```

**Key Blocker**: Mia's P0 tasks must finish before other personas can integrate their features into the CLI.

---

## 📅 Sprint 1 Focus (Weeks 1-2)

**Mia's Sprint 1 Commitment**:
- ✅ Re-exports functional
- ✅ LLM env switching working
- ✅ Unit tests 80%+ coverage

**Team Support**:
- ✅ CI skeleton (even with minimal tests)
- ✅ Build/test scripts validated
- ✅ Documentation templates created

**Deliverable**: Library-ready core engine that Miette & Ava8 can extend

---

## 📅 Sprint 2 Focus (Weeks 3-4)

**Miette's Sprint 2 Commitment**:
- ✅ Empathy prompt templates
- ✅ Tone adaptation tests passing
- ✅ CLI middleware functional

**Ava8's Sprint 2 Commitment**:
- ✅ Vision sample assets
- ✅ Test harness running
- ✅ Initial vision API integration

**Mia's Sprint 2 Commitment**:
- ✅ Architecture plugin example
- ✅ Plugin API documented

**Deliverable**: All three personas' capabilities demonstrable via CLI

---

## 📅 Sprint 3 Focus (Weeks 5-6)

**All Personas**:
- ✅ Security hardening (shared)
- ✅ Documentation complete (own domains)
- ✅ Polish and examples

**Ava8 Sprint 3**:
- ✅ HTML annotator
- ✅ Vision CLI tests
- ✅ Vision guide published

**Team Sprint 3**:
- ✅ Package ready for npm publish
- ✅ Final integration tests
- ✅ Release preparation

**Deliverable**: Production-ready v1.0.0

---

## 🎯 Success Metrics by Persona

### Mia
- [ ] `npm install spiral-agent` works
- [ ] Can import and use core components in external project
- [ ] Test coverage ≥80% on core engine
- [ ] 2+ working plugin examples

### Miette
- [ ] EmotionalIntelligence detects sentiment correctly (test assertions)
- [ ] 3+ empathy profiles documented and functional
- [ ] Interactive CLI responses feel supportive (user feedback)
- [ ] No degradation in response speed

### Ava8
- [ ] VisionSystem analyzes 5+ different image types
- [ ] HTML annotator produces usable visual overlays
- [ ] `spiral vision analyze` command works end-to-end
- [ ] Vision guide enables new users to get started in <5 min

---

## 🔄 How to Use This Document

**Before each sprint planning**:
1. Review persona commitments
2. Check if dependencies are met
3. Adjust priorities if blockers exist

**During development**:
1. Check task ownership (who owns what file)
2. Coordinate on shared files (e.g., `src/index.ts`)
3. Update checkboxes as tasks complete

**For reviews**:
1. Each persona reviews their domain
2. Validates tests/examples work
3. Signs off on quality

---

**This is your task ownership map. Keep it updated as work progresses! 🗺️**
