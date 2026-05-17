# Missing source prompt

Use this prompt when the target repo has no usable sprint metadata.

Expected behavior:
- return missing or empty state;
- keep governance status-only;
- keep execution trace separate;
- do not substitute internal backend docs.

Never:
- fake a sprint list;
- promote governance snapshot into project source;
- hide that source is missing.
