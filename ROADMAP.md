# Roadmap

## Purpose

This repo keeps the project sprint source and trace-friendly read models that
`simple-local-agent` and the frontend can use without mixing in agent-owned
governance data.

## Phases

### Phase 1 - Source shape

- define the sprint/task hierarchy
- define source metadata
- define empty/stale/missing semantics

### Phase 2 - Governance split

- keep `governance.snapshot` as status only
- keep project sprint list out of governance
- document the UI boundary between status and sprint source

### Phase 3 - Agent onboarding

- provide a 10-second context pack
- explain where the agent should read sprint data from
- explain what must not be mixed

### Phase 4 - Fixtures

- keep sample sprint sources
- keep step stream samples
- keep governance status samples

### Phase 5 - Display compatibility

- keep the data shapes compatible with the existing shell
- support collapsible trace disclosure
- avoid any shell redesign

### Phase 6 - Source resolver contract

- describe how the agent resolves a project source
- keep provenance separate from governance
- document repo, store, db, and Jira style sources
- add sample fixtures for connected and empty source states
