# Модель governance

`governance.snapshot` в этом репозитории — это status layer, а не источник
project sprint.

Он связан с отдельным source-resolver layer, который определяет, где живут
project sprint data.

## Разрешённое использование

- health;
- progress;
- current mode;
- active execution state;
- warnings;
- operational summary;
- provenance для status updates.

## Запрещено

- project sprint list;
- sprint task hierarchy;
- roadmap source of truth;
- fallback для missing sprint source;
- project source resolution.

## Предлагаемая форма

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

## Подсказка для UI

- `StatusPanel` может читать governance health и progress;
- `SprintProtocol` должен читать project sprint data только из explicit sprint source;
- `MissionBrief` может показывать trace summaries, но не raw governance batch history.
