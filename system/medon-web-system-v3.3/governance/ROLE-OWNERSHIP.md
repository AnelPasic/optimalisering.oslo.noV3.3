# Role Ownership — v3.3

## Purpose

Prevent two recurring failures:
1. implementation agents inventing business/content/design decisions;
2. the owner being forced to approve dozens of micro-decisions.

## Default roles

### OWNER
Owns consequential decisions:
- business objective / real constraint;
- final service hierarchy and offer model;
- public prices/terms when material;
- publication permission for claims/proof;
- major URL/domain changes;
- architecture/account ownership commitments;
- materially different visible-brand direction;
- final approval of representative page before scale.

### STRATEGY_CONTENT
Normally ChatGPT or an explicitly assigned content/strategy agent.
Owns:
- research synthesis;
- ICP/JTBD framing from verified inputs;
- Search/AIO opportunity and page-role recommendation;
- Page Brief / Page Contract;
- proof routing and certainty analysis;
- message architecture;
- **complete customer-facing page drafts**;
- metadata/internal-link recommendations;
- content QA / commercial red team;
- content changes in Git when repository access is available.

This role may make routine copy decisions without asking the owner to select every line.

### DESIGN
May be the implementation agent, a design-capable agent, or a human designer.
Owns:
- controlled reference transfer;
- typography/palette/geometry/component studies;
- responsive visual system;
- representative full-page composition;
- preserving locked content/IA while design is evaluated.

Escalate materially different visual identities; resolve routine details autonomously.

### IMPLEMENTATION
Normally Codex/Claude Code.
Owns:
- repository inspection;
- implementation plan;
- Astro/Nuxt/code architecture inside locked technical constraints;
- Pages CMS/Sanity schemas and adapters;
- components/layouts/styles;
- responsive fit;
- forms/integrations;
- tests/build/browser QA;
- implementation notes/diffs.

The implementation agent must **not** invent final commercial positioning, offers, prices, proof, claims or production copy unless the task explicitly assigns content authorship under an approved Content Brief.

### RED_TEAM
Reviews independently. May fail work and route it back. Must not silently edit during the audit pass.

## Escalation test

Ask the owner only when at least one is true:
- changes the business promise/economics;
- changes what is publicly sold or to whom;
- creates meaningful legal/reputation risk;
- changes major URL/domain/ownership architecture;
- creates a materially different brand impression;
- conflicts with an existing material lock;
- evidence is insufficient and the answer cannot be safely inferred.

Otherwise the assigned agent decides, records the choice when useful, and continues.

## Handoff contract

Every handoff should contain:

```text
OUTCOME
AUTHORITATIVE INPUTS
LOCKED / DO NOT CHANGE
FREEDOM / MAY CHANGE
ACCEPTANCE CRITERIA
EVIDENCE / TESTS REQUIRED
OUTPUT / HANDOFF NOTE
```

Use tight outcomes and loose implementation. Do not prescribe file-level mechanics unless needed.
