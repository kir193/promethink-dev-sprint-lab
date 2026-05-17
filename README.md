# Promethink Dev Sprint Lab — тестовый sprint source

Этот репозиторий — dedicated test source of truth для project sprint data,
task hierarchy и trace-friendly read models.

Это не runtime backend code и не contract repo.

## Контракт source resolver

`simple-local-agent` здесь рассматривается как resolver/proxy brain, а не как
жёстко привязанный reader одного репозитория.

Он должен:

- сначала открыть target project repository и посмотреть его sprint/methodology files;
- выбрать source из repository до любых fallback вариантов;
- нормализовать этот source в project snapshot;
- держать `governance.snapshot` только для status/health;
- отдавать step и trace updates отдельно от sprint metadata.

Текущий черновик этого контракта лежит в
[SOURCE_RESOLVER_CONTRACT.md](SOURCE_RESOLVER_CONTRACT.md).

## Что хранится здесь

- project sprint source;
- sprint/task hierarchy;
- prompt packs для быстрого agent onboarding;
- fixtures для display и QA;
- governance/status read models;
- mock/offline fixtures для local validation.

## Правила

- Агент выбирает source, а не UI.
- Project sprint data должны приходить сначала из target project repo, а если
  там нет usable sprint data — из dedicated sprint store.
- `governance.snapshot` используется только для health/status и execution state.
- Step/event stream отделён от sprint metadata.
- Raw reasoning не относится к main transcript.
- Если sprint source отсутствует, нужно показать empty state.

## Быстрый старт

1. Открой `AGENT_CONTEXT.md` — это 10-секундный brief для агента.
2. Открой `SPRINT_INDEX.md` — это инвентарь спринтов.
3. Открой `ROADMAP.md` — это план batch'а.
4. Используй файлы в `fixtures/` для UI и QA payloads.
5. Используй `SPRINTS/` как канонический sprint/task source.
6. Используй `fixtures/mock/` для offline validation и mock mode checks.
7. Запусти `npm test`, чтобы проверить согласованность repo source, governance
   model и mock fixtures.
