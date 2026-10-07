# Fun Facts / Fact & Insight Blocks

## Purpose

Use short verified facts to make a page more memorable, useful and specific. This is especially relevant for Medon-owned topical sites, campaign sites and educational/authority pages such as product/category explainers.

A "fun fact" is **not decorative trivia**. It should do at least one useful job:

- explain why the topic matters;
- make an abstract concept concrete;
- reveal a surprising constraint, behavior or market fact;
- support a decision or comparison;
- add a verifiable piece of information competitors are not presenting clearly;
- create a natural bridge to deeper content or a CTA.

## When to use

Use more freely on:
- Medon-owned topical/authority properties;
- campaign/minisite explainers;
- data-led service pages;
- guides/comparisons;
- pages where surprising current facts help the visitor understand a new market or technology.

Use more conservatively on customer sites. A customer site does **not** need a "Fun facts" section just because the component exists. Include a fact only when it supports the customer's message, proof, education or decision journey.

## Quality rule

A fact must pass all four tests:

1. **True** — supported by an identifiable source or first-party evidence.
2. **Relevant** — useful to this page and this audience.
3. **Specific** — not generic filler.
4. **Interpreted** — where useful, explain *why it matters* rather than dumping a statistic.

Bad:
> Fun fact: AI is changing marketing quickly.

Better:
> FACT: [verified current fact].
> **Why it matters:** [specific consequence for this visitor].

## Fact types

Useful types include:

- `first_party_fact` — internal/customer/business data that can be documented;
- `authoritative_external_fact` — government, platform documentation, research, standards or other strong source;
- `current_platform_fact` — current product/platform capability or availability;
- `market_fact` — market/search/behavior data with clear scope and source;
- `historical_fact` — stable background context;
- `myth_buster` — a common misconception corrected with evidence;
- `comparison_fact` — a concrete distinction between options/mechanisms.

## Fact schema

Store enough provenance that the fact can be rechecked later.

```yaml
id: fact-001
type: authoritative_external_fact
statement: "..."
context: "..."
whyItMatters: "..."
sourceName: "..."
sourceUrl: "..."
sourceRef: "..."
checkedAt: 2026-10-02
recheckAfter: 2026-11-02
volatility: high # low | medium | high
timeframe: "..."
geography: "..."
populationOrSample: "..."
relatedEntities: []
relatedPages: []
status: VERIFIED_EXTERNAL
```

Use only the fields that make sense, but `statement`, evidence/source, `checkedAt`, `volatility` and verification status should be explicit for material facts.

## Volatility

### Low
Stable historical/technical fact. Recheck only when context changes.

### Medium
Market/research fact that can age. Recheck periodically or before major reuse.

### High
Platform availability, price, policy, market share, product capability, ad format, limits, current statistics or anything likely to change. Verify from a current authoritative source immediately before publication/republication.

## Do not confuse external facts with customer proof

A third-party market statistic does **not** prove that a specific client delivers that outcome.

Bad inference:
> Industry research says conversion optimization can improve results, therefore this client increases conversion by X%.

Allowed:
> Industry research gives context. Client-specific claims still require client-specific evidence.

## Presentation patterns

Possible UI labels:
- `Visste du at?`
- `Kort fortalt`
- `Fakta`
- `Dette er verdt å vite`
- `Fun fact` when the brand/site tone supports English/informal wording.

Possible formats:
- one inline fact beside the relevant paragraph;
- 2–4 fact cards in an educational section;
- a myth/fact comparison;
- a number + short explanation;
- a sourced timeline fact.

Avoid dumping ten unrelated stats into a carousel.

## SEO/AIO stance

Facts can contribute to information gain, specificity and citation-worthiness, but they are **not an SEO trick** and do not guarantee indexing/ranking/AI citation.

Prefer:
- primary/original sources;
- first-party data;
- precise scope and dates;
- short quotable/extractable statements;
- a useful interpretation.

Do not manufacture surprising numbers merely to make a page feel unique.

## Workflow

During research, collect candidate facts in the Page Brief. Before publication:

1. verify source;
2. capture date/scope;
3. classify volatility;
4. decide whether the fact materially improves the page;
5. write the human-readable fact;
6. add "why it matters" when the connection is not obvious;
7. set a recheck date for volatile facts.

## Final test

Delete the fact if removing it would not reduce understanding, credibility, memorability or decision usefulness.
