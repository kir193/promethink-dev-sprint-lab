# Контракт Source Resolver

Этот документ определяет, как `simple-local-agent` должен вести себя как
source resolver / proxy brain для project sprint data.

Цель не в том, чтобы жёстко привязать его к одному источнику. Цель в том,
чтобы агент мог находить и нормализовать правильный source для проекта, над
которым он работает.

## Основная идея

- `simple-local-agent` должен начинать с target project repository;
- он должен сначала смотреть методологически оформленные файлы в этом repo;
- fallback source можно выбирать только если в repo нет usable sprint data;
- UI должен потреблять только нормализованный результат;
- `governance.snapshot` остаётся только status-only;
- sprint/task data нельзя брать из agent-owned governance history.

## Порядок выбора source

Resolver должен проверять sources в таком порядке:

1. target project repository, начиная с методологически оформленных файлов;
2. dedicated sprint store;
3. внешние провайдеры, такие как Jira или database;
4. plugin source;
5. empty state, если нет валидного source.

Explicit project source hints используются только для идентификации target
repository. Они не являются source сами по себе.

При сканировании repo сначала backend должен предпочитать такие файлы:

- `README.md`
- `AGENTS.md`
- `ROADMAP.md`
- `SPRINT_INDEX.md`
- `SPRINTS/`
- sprint/task markdown files
- project-specific methodology docs

Resolver должен записывать, какой provider победил и почему.

## Контрактная форма

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

## Правила потребления UI

- `SprintProtocol` читает `sprintSource`;
- `StatusPanel` читает `governanceSnapshot`;
- `MissionBrief` читает transcript и trace summaries;
- raw reasoning не рендерится как dump;
- empty state валиден и не должен заменяться чужими sprint data.

## Статус предложения

Этот контракт сначала документируется здесь, а потом может быть предложен в
API repo, когда форма стабилизируется.
