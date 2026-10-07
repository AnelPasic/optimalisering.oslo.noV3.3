# BLUEPRINT — Medon Commercial Website Growth System v3.3

## Mission

Research, plan, design, build and operate Norwegian/Nordic commercial websites that create **qualified customers and measurable business value** — not merely prettier pages, rankings, traffic or raw form fills.

## Package boundary

This file and the rest of **Medon Web System v3.3** are the complete canonical system for general Medon web work.

Do not ask for an older external Commercial Website Growth System, Medon Web System v3.x or reference library. Project-specific files may override this package only when they are explicit, current and authoritative for that project.

## Authority order

When instructions conflict:

1. user's latest explicit instruction;
2. verified project/business facts;
3. project `PRODUCT-MARKETING.md`;
4. `source-of-truth.md`;
5. project legal/compliance constraints;
6. this `BLUEPRINT.md`;
7. `content/content-copy-standard.md`;
8. approved project message/design direction;
9. selected implementation profile;
10. approved implementation plan.

Truth beats persuasion. A template never overrides verified facts.

## Project modes

### Greenfield
Use `START-NEW-PROJECT.md`.

### Existing production site
Use `START-EXISTING-PROJECT.md`.

### Landing page / campaign
Use the greenfield sequence but begin with traffic source, awareness level, one page job and offer.

### Small scoped task
Use `SiteGrowthSKILL.md` as the router and load only task-relevant references.



## Workflow profiles

Use `FAST`, `STANDARD`, `ADVANCED` or `EXISTING_SITE` from `governance/PROJECT-PROFILES.md`. Rigor should scale with project risk/complexity; do not force every routed rule into every small site.

## Technical Preflight

Before production implementation, resolve framework/CMS/repository/hosting/deployment/runtime/leads/environments/domain ownership/data ownership. Use `technical/TECHNICAL-PREFLIGHT.md`. A new coded project should use the intended Git repository from the first meaningful implementation commit.

## Search + conversion duality

For important commercial search-facing pages:

```text
BE FOUND → BE UNDERSTOOD → BE BELIEVED → BE CHOSEN
```

SEO/AIO and CRO are parallel commercial gates. A severe failure in one cannot be averaged away by strength in the other.

## Decision locks

Approved upstream decisions are immutable until explicitly reopened with evidence. Later implementation/design phases must not silently rewrite message, page architecture, typography, palette or technical foundation. See `governance/DECISION-LOCKS.md`.

## Evaluation model

Use hard validity gates before weighted scoring. Use artifact-specific weights and minimum floors; never rely on one universal 0–100 quality score. Red Team reviews independently and does not silently edit. See `governance/SCORING-GATES.md` and `qa/RED-TEAM.md`.

## Production ownership

The system separates commercial/content judgment from repo implementation. See `governance/ROLE-OWNERSHIP.md`. A coding agent does not gain authority to invent production positioning, pricing, proof or copy merely because it can edit the repository.

## Canonical sequence

```text
Project/profile + Technical Preflight
→ commercial truth / offer
→ Search + AIO + Page Portfolio
→ complete-page content production + content lock
→ CRO / information architecture
→ visual brief + controlled visual system
→ representative full page
→ implementation against locked content/design
→ independent Red Team + launch QA
→ launch / measure / learn
```

Internal artifacts such as Headline Lab, Value Equation, Certainty Gap, Heading-Only Story, Persuasion Sequence and Section Contracts are tools, not automatic owner gates.

## Research quality gate

For material conclusions assess:

```text
frequency × intensity
segment
recency
confidence
source bias
contradiction
alternative explanation
```

Ask: **What evidence would prove this wrong?**

Prefer first-party truth over category folklore.

## Business constraint

Before prescribing more traffic, identify the actual limiting factor:

- demand constrained;
- offer constrained;
- conversion constrained;
- sales/follow-up constrained;
- retention constrained;
- supply/capacity constrained;
- measurement constrained.

Do not optimize the wrong bottleneck.

## JTBD + switching forces

Map when commercially relevant:

```text
Functional job
Emotional job
Social/identity job

PUSH — why leave current state
PULL — why choose new state
HABIT — why stay/do nothing
ANXIETY — why switching feels risky
```

Do this before final offer/copy.

## Commercial lock

Before visual design, lock:

### Services
- primary;
- secondary;
- supporting;
- do-not-promote-yet.

### Offer
Use:

```text
Constraint
→ Dream Outcome
→ Perceived Likelihood
→ Time Delay
→ Effort / Sacrifice
→ obstacles
→ solutions / vehicles
→ Minimum Path to Value
→ package structure
→ price logic
→ risk reduction where real
```

Hormozi is a **mechanics layer**, not a tone template.

### Pricing
Treat separately:

```text
Packaging
Pricing metric
Price point
```

Use actual deal evidence first. If final prices are unknown, propose structure but do not invent final prices.

Pricing should be machine-readable enough to extract:
- tiers;
- prices;
- inclusions;
- limits;
- external costs;
- fit.

### Minimum Path to Value
For services/products with onboarding:

```text
Yes
→ minimum required input
→ first value-producing action
→ proof the decision was good
→ deeper implementation
→ result
```

Reduce the path before adding onboarding content.

## Conversion mechanism

Use:

```text
Traffic awareness
→ direct CTA OR useful mini-offer / assessment
→ qualification
→ value delivery
→ next CTA
→ follow-up
→ qualified lead
→ customer/value
```

Do not force a lead magnet when high-intent users are ready to buy/call/book. Do not force a hard sales CTA on cold traffic when a useful lower-friction step is clearly better.

Assessment results should deliver value before asking for the sale. Route next steps by fit where useful.

## One page job

Every important page should have one primary job/decision. Secondary actions may exist, but must not compete at equal visual weight without a reason.

## Message before design

Before visual design of the homepage/core landing page define:

- primary audience and awareness;
- page's one job;
- Dream Outcome / customer consequence;
- core promise;
- differentiators;
- proof;
- objections / FUDs;
- primary CTA and what happens next;
- key value propositions;
- process/how-it-works message;
- closing argument / second decision point.

Use `content/PAGE-CONTRACT.md`, `content/VALUE-EQUATION-MAP.md`, `content/CERTAINTY-GAP.md`, `proof/PROOF-ROUTER.md`, `content/HEADLINE-LAB.md`, `content/HEADING-ONLY-STORY.md`, `content/PERSUASION-SEQUENCE.md` and `content/SECTION-CONTRACT.md` as routed.

Design expresses the argument. It must not invent the sales argument after layout is chosen.

## CRO wireframe before visual design

Before brand styling, pass the SEO/AIO + CRO dual gate and approve a grayscale browser-rendered wireframe using real copy, proof state, desktop and mobile.

## Core design gate

After CRO structure and sequential visual decisions are approved, build only these first:

1. top navigation;
2. hero;
3. primary contact/assessment flow;
4. package selector if relevant;
5. footer;
6. representative mobile state.

Stop for approval before mass-producing the rest of the site.

## Nordic filter

Prefer:
- calm confidence;
- concrete claims;
- transparency;
- visible proof;
- direct language;
- restrained visual hierarchy;
- easy next steps.

Never fabricate:
- urgency;
- scarcity;
- ratings;
- reviews;
- clients;
- partnerships;
- guarantees;
- savings;
- results;
- benchmark numbers.

## Content quality

Important pages require a Page Brief before production copy.

A page should add information worth keeping, not just wording variation.

Ask:

> What useful information would be missing from this website/search result if this page did not exist?

And:

> Is there at least one meaningful part of this page that only this business, expert or data source could credibly produce?

Changing only city, keyword, synonyms, examples or paragraph order is not information gain.

## First-party evidence

Prioritize:
- customer conversations;
- support/sales emails;
- Search Console / GBP / analytics;
- internal data;
- cases/results;
- actual process detail;
- real photos/video;
- pricing/operational constraints;
- reviews and objections.

Use the Proof Registry and Fact Registry where material.

## Facts / insights

On Medon-owned topical/authority sites, actively look for verified facts/insights that improve understanding, credibility, memorability or decision usefulness.

A fun fact is not decorative trivia. Current/high-volatility facts must be reverified before publication.

## SEO / Local SEO / AIO

Search success is not complete without conversion success.

Core rules:
- match real intent;
- strengthen entity clarity;
- build crawlable static content where practical;
- create non-redundant useful content;
- align GBP and website where Local SEO is relevant;
- use structured data only when valid/relevant and matching visible truth;
- use internal linking to clarify relationships;
- distinguish physical locations from service-area pages;
- research AI retrieval/source landscapes for important AIO topics;
- use query fan-out as research coverage, not as a URL factory;
- build verifiable cross-channel consistency, never fabricated consensus.

Do not claim special “AI schema”, guaranteed AI recommendations, or experimental files as mandatory ranking mechanisms.

## Needs Met vs Page Quality

Evaluate separately:

1. **Page Quality:** effort, originality, skill/experience, accuracy, credibility.
2. **Needs Met:** does this actually solve the user's query/job directly?

A beautiful, detailed page can still be the wrong answer.

When a tool/calculator/assessment/configurator solves the job better than another article, consider building the tool.

## Local SEO

Mirror the real business, not a keyword matrix.

A real location can justify a location page. A service-area page must earn its URL with genuine local/service/business information value.

Do not create artificial city × service matrices with interchangeable copy.

## CRO

CRO starts with diagnosis, not redesign.

Where data exists combine:
- quantitative funnel/landing/device data;
- behavioral evidence such as recordings/heatmaps;
- qualitative evidence such as surveys, interviews, reviews and user tests.

Form hypotheses as:

> If we do X, we expect Y, because evidence A/B/C indicates Z.

Define primary KPI and relevant guardrails.

Test rigor must match traffic reality.

## Leads and attribution

Lead handling is CMS-independent.

Never store lead PII in Git. Do not use a public content dataset as CRM.

Canonical truth for actual customer/revenue outcomes:

```text
CRM / backend / accounting
```

Use attribution lenses:
- UTMs;
- analytics;
- ad-platform IDs;
- landing page;
- self-reported attribution;
- CRM/backend outcomes.

Never add platform conversion counts together and call them customers.

## Architecture decision

Select the least complex verified fit:

- Astro Static;
- Astro + Pages CMS;
- Astro + Sanity;
- Nuxt 4.

See `architecture-decision.md`.

Future hypothetical requirements are not current requirements.

## Website as a system

Launch is the start of the feedback loop.

Monitor as relevant:
- factual freshness;
- proof freshness;
- forms/conversion flows;
- integrations;
- technical health;
- Search Console/indexation;
- Local visibility;
- AI/search visibility;
- lead quality;
- revenue/value.

Stop scaling a content template if its indexation/quality/performance materially degrades until the cause is understood.

## Marketing loops

A recurring loop must define:

```text
cadence
trigger / acts when
purpose
inputs
body
self-check
state / idempotency
stop / bail-out
output
```

No state + no stopping condition = do not automate.

## Existing sites

A newer stack is not a migration reason.

Use:

```text
KEEP / FIX / TEST / MISSING / UNKNOWN
```

Preserve working URLs, analytics, proof and conversion paths unless change is deliberate and justified.

## Delivery discipline

Work in narrow coherent batches. Do not combine copy rewrite, full redesign, URL migration, analytics changes, schema work and infrastructure refactor in one pass unless they are inseparable.

One coherent hypothesis/batch → verify → continue.

## Definition of done

A commercial website is not done when it renders.

Done requires:
- commercial clarity;
- factual integrity;
- approved message/design direction;
- working conversion path;
- measurable conversion events;
- crawlability/indexability decisions;
- mobile/accessibility sanity;
- production build/deploy verification;
- post-launch owner/feedback loop.
