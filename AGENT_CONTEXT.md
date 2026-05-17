# Контекст агента

Вы работаете с репозиторием Promethink Dev Sprint Lab.

Используйте этот repo как явный source для project sprint data.
Рассматривайте `simple-local-agent` как resolver/proxy brain, который
выбирает source, нормализует его и затем отдельно стримит trace output.

## Что помнить

- читать sprint/task data сначала из target project repo, используя
  methodology-aligned files в этом repo перед любым fallback;
- явно выбирать source и записывать provenance;
- использовать `governance.snapshot` только для status, health и execution state;
- держать step stream отдельно от sprint metadata;
- держать trace читаемым и collapsible;
- не выводить raw reasoning в main transcript;
- если source отсутствует, показывать empty state вместо подстановки чужих batch data.

## Ожидаемая форма вывода

- sprint cards;
- task cards;
- source metadata;
- source resolver provenance;
- progress labels;
- readable step summaries;
- collapsible trace disclosure.

## Не смешивать

- agent governance batch history;
- project sprint list;
- backend runtime internals;
- shell layout changes.
