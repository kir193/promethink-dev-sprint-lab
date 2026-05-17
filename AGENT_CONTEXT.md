# Agent Context

This repo is the canonical **test hybrid sprint source** for Promethink Dev source-resolution work.

Use this repo when you need to validate a scenario where:

- sprint docs and code live together in one repo;
- the backend must resolve project sprint data repo-first;
- `governance.snapshot` stays status-only;
- step / trace output remains separate from sprint metadata.

## Remember

- read sprint/task data first from the target project repo;
- use source provenance explicitly;
- never treat `governance.snapshot` as a project sprint list;
- keep trace separate and collapsible;
- do not replace missing sprint source with internal backend batch history;
- when testing split-repo layouts, pair this repo with:
  - `promethink-dev-test-planning-meta-source`
  - `promethink-dev-test-code-source`

## Expected output

- sprint cards;
- task cards;
- source metadata;
- source resolver provenance;
- progress labels;
- readable step summaries;
- collapsible trace disclosure.
