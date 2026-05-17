# Журнал изменений

## 0.1.3

- Уточнено, что target project repository — первое место, которое нужно проверять.
- Добавлены правила сканирования repository-first с опорой на методологически оформленные файлы.
- Контракт source resolver обновлён так, чтобы source hints считались входом, а не самим source.

## 0.1.2

- Добавлен source resolver contract для поведения simple-local-agent как proxy brain.
- Добавлены sample resolver fixtures для connected и missing source states.
- Расширен local validator для проверки source resolution, governance split и mock/offline behavior.

## 0.1.1

- Добавлены offline mock fixtures для sprint source, governance status и step streams.
- Добавлен локальный validator, чтобы repo можно было проверять без backend-изменений.
- Уточнён mock/offline validation mode рядом с repo-backed source.

## 0.1.0

- Создан dedicated sprint lab repository.
- Добавлены sprint source, governance model, roadmap и sprint index.
- Добавлен 10-second agent context pack.
- Добавлены fixtures для sprint source, governance status и step stream shape.
