# Medon Web System v3.3 — Production Operating Model

v3.3 separates **who decides**, **who writes**, **who designs**, and **who implements**. The system exists to reduce owner micromanagement without handing commercial strategy to the implementation agent.

```text
[0 PROJECT + TECH FOUNDATION]
 ownership · repo · CMS · host · deploy · leads · measurement
        │ MATERIAL OWNER LOCK
        ▼
[1 COMMERCIAL TRUTH]
 constraint · ICP/JTBD · service hierarchy · offer logic · CTA · proof limits
        │ MATERIAL OWNER LOCK
        ▼
[2 SEARCH/AIO + PAGE PORTFOLIO]
 intent · entities · information gain · URLs · internal roles
        │ MATERIAL OWNER LOCK
        ▼
[3 CONTENT SPEC + PRODUCTION]
 page job · research · proof map · argument · full-page draft · SEO metadata
        │ CONTENT REVIEW / LOCK
        ▼
[4 CRO + INFORMATION ARCHITECTURE]
 heading-only scan · persuasion sequence · proof placement · section roles · grayscale
        │ MACRO REVIEW
        ▼
[5 VISUAL PRODUCTION]
 reference transfer · controlled studies · visual system · representative full page
        │ VISUAL SYSTEM LOCK
        ▼
[6 IMPLEMENTATION]
 Codex/implementation agent consumes locked content + design decisions
 Astro/Nuxt · components · CMS schema · responsive · integrations · tests
        │ TECHNICAL QA
        ▼
[7 RED TEAM + LAUNCH]
 commercial/content review · browser QA · SEO/AIO · forms · measurement · deploy
        │
        ▼
LIVE → MEASURE → EXPERIMENT LEDGER → LEARN
```

## The owner is not a token router

Owner approval is required for material commercial, architectural and visible-brand decisions. Internal production artifacts are **not** individual owner gates.

Examples that normally do **not** require separate owner approval:
- eyebrow wording;
- each CTA micro-variant;
- each section heading;
- every Section Contract;
- routine responsive choices;
- spacing corrections inside an approved design system.

Review meaningful wholes: offer, page portfolio, complete page argument, visual system, representative page.

## Content production principle

A strong page is a coherent argument, not an assembly of independently approved fragments. Headline Lab, Certainty Gap, Value Equation, Heading-Only Story, Persuasion Sequence and Section Contracts remain useful **agent tools**, but they do not become six owner approval loops.

## Visual production principle

One-variable experiments remain mandatory when diagnosing or choosing a visual layer. But typography, palette, geometry and component studies are not automatically four owner meetings. The design agent should resolve low-risk details and escalate only materially different directions.

## Implementation principle

Default role split:
- **Strategy/Content Agent (normally ChatGPT):** research, commercial framing, page portfolio, content specification, complete copy, SEO/AIO/CRO reasoning, content red team.
- **Implementation Agent (normally Codex/Claude Code):** repository inspection, code, CMS schema, components, responsive implementation, integrations, tests, browser verification.
- **Owner:** consequential business/brand decisions and final approval of meaningful wholes.

Missing content is a dependency. It is **not permission for the implementation agent to invent production positioning, prices, proof or claims**.

Commercial page quality remains:

```text
BE FOUND → BE UNDERSTOOD → BE BELIEVED → BE CHOSEN
```
