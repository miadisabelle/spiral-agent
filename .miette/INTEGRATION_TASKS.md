# Miette Integration Tasks

This file captures tasks to integrate Miette's Emotional Intelligence persona into Spiral Agent.

Goals
- Surface and test `EmotionalIntelligence` capability
- Provide prompt templates and configurable empathy profiles
- Add user-facing examples and tests for adaptive communication

Immediate tasks
1. Add example prompt templates under `docs/prompts/empathy/` used by `EmotionalIntelligence`.
2. Add unit tests that assert tone adaptation given different input sentiments.
3. Wire `EmotionalIntelligence` into the interactive CLI mode as an optional middleware that decorates responses.
4. Create an `empathy_profiles.json` to demo low/medium/high empathy settings.

Notes
- Ensure no external API keys are committed. Use environment variables for any provider keys.
- Keep default behavior non-intrusive unless explicitly enabled by user flags.
