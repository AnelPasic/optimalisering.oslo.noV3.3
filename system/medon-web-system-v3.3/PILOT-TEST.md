# Pilot Test — validate v3.3 before broad rollout

## Objective
Test whether the system reduces both failure modes:
- implementation agent invents/changes too much;
- owner is forced through micro-gates.

## Preferred pilot
Use a real project with known historical friction. Start from a **fresh project state/session** and import only curated project truth via `templates/PROJECT-MIGRATION-AUDIT.md`.

Do not upload the entire historical project as authoritative operating context.

## Test sequence
1. bootstrap from v3.3;
2. import KEEP / REVIEW / MISSING / COPY SEEDS / DESIGN PRIORS;
3. verify Gate 0–2 material decisions;
4. have Strategy/Content produce one complete representative-page draft;
5. review as a whole;
6. create CRO/IA structure;
7. produce visual system + one representative full page;
8. hand locked content/design to Implementation Agent;
9. require build/tests/browser evidence;
10. run independent Red Team.

## Success signals
- owner is asked only meaningful questions;
- no generic filler copy appears because content was missing;
- implementation agent preserves locked content;
- visual revisions identify the failing variable rather than total-redesigning;
- one representative page works before scaling;
- project source-of-truth remains concise enough for a fresh agent session.

## Failure signals
- dozens of approval artifacts before a page exists;
- Codex/Claude invents pricing/claims/positioning;
- content is hard-coded and diverges from CMS/Git truth;
- each visual review changes multiple unrelated layers;
- old conversation history becomes required to understand current state.

Record failures as **system workflow bugs**, not merely pilot feedback.
