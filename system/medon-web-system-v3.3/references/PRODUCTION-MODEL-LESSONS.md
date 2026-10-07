# Production Model Lessons — generalized from prior Medon pilots

These are system lessons, not project-specific design instructions.

## Failure A — too much agent autonomy

A design/implementation agent was allowed to change copy, typography, palette, layout, component language, density and imagery together. Revisions became visually expensive but diagnostically useless.

**System response:** controlled variables, preserve upstream locks, representative full page before scale.

## Failure B — too much owner orchestration

A later workflow over-corrected and asked the owner to choose H1, eyebrow, support, CTA and hooks one-by-one across many pages. The project accumulated many decision artifacts before implementation.

**System response:** approve meaningful wholes. Internal content/design tools are not owner gates.

## Failure C — implementation agent as content strategist

A repo-native coding agent can implement content brilliantly and still be a poor place to delegate open-ended positioning/research/copy creation, because its strongest context/tools optimize execution against the repo.

**System response:** dedicated Strategy/Content ownership; implementation consumes locked content.

## Failure D — conversation history treated as source of truth

Long agent threads accumulate stale assumptions and rejected variants.

**System response:** project state lives in concise Git artifacts. Fresh agent sessions can resume from authoritative files without ingesting historical noise.

## Failure E — backlog as runtime checklist

Large accumulated research creates value only after reconciliation, precedence and routing.

**System response:** canonical rules outrank raw backlog. New evidence must pass duplicate, contradiction, precedence and routing checks. Raw backlogs remain research/history, not mandatory prompt context.
