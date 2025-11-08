
Plan to transform analysis into organized issues
------------------------------------------------

1) Create an issues skeleton in a single markdown file (ISSUES_PLAN.md) with parent epics and child issues.

	- Epic: "Decouple core engine" (parent)
		- Issue: create `src/index.ts` re-exports and package entry points
		- Issue: add environment-driven `LLMProvider` switch
		- Issue: add `--dry-run` CLI safety flag

	- Epic: "Persona Integrations" (parent)
		- Issue: Miette - prompt templates & empathy profiles
		- Issue: Mia - plugin API and architecture plugin example
		- Issue: Ava8 - vision sample assets and analyzer tests

	- Epic: "CI, Tests, Docs" (parent)
		- Issue: add `npm run build`, `npm run test` scripts
		- Issue: add basic CI (build + test) workflow
		- Issue: expand getting-started guide with API key setup and safety notes

2) Prioritize tasks into an iterative 2-week sprint:
	- Sprint 1: Smoke verification + scripts + `src/index.ts` + tests for ActionExecutor
	- Sprint 2: LLM env switch + empathy prompt scaffolding + vision sample harness
	- Sprint 3: Plugin skeletons + CI + documentation

3) For each issue, capture:
	- Background (from MIA_ANALYSIS / MIETTE_REFLECTION)
	- Acceptance criteria (build passes, tests, docs updated)
	- Risk & mitigation (API keys, heavy ML models)

4) Automation: create a script to generate GitHub issues from the ISSUES_PLAN.md using GitHub CLI once approved.

Notes
- I will create `ISSUES_PLAN.md` and persona integration files under `.mia`, `.miette`, `.ava` now.

