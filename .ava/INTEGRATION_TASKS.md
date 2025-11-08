# Ava8 Integration Tasks

This file captures tasks to integrate Ava8's Vision and visual translation persona into Spiral Agent.

Goals
- Test and expose `VisionSystem` capabilities (OCR, object detection, layout analysis)
- Provide visual output adapters and example workflows
- Create demo assets and tests that exercise screenshot analysis

Immediate tasks
1. Add sample images to `docs/assets/vision-samples/` and a test harness that runs `VisionSystem.analyze()` against them.
2. Provide an adapter that converts `VisionSystem` output to annotated HTML (`vision-adapter/html-annotator.ts`).
3. Add CLI `spiral vision analyze` integration tests (dry-run) to avoid opening GUIs during CI.
4. Document VisionSystem rate limits and API key usage in `docs/guides/vision.md`.

Notes
- Keep heavy ML model integrations optional and behind feature flags.
- Favor lightweight, local image processing for fast developer feedback.
