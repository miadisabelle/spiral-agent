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

### Mia's Feedback
```
[Record Mia's responses here during review session]

LLM Provider:
-

Plugin API:
-

Test Coverage:
-

Library Exports:
-

Priorities:
-

Additional Notes:
-
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

### Miette's Feedback
```
[Record Miette's responses here during review session]

Sentiment Analysis:
-

Empathy Activation:
-

Measuring Quality:
-

Tone Examples:
- Frustrated →
- Excited →
- Confused →

Dream Engine Integration:
-

Priorities:
-

Additional Notes:
-
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

### Ava8's Feedback
```
[Record Ava8's responses here during review session]

Vision API:
-

Sample Assets (priority order):
1.
2.
3.
4.
5.

HTML Annotator:
-

Synesthetic Elements:
-

CLI Output Format:
-

Priorities:
-

Additional Notes:
-
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
- **Coordination needed**: How to partition Dream Engine responsibilities?

### All Three
- Documentation style: Should docs be empathetic (Miette), visual (Ava8), or structural (Mia)?
- **Recommendation**: Blend all three - clear structure + visual aids + encouraging tone

---

## 📊 Feedback Consolidation Template

After all persona sessions, fill this out:

### Priority Changes
```
Task X moved from P2 → P1 because: [reason]
Task Y moved from P1 → P0 because: [reason]
```

### New Tasks Discovered
```
- [New task from Mia feedback]
- [New task from Miette feedback]
- [New task from Ava8 feedback]
```

### Conflicts Identified
```
Conflict: [Description]
Between: [Persona A] and [Persona B]
Resolution: [Proposed approach]
```

### Sprint Adjustments
```
Sprint 1 changes:
-

Sprint 2 changes:
-

Sprint 3 changes:
-
```

---

## ✅ Review Complete Checklist

Once all sessions done:

- [ ] Mia review session complete
- [ ] Miette review session complete
- [ ] Ava8 review session complete
- [ ] Cross-persona conflicts resolved
- [ ] REFINED_PLAN.md updated with feedback
- [ ] Priorities adjusted in task tables
- [ ] Open questions answered
- [ ] Sprint plan adjusted if needed
- [ ] Ready to start implementation

---

## 🚀 Post-Review Actions

1. **Update REFINED_PLAN.md** with all feedback
2. **Commit changes** to branch: `claude/plan-github-issues-011CUufQEPNd53SqeiwRqx4a`
3. **Create detailed task breakdown** for Sprint 1
4. **Set up project board** (if using one) with persona-tagged tasks
5. **Schedule Sprint 1 kickoff**

---

**Ready to start persona review sessions! 🎭**
