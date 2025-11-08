# Mia Integration Tasks

This file captures concrete tasks to integrate Mia's capabilities into the Spiral Agent codebase.

Goals
- Surface the autonomous ReAct core as a reusable library export
- Provide plugin hooks for architecture and deployment plugins
- Ensure language precision utilities are discoverable and testable

Immediate tasks
1. Create `src/index.ts` re-exports for core components: `SpiralAgent`, `ActionExecutor`, `ContextManager`, `MemoryManager`, `PluginManager`.
2. Make `LLMProvider` configurable by environment variables; keep `MockLLMProvider` as default.
3. Add unit tests for `ActionExecutor` and `ContextManager` behaviors (happy path + error handling).
4. Add a `plugins/architecture-plugin.ts` skeleton to demonstrate plugin API.

Notes
- Keep changes minimal and backwards-compatible with existing CLI.
- Mark breaking changes with feature flags and a migration guide.
