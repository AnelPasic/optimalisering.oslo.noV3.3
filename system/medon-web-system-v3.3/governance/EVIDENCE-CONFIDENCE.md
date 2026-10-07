# Evidence & Recommendation Confidence

A recommendation should say not only **what** the system believes, but **why**.

## Evidence types

- `FIRST_PARTY_DATA`
- `FIRST_PARTY_CUSTOMER_LANGUAGE`
- `OWNER_CONFIRMED`
- `OFFICIAL_PLATFORM_GUIDANCE`
- `REPLICATED_EXTERNAL_DATA`
- `CASE_STUDY`
- `EXPERIMENT`
- `OBSERVATION`
- `HEURISTIC`
- `HYPOTHESIS`

## Recommendation confidence

Use `HIGH`, `MEDIUM`, `LOW`, or `EXPERIMENTAL`.

Example:

```text
Recommendation: expose the orphaned service page via contextual internal links.
Confidence: HIGH
Evidence: crawl graph + official crawlability principles.
```

versus:

```text
Recommendation: test a shorter H2.
Confidence: EXPERIMENTAL
Evidence: page-specific scan friction; no universal short-heading rule.
```

## Volatile rules

External platform facts should carry:
- source;
- checked date;
- scope;
- caveat;
- recheck trigger/date where practical.

Stable principles such as “do not fabricate proof” do not need periodic platform verification.

## Conflict resolver

When sources disagree, do not automatically choose the loudest source. Identify whether they address different layers: public guidance, mechanism evidence, external dataset, first-party result or hypothesis.
