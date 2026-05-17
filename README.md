# Promethink Dev Sprint Lab

This repository is a dedicated test source of truth for project sprint data,
task hierarchies, and trace-friendly read models.

It is not runtime backend code and it is not the contract repo.

## Source resolver contract

`simple-local-agent` is treated as a resolver/proxy brain, not as a fixed
hard-coded reader of one repository.

It should:

- start with the target project repository and inspect its sprint/methodology files first;
- resolve the source from the repository before considering store, database, Jira, or another provider;
- normalize that source into a project snapshot;
- keep `governance.snapshot` as status/health only;
- emit step and trace updates separately from sprint metadata.

The current draft of that contract lives in
[SOURCE_RESOLVER_CONTRACT.md](SOURCE_RESOLVER_CONTRACT.md).

## What lives here

- project sprint source
- sprint/task hierarchy
- prompt packs for quick agent onboarding
- fixtures for display and QA
- governance/status read models
- mock/offline fixtures for local validation

## Rules

- The agent chooses the source, not the UI.
- Project sprint data must come from the target project repo first, then a dedicated sprint store if the repo has no usable sprint data.
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
