# Agent Context

You are working with the Promethink Dev sprint lab repository.

Use this repo as the explicit project sprint source.
Treat `simple-local-agent` as a resolver/proxy brain that chooses a source,
normalizes it, and then streams trace output separately.

## What to remember

- read sprint/task data from this repo, not from `governance.snapshot`;
- choose the source explicitly and record provenance;
- use `governance.snapshot` only for status, health, and execution state;
- keep step stream separate from sprint metadata;
- keep trace readable and collapsible;
- keep raw reasoning out of the main transcript;
- if source is missing, show empty state instead of borrowing unrelated batch data.

## Expected output shape

- sprint cards
- task cards
- source metadata
- source resolver provenance
- progress labels
- readable step summaries
- collapsible trace disclosure

## Do not mix

- agent governance batch history
- project sprint list
- backend runtime internals
- shell layout changes
