# Governance Model

`governance.snapshot` in this repository is a status layer, not a project sprint source.

It is paired with a separate source-resolver layer that decides where project
sprint data lives.

## Allowed uses

- health
- progress
- current mode
- active execution state
- warnings
- operational summary
- provenance for status updates

## Not allowed

- project sprint list
- sprint task hierarchy
- roadmap source of truth
- fallback for missing sprint source
- project source resolution

## Suggested shape

```ts
type GovernanceSnapshot = {
  ok?: boolean;
  generatedAt?: string;
  health?: string;
  progressLabel?: string;
  currentMode?: string;
  activeSessionId?: string;
  activeExecutionId?: string;
  warnings?: string[];
};
```

## UI guidance

- `StatusPanel` may read governance health and progress
- `SprintProtocol` must read project sprint data from an explicit sprint source
- `MissionBrief` may show trace summaries, but not raw governance batch history
