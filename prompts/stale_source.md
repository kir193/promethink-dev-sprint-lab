# Stale source prompt

Use this prompt when the repo source exists but is stale or partially synchronized.

Expected behavior:
- return stale state with warnings;
- keep governance status-only;
- keep trace separate from sprint metadata.

Never:
- downgrade stale to connected without evidence;
- treat trace as the source of truth;
- fill stale gaps with unrelated backend sprint docs.
