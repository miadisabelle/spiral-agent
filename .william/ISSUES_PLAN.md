# ISSUES_PLAN

This file lays out epics and child issues derived from the analysis artifacts (MIA_ANALYSIS.md, MIETTE_REFLECTION.md, PERSONA_MAPPING.md, PROJECT_SUMMARY.md) and the codebase.

Epics
-----

1. Decouple core engine
  - Create `src/index.ts` re-exports and update `package.json` entry points
  - Add `LLMProvider` env switch and keep `MockLLMProvider` default
  - Add `--dry-run` CLI safety flag
  - Add unit tests for `ActionExecutor` and `ContextManager`

2. Persona Integrations
  - Miette: prompt templates, empathy profiles, interactive middleware
  - Mia: plugin API, architecture plugin example, deployment orchestrator plugin skeleton
  - Ava8: vision samples, analyzer test harness, HTML annotator adapter

3. CI, Tests & Packaging
  - Add `npm run build`, `npm run test` scripts
  - Add basic CI workflow (build + test + lint)
  - Publish plan for internal npm package (private)

4. Safety & Security
  - Sandbox shell execution, add confirmations for destructive actions
  - Document API key and secrets handling
  - Add audit logging for external actions

Sprint plan (3 sprints)
----------------------
Sprint 1 (1-2 weeks): Smoke verification, build/test scripts, `src/index.ts`, ActionExecutor tests
Sprint 2 (1-2 weeks): LLM env switch, empathy prompts, vision sample harness
Sprint 3 (1-2 weeks): Plugin examples, CI, packaging, docs finalization

How to convert to GitHub issues
------------------------------
1. Review and edit entries locally
2. Use CLI or a script to create issues via GitHub API
3. Tag each issue with `epic:<name>` and assign reviewers

Acceptance criteria for epic completion
--------------------------------------
- Builds pass on CI
- Tests cover core behaviors and pass locally
- Docs updated and examples runnable with `npm run build` + `node dist/index.js`

Notes
- Keep heavy model integrations behind feature flags and env variables
- Prioritize small, testable changes over broad refactors initially
