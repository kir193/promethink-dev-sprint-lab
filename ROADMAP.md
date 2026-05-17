# Дорожная карта

## Назначение

Этот репозиторий хранит project sprint source и trace-friendly read models,
которые могут использовать `simple-local-agent` и frontend без смешивания
agent-owned governance data.

## Фазы

### Фаза 1 - Source shape

- определить sprint/task hierarchy;
- определить source metadata;
- определить semantics для empty / stale / missing.

### Фаза 2 - Governance split

- держать `governance.snapshot` только как status;
- не использовать governance как project sprint list;
- описать UI boundary между status и sprint source.

### Фаза 3 - Agent onboarding

- дать 10-second context pack;
- объяснить, откуда агент должен читать sprint data;
- объяснить, что нельзя смешивать.

### Фаза 4 - Fixtures

- хранить sample sprint sources;
- хранить step stream samples;
- хранить governance status samples.

### Фаза 5 - Display compatibility

- держать data shapes совместимыми с существующим shell;
- поддерживать collapsible trace disclosure;
- избегать redesign shell.

### Фаза 6 - Source resolver contract

- описать, как агент резолвит project source;
- держать provenance отдельно от governance;
- документировать repo, store, db и Jira-style sources;
- добавить sample fixtures для connected и empty source states.
