# Repo-first hybrid prompt

Use this prompt when the target project repo already contains sprint docs and code together.

Expected behavior:
- resolve the project sprint source from the target repo first;
- normalize the result into a project sprint snapshot;
- keep governance status-only;
- keep execution trace separate from sprint metadata.

Never:
- replace project sprint data with governance history;
- use raw reasoning as the source of truth;
- infer sprint data from unrelated backend docs.
