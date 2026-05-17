# Sprint Index

## Super-sprint

- super-sprint: `S.01`
- goal: собрать чистый project sprint source для display и agent onboarding
- review boundary: after `S-03`

## Sprints in the batch

- `S-01` - define sprint source shape and source metadata
- `S-02` - define governance/status split and trace rules
- `S-03` - add fixtures and fast agent onboarding packs
- `S-04` - define source resolver contract and provenance

## Current status

- `S-01` - planned
- `S-02` - planned
- `S-03` - planned
- `S-04` - planned

## Source rules

1. Project sprint data comes from `SPRINTS/` or a dedicated sprint store.
2. Governance data is only for status, health and execution state.
3. Step stream is separate from sprint metadata.
4. Empty state is valid and must not be replaced by чужие batch data.
5. Hybrid repo and split repo scenarios are both testable and must stay separate.

## Files in this repo

- `ROADMAP.md`
- `AGENT_CONTEXT.md`
- `README.md`
- `prompts/`
- `fixtures/`
- `SPRINTS/`
