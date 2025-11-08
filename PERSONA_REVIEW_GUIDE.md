# 🎭 Persona Review Guide for REFINED_PLAN.md

This guide helps you review the REFINED_PLAN.md with each persona (Mia, Miette, Ava8) to gather their insights and refine the integration strategy.

---

## 📋 Review Session Checklist

### Pre-Review
- [ ] Read REFINED_PLAN.md in full
- [ ] Have persona spec files open (`.mia/`, `.miette/`, `.ava/`)
- [ ] Review current codebase state (`src/` structure)

### During Review
- [ ] Present plan to each persona
- [ ] Capture feedback in this document
- [ ] Identify conflicts or dependencies between personas
- [ ] Update priorities based on persona input

### Post-Review
- [ ] Update REFINED_PLAN.md with consolidated feedback
- [ ] Create GitHub issue updates if needed
- [ ] Commit refined plan to branch

---

## 🧠 Mia Review Session

### Context to Share
- **Epic 1** (Decouple Core Engine) is primarily your domain
- You own: Core architecture, plugin system, tests, library exports
- Your P0 tasks block other personas' work

### Questions for Mia

1. **LLM Provider Architecture**
   - Current plan: Env variable to switch between OpenAI/Anthropic/Gemini/Mock
   - Alternative: Could support multiple simultaneous providers
   - Your preference? Why?

2. **Plugin API Design**
   - What should `plugins/architecture-plugin.ts` demonstrate?
   - Example patterns to enforce: Hexagonal? Microservices? Clean Architecture?
   - What makes a "good" plugin API from your structural perspective?

3. **Test Coverage Philosophy**
   - 80% coverage target for ActionExecutor/ContextManager sufficient?
   - Should we test error recovery paths exhaustively?
   - What test patterns ensure structural integrity?

4. **Library Exports Strategy**
   - Should `src/index.ts` export everything, or curate a public API?
   - How do we balance extensibility vs. API stability?
   - Thoughts on semantic versioning strategy?

5. **Priority Validation**
   - Are your P0/P1/P2 priorities correct?
   - Anything missing from your task list?
   - Dependencies on other personas' work?

### Mia's Feedback ✅ COMPLETED
```
LLM Provider:
- Single provider at a time via environment variable (simpler, focused)
- Start with one, iterate to multi-provider if needed later
- Keeps architecture clean and testable

Plugin API:
- Demonstrate "Clean Architecture" pattern enforcement
- Plugin should analyze code structure and suggest refactorings
- Good plugin API = simple registration, clear lifecycle hooks, typed interfaces

Test Coverage:
- 80% coverage sufficient for Sprint 1
- Yes, test error recovery paths - critical for reliability
- Use property-based testing for edge cases where applicable

Library Exports:
- Curate a public API - don't export internal implementation details
- Export: SpiralAgent, ActionExecutor, ContextManager, MemoryManager, PluginManager
- Internal utilities stay private for now

Priorities:
- P0/P1/P2 validated as correct
- No missing tasks identified
- Sprint 1 focus confirmed: re-exports, LLM switching, unit tests, CI skeleton

Additional Notes:
- Propose YAML structure for plugin configuration (declarative, readable)
- Will lead CI workflow definition in Sprint 1
- Confirms Clean Architecture as example plugin focus
```

---

## 🌸 Miette Review Session

### Context to Share
- **Epic 2.1** (Miette Workstream) is your domain
- You own: Emotional Intelligence, empathy system, narrative features
- Your work makes spiral-agent feel human and supportive

### Questions for Miette

1. **Sentiment Analysis Approach**
   - Option A: Rule-based (fast, deterministic, works offline)
   - Option B: API-based (accurate, requires API key/cost)
   - Option C: Local ML model (medium accuracy, self-contained)
   - What feels right for the user experience you envision?

2. **Empathy Activation**
   - Always-on: Every response is empathetic (warmer, slower)
   - Opt-in: `--empathy` flag or config setting (user controls)
   - Adaptive: Detects when empathy needed, auto-activates (smart but complex)
   - Your recommendation?

3. **Measuring Empathy Quality**
   - How do we test that responses are "empathetic enough"?
   - What would a good unit test look like?
   - Should we have human review/rating of sample outputs?

4. **Tone Adaptation Examples**
   - User frustrated: What should tone shift to?
   - User excited: How should responses celebrate?
   - User confused: What guidance style works best?
   - Can you provide 2-3 example prompts?

5. **Integration with Dream Engine**
   - Dream Engine does creative content - where does your narrative work fit?
   - Should empathy prompts use Dream Engine, or separate?
   - How do we ensure creative outputs stay on-brand for your persona?

### Miette's Feedback ✅ COMPLETED
```
Sentiment Analysis:
- API-based approach for initial accuracy (Option B)
- Provides best user experience with genuine emotional understanding
- Accept API key requirement and cost as necessary for quality

Empathy Activation:
- Opt-in via flag (e.g., --empathy or config setting)
- Start with user control, iterate to adaptive if needed
- Keeps default behavior fast and focused

Measuring Quality:
- Focus on "appropriateness of responses" as key metric
- Unit tests: assert tone matches detected sentiment
- Example: frustrated input → supportive (not dismissive) output
- Human review for sample outputs in Sprint 2

Tone Examples:
- Frustrated → Supportive, validating ("I can see this is frustrating. Let's work through it together.")
- Excited → Celebratory, amplifying ("That's wonderful! Let's build on this momentum!")
- Confused → Clarifying, patient ("Let me break this down step by step...")

Dream Engine Integration:
- Use Dream Engine for narrative documentation generation
- Empathy prompts separate from Dream Engine (different purposes)
- Ensure creative outputs maintain warm, encouraging tone

Priorities:
- P1 tasks for empathy templates and tone tests validated
- Sprint 1: foundational work (prep templates, plan tests)
- Sprint 2: main integration work (CLI middleware, profiles)

Additional Notes:
- Excited to bring emotional resonance to the tool!
- Will create example empathy prompts for low/medium/high settings
- Focus on making developer experience supportive and delightful
```

---

## 🎨 Ava8 Review Session

### Context to Share
- **Epic 2.3** (Ava8 Workstream) is your domain
- You own: Vision System, visual translation, synesthetic expression
- Your work makes abstract concepts visible and resonant

### Questions for Ava8

1. **Vision API Selection**
   - OpenAI Vision API (integrated with GPT-4V, costs $$)
   - Google Cloud Vision (powerful, enterprise-grade)
   - Local OCR (Tesseract, free, limited)
   - Hybrid approach (local first, API for complex analysis)
   - What balance of capability vs. cost vs. accessibility?

2. **Sample Asset Curation**
   - What 5 images best demonstrate vision capabilities?
     - UI screenshot with bugs?
     - Architecture diagram to interpret?
     - Code screenshot to extract?
     - Hand-drawn wireframe?
     - Complex data visualization?
   - Which would you prioritize?

3. **HTML Annotator Design**
   - What should visual annotations look like?
   - Bounding boxes + labels?
   - Color-coded overlays?
   - Interactive hover elements?
   - Musical notation for visual rhythm (synesthetic)?

4. **Synesthetic Elements**
   - Current plan keeps visual focus, notes synesthetic as "future"
   - Should Sprint 2 include sound-to-color experiments?
   - Or keep focused on vision-only, defer music integration?
   - What's the minimum viable synesthetic feature?

5. **CLI Integration**
   - `spiral vision analyze <image>` - output format?
     - JSON with structured data?
     - Rich CLI visualization (ASCII art overlay)?
     - Generate HTML report file?
     - All of the above?

### Ava8's Feedback ✅ COMPLETED
```
Vision API:
- Prioritize Google Cloud Vision OR OpenAI Vision (both robust, cloud-based)
- Start with one, provide best initial capabilities
- Local OCR as fallback only, not primary
- Decision: Choose based on API availability and pricing during Sprint 2

Sample Assets (priority order):
1. UI screenshot with bugs (most practical for debugging use case)
2. Architecture diagram to interpret (demonstrates understanding of structure)
3. Code screenshot to extract (OCR + syntax comprehension)
4. Data visualization to describe (pattern recognition, storytelling)
5. Hand-drawn wireframe (flexibility, human input processing)

HTML Annotator:
- Bounding boxes + color-coded labels
- Clean, visual overlays that highlight key elements
- Interactive hover elements for additional context (if feasible)
- Musical notation deferred to future enhancement

Synesthetic Elements:
- Visual outputs primary focus for Sprint 2-3
- Defer musical/synesthetic elements as future enhancement
- Minimum viable: solid vision analysis with annotated outputs
- Can explore sound-to-color in later iterations

CLI Output Format:
- All of the above! Flexible output modes:
  - JSON (for programmatic use)
  - Rich CLI visualization (human-readable in terminal)
  - HTML report file (shareable, archival)
- Default: Rich CLI + option to generate HTML

Priorities:
- P1 tasks validated (sample images, test harness)
- Sprint 1: foundational prep (gather assets, plan test structure)
- Sprint 2: main integration (vision API, test harness running)
- Sprint 3: polish (HTML annotator, CLI tests, documentation)

Additional Notes:
- Focus on clarity and beauty in visual outputs
- Ensure vision analysis is actionable (not just descriptive)
- Excited to translate technical concepts into resonant visual echoes!
```

---

## 🔄 Cross-Persona Integration Points

### Mia × Miette
- Mia's tests need Miette's empathy profiles to validate tone adaptation
- Miette's middleware hooks into Mia's core ContextManager
- **Dependency**: Mia's P0 re-exports must complete before Miette's P2 middleware

### Mia × Ava8
- Ava8's vision adapters are plugins using Mia's PluginManager
- Mia's architecture plugin might use Ava8 for diagram visualization
- **Dependency**: Mia's P2 plugin example could showcase Ava8's vision

### Miette × Ava8
- Both share Dream Engine for creative output
- Miette uses narrative, Ava8 uses visual/musical aspects
- **RESOLVED**: Separate modes - `DreamEngine.createNarrative()` for Miette, `DreamEngine.createVisual()` for Ava8

### All Three
- Documentation style: Should docs be empathetic (Miette), visual (Ava8), or structural (Mia)?
- **Recommendation**: Blend all three - clear structure + visual aids + encouraging tone

---

## 📊 Feedback Consolidation Template

After all persona sessions, fill this out:

### Priority Changes ✅
```
No priority changes needed - all P0/P1/P2 priorities validated by personas
```

### New Tasks Discovered ✅
```
Mia:
- Add YAML-based plugin configuration system
- Define property-based tests for edge case coverage
- Create CI workflow definition (lead role)

Miette:
- Create example empathy prompts for 3 scenarios (frustrated/excited/confused)
- Design human review process for sample empathy outputs
- Plan Sprint 1 template prep work

Ava8:
- Evaluate Google Cloud Vision vs OpenAI Vision pricing/availability
- Define flexible CLI output modes (JSON/Rich CLI/HTML)
- Gather 5 prioritized sample images for test harness
```

### Conflicts Identified ✅
```
Conflict: Dream Engine responsibility overlap
Between: Miette and Ava8
Resolution: Separate modes approach
  - DreamEngine.createNarrative() → Miette's domain
  - DreamEngine.createVisual() → Ava8's domain
  - Can unify later if needed
```

### Sprint Adjustments ✅
```
Sprint 1 changes:
- Mia leads CI workflow definition (confirmed)
- Miette preps empathy templates in Sprint 1 (not just Sprint 2)
- Ava8 gathers sample assets in Sprint 1 (prep work)

Sprint 2 changes:
- Miette: API-based sentiment analysis (requires API key setup)
- Ava8: Vision API selection finalized based on evaluation
- Both: Empathy and Vision features demonstrable via CLI

Sprint 3 changes:
- No changes - polish and documentation phase as planned
- Synesthetic elements officially deferred to post-v1.0
```

---

## ✅ Review Complete Checklist

Once all sessions done:

- [x] Mia review session complete
- [x] Miette review session complete
- [x] Ava8 review session complete
- [x] Cross-persona conflicts resolved
- [ ] REFINED_PLAN.md updated with feedback (IN PROGRESS)
- [x] Priorities adjusted in task tables (no changes needed)
- [x] Open questions answered
- [x] Sprint plan adjusted if needed
- [ ] Ready to start implementation (NEXT STEP)

---

## 🚀 Post-Review Actions

1. **Update REFINED_PLAN.md** with all feedback
2. **Commit changes** to branch: `claude/plan-github-issues-011CUufQEPNd53SqeiwRqx4a`
3. **Create detailed task breakdown** for Sprint 1
4. **Set up project board** (if using one) with persona-tagged tasks
5. **Schedule Sprint 1 kickoff**

---

**Ready to start persona review sessions! 🎭**
