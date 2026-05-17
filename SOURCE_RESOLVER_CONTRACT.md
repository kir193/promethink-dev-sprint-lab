# Source Resolver Contract

This document defines how `simple-local-agent` should act as a source
resolver/proxy brain for project sprint data.

The goal is not to hard-code one source. The goal is to let the agent discover
and normalize the correct source for the project it is working on.

## Core idea

- `simple-local-agent` should start with the target project repository.
- It should inspect methodology-aligned files in that repo first.
- It can then choose a fallback source only if the repo has no usable sprint data.
- The UI should only consume the normalized output.
- `governance.snapshot` stays status-only.
- Sprint/task data must not be borrowed from agent-owned governance history.

## Source selection order

The resolver should inspect sources in this order:

1. target project repository, starting with methodology-aligned files
2. dedicated sprint store
3. external provider such as Jira or a database
4. plugin source
5. empty state if no valid source exists

Explicit project source hints are allowed only as input to identify the target
repository. They are not the data source themselves.

When scanning the repository first, the backend should prefer files such as:

- `README.md`
- `AGENTS.md`
- `ROADMAP.md`
- `SPRINT_INDEX.md`
- `SPRINTS/`
- sprint/task markdown files
- project-specific methodology docs

The resolver should record which provider won and why.

## Contract shape

```ts
type SourceResolverSnapshot = {
  ok?: boolean;
  projectId: string;
  projectName?: string;
  resolvedAt: string;
  selectedProvider: 'repo' | 'store' | 'db' | 'jira' | 'plugin' | null;
  sourceRef: string | null;
  sourceMetadata?: {
    provider?: string;
    owner?: string;
    repoName?: string;
    branch?: string;
    displayName?: string;
    externalId?: string;
  };
  sprintSource: {
    sourceState: 'connected' | 'empty' | 'missing' | 'stale';
    sourceType?: 'repo' | 'store' | 'db' | 'jira' | 'plugin';
    sourceRef: string | null;
    lastSyncedAt?: string | null;
    activeSprint?: unknown;
    sprints: unknown[];
    warnings: string[];
  };
  governanceSnapshot: {
    health?: string;
    progressLabel?: string;
    currentMode?: string;
    activeSessionId?: string;
    activeExecutionId?: string;
    warnings?: string[];
  };
  trace: {
    events: unknown[];
  };
  warnings: string[];
};
```

## UI consumption rules

- `SprintProtocol` reads `sprintSource`
- `StatusPanel` reads `governanceSnapshot`
- `MissionBrief` reads transcript and trace summaries
- raw reasoning does not render as a dump
- empty state is valid and must not be replaced with unrelated sprint data

## Proposal status

This contract is documented here first, then it can be proposed to the API
repo once the shape is stable.
