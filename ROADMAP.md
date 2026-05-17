# Roadmap

## Назначение

Этот репозиторий хранит hybrid test source для project sprint data и trace-friendly read models.
Он используется как канонический тестовый источник для repo-first resolver сценария.

## Фазы

### Фаза 1 - Source shape

- определить sprint/task hierarchy;
- определить source metadata;
- определить semantics для `connected` / `empty` / `missing` / `stale`.

### Фаза 2 - Governance split

- держать `governance.snapshot` только как status;
- не использовать governance как project sprint list;
- описать UI boundary между status и sprint source.

### Фаза 3 - Agent onboarding

- дать 10-second context pack;
- объяснить, откуда агент должен читать sprint data;
- объяснить, что нельзя смешивать source layers.

### Фаза 4 - Fixtures

- хранить sample sprint sources;
- хранить step stream samples;
- хранить governance status samples;
- хранить split-repo fixtures для planning-meta и code-only repos.

### Фаза 5 - Display compatibility

- держать data shapes совместимыми с существующим shell;
- поддерживать collapsible trace disclosure;
- не требовать redesign shell для тестов.

### Фаза 6 - Source resolver contract

- описать, как агент резолвит project source;
- держать provenance отдельно от governance;
- документировать repo, store, db, Jira-style и plugin sources;
- отдельно покрыть hybrid repo и split-repo test scenarios.
