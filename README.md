# Promethink Dev Test Hybrid Sprint Source

Это тестовый репозиторий для сценария, где project sprint data живут вместе с code repo.

## Что здесь есть

- roadmap и sprint index;
- sprint/task markdown;
- agent context;
- prompt packs для source resolution;
- fixtures для project sprint source, governance status и trace;
- split-repo reminders для planning-meta и code-only test repos.

## Что здесь не должно быть

- runtime backend code;
- frontend code;
- внутренние governance/backlog docs другого продукта;
- подмена sprint list через `governance.snapshot`.

## Цель теста

- проверить repo-first source resolution;
- проверить empty / missing / stale states;
- проверить, что planning repo не склеивается с чужим code repo;
- проверить, что frontend получает нормализованные данные, а не raw text.

## Как это использовать

1. Открой `AGENT_CONTEXT.md`.
2. Открой `SPRINT_INDEX.md`.
3. Открой `ROADMAP.md`.
4. Используй `fixtures/` для source / governance / trace payloads.
5. Используй `SPRINTS/` как канонический sprint/task source.
6. Используй `fixtures/mock/` для offline validation.
7. Запусти `npm test`.
