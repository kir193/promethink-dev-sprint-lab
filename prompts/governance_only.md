# Governance-only prompt

Use this prompt when the client only needs status / health / execution state.

Expected behavior:
- return a governance snapshot only;
- do not include sprint list;
- keep progress readable;
- keep the contract separate from sprint source.

Never:
- inject sprint cards into governance;
- use governance as sprint source;
- expose raw reasoning as a substitute for structured state.
