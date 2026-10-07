# Source of Truth & Evidence Hierarchy

## Purpose

Prevent plausible-but-false copy and stop agents from silently reconciling conflicting sources.

## Evidence hierarchy

When sources disagree:

1. user's latest explicit correction;
2. signed/current business documents or verified first-party systems;
3. client-confirmed facts;
4. `PRODUCT-MARKETING.md`;
5. current live business properties where reliable;
6. authoritative third-party/current public sources;
7. competitor claims;
8. model inference.

Do not “average” conflicting facts.

## Claim states

Use these internally:

| State | Meaning | Can publish? |
|---|---|---|
| `VERIFIED_FIRST_PARTY` | supported by current first-party evidence | Yes |
| `VERIFIED_EXTERNAL` | supported by authoritative external source | Yes, cite where appropriate |
| `CLIENT_CONFIRMED` | explicitly confirmed by owner/client | Yes only when the confirmer has authority and any naming/metric/privacy permission needed for that use is resolved |
| `OBSERVED` | directly observed but not independently validated | Only as a scoped observation; not silently upgraded to performance/current truth |
| `INFERENCE` | reasoned conclusion, not a verified fact | Only when clearly framed |
| `UNKNOWN` | unresolved | No |

## Current facts

Time-sensitive claims must be verified at implementation time.

Examples:
- ad platform availability;
- pricing;
- regulations;
- current service coverage;
- opening hours;
- software capabilities;
- partnerships/certifications.

## Missing evidence

Never fill missing proof with:
- generic benchmark numbers;
- fake case data;
- invented customers;
- fabricated testimonials;
- implied certifications;
- fake ratings;
- made-up time-to-result claims.

Instead mark the missing proof in the Page Brief / Proof Registry and write a credible alternative. Performance claims may also require separate wording/review and publication-permission states even when the underlying fact is owner-confirmed.

## Source capture

For material claims, record:
- exact claim;
- source;
- date checked;
- confidence/state;
- pages where it may be used;
- expiry/recheck date for volatile claims.
