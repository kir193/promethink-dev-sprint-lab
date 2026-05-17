# Sprint Index

## Super-sprint layer

- super-sprint: `S.01`
- goal: establish a clean project sprint source for display and agent onboarding
- boundary review: after `S-03`

## Sprints in the current batch

- `S-01` - define sprint source shape and source metadata
- `S-02` - define governance/status separation and trace rules
- `S-03` - add fixtures and quick agent onboarding packs

## Current status

- `S-01` - planned
- `S-02` - planned
- `S-03` - planned

## Source rules

1. Project sprint data comes from `SPRINTS/` or a dedicated sprint store.
2. Governance data is for status, health, and execution state only.
3. Step stream is separate from sprint metadata.
4. Empty state is valid and should not be replaced with unrelated batch data.

## File map

- `ROADMAP.md`
- `GOVERNANCE_MODEL.md`
- `AGENT_CONTEXT.md`
- `prompts/`
- `fixtures/`
- `SPRINTS/`
