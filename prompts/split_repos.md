# Split repos prompt

Use this prompt when planning/meta lives in one repo and code lives in another repo.

Expected behavior:
- resolve project sprint data only from the planning/meta repo;
- keep the code-only repo separate;
- keep governance status-only;
- keep trace separate from sprint metadata.

Never:
- merge the code repo into the sprint source;
- use governance snapshot as the sprint list;
- invent sprint data if planning metadata is absent.
