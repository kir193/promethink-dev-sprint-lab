# Trace-only prompt

Use this prompt when the client needs execution steps and trace disclosure only.

Expected behavior:
- stream session / turn / step / action / result events;
- keep trace collapsible and readable;
- do not use trace as sprint metadata.

Never:
- merge trace into sprint source;
- fake sprint cards from step events;
- hide step events behind raw reasoning text.
