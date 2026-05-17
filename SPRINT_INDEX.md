# Индекс спринтов

## Уровень super-sprint

- super-sprint: `S.01`;
- цель: собрать чистый project sprint source для display и agent onboarding;
- review границы: после `S-03`.

## Спринты в текущем батче

- `S-01` — определить форму sprint source и source metadata;
- `S-02` — определить разделение governance/status и trace rules;
- `S-03` — добавить fixtures и быстрые agent onboarding packs;
- `S-04` — определить source resolver contract и model provenance.

## Текущий статус

- `S-01` — planned;
- `S-02` — planned;
- `S-03` — planned;
- `S-04` — planned.

## Правила источника

1. Project sprint data приходит из `SPRINTS/` или dedicated sprint store.
2. Governance data — только для status, health и execution state.
3. Step stream отделён от sprint metadata.
4. Empty state валиден и не должен заменяться чужими batch data.

## Карта файлов

- `ROADMAP.md`
- `GOVERNANCE_MODEL.md`
- `AGENT_CONTEXT.md`
- `prompts/`
- `fixtures/`
- `SPRINTS/`
