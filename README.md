# Promethink Dev Sprint Lab

This repository is a dedicated test source of truth for project sprint data,
task hierarchies, and trace-friendly read models.

It is not runtime backend code and it is not the contract repo.

## What lives here

- project sprint source
- sprint/task hierarchy
- prompt packs for quick agent onboarding
- fixtures for display and QA
- governance/status read models
- mock/offline fixtures for local validation

## Rules

- Project sprint data must come from this repo or a dedicated sprint store.
- `governance.snapshot` is for health/status and execution state only.
- Step/event stream stays separate from sprint metadata.
- Raw reasoning does not belong in the main transcript.
- Missing sprint source should render as empty state.

## Quick start

1. Open `AGENT_CONTEXT.md` for the 10-second agent brief.
2. Open `SPRINT_INDEX.md` for the sprint inventory.
3. Open `ROADMAP.md` for the batch plan.
4. Use files under `fixtures/` for UI and QA payloads.
5. Use files under `SPRINTS/` as the canonical sprint/task source.
6. Use `fixtures/mock/` for offline validation and mock mode checks.
7. Run `npm test` to validate that the repo source, governance model, and mock fixtures are consistent.
