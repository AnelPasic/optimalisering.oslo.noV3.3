# Content Operating Model — v3.3

## Core rule

**Production content is owned separately from code implementation.**

A generic starter can provide semantics, templates and QA. It cannot infer a client's strongest positioning, evidence, offer or final copy reliably enough to publish without a dedicated content process.

## Content authority

Recommended order:
1. verified project/business facts;
2. approved commercial decisions;
3. approved proof/claim registry;
4. approved page portfolio / role;
5. locked production content in Git;
6. CMS edits that commit to Git;
7. implementation convenience.

The implementation layer must render content truth; it must not silently rewrite it.

## Production flow per important page

```text
research / intent / first-party evidence
→ Page Brief
→ Page Contract
→ proof + certainty map
→ argument / message architecture
→ COMPLETE PAGE DRAFT
→ content QA + SEO/AIO/CRO review
→ owner review only where materially useful
→ CONTENT LOCK
→ Git content layer
→ implementation
```

Headline Lab, Value Equation, Heading-Only Story, Persuasion Sequence and Section Contracts are tools used inside this flow. They are not independent approval gates.

## Full-page draft requirement

Do not ask the owner to approve H1 → eyebrow → support → CTA → next hook one item at a time unless a specific unresolved line is commercially material.

A complete draft must make the argument visible end-to-end:
- why care;
- problem / situation recognition;
- mechanism / explanation;
- what changes;
- offer / scope;
- proof / credibility;
- objections / limits;
- price/terms where appropriate;
- next action.

Judge the page as a coherent system.

## Content states

Use explicit states:
- `DRAFT_RESEARCH`
- `DRAFT_CONTENT`
- `REVIEW_REQUIRED`
- `CONTENT_LOCKED`
- `PUBLISHED`
- `STALE_REVIEW`

Only `CONTENT_LOCKED` or `PUBLISHED` content is authoritative for implementation. Earlier drafts are candidates.

## Git + Pages CMS model

Git is source of truth. Pages CMS is a human editor over repository content.

Recommended structure (adapt per project):

```text
src/content/
  pages/
  services/
  cases/
  articles/
  faq/
  people/
  testimonials/
src/data/
  pricing/
  proof/
  settings/
```

Content files should expose semantic fields, not component implementation details.

Good:
```yaml
title: Konverteringsoptimalisering
summary: ...
proofReferences: [case-12]
cta:
  label: Ta en gratis sjekk
  href: /vurdering/
```

Bad:
```yaml
component: PurpleRoundedCardV4
paddingTop: 72
```

## Who can edit

- Strategy/Content Agent may create/update content branches/PRs when repository access allows.
- Human editor may use Pages CMS.
- Implementation Agent may change schema/adapters but should not rewrite locked copy as collateral damage.

## Publication safety

Never publish invented claims, proof, prices, urgency, guarantees, customer names/results or volatile platform facts. Missing proof must remain missing/placeholder in non-production states rather than being fabricated.

## Content change control

A typo/clarity fix that does not alter meaning may proceed without owner approval.
A change to positioning, price, promise, proof meaning, audience or material CTA strategy requires the appropriate decision owner.
