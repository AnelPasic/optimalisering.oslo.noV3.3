# CRO Diagnosis Before Major Redesign

Use for existing sites/flows with enough data to learn from.

## Rule

CRO starts with diagnosis, not redesign.

## 1. Baseline

Capture where available:
- visitor/session volume;
- primary conversion rate;
- lead/purchase rate;
- lead/revenue value per visitor;
- funnel-step rates;
- device split;
- traffic-source mix.

## 2. Locate the leak

Lead-gen example:
`landing → CTA interaction → form start → submit → booked meeting → qualified opportunity → customer`

Ecommerce example:
`session → product view → add to cart → checkout → purchase`

Prioritize the largest commercially meaningful leak, not the easiest visual issue.

## 3. Evidence stack

Where available combine:
- quantitative: analytics/funnel/events;
- behavioral: recordings, heatmaps, dead/rage clicks, scroll exposure;
- qualitative: surveys, interviews, reviews, user testing, sales/support language.

Quant often says **where**. Qual helps explain **why**.

## 4. Segment

At minimum compare mobile vs desktop when volume permits. Consider source/new-vs-returning/landing page where relevant.

## 5. Hypothesis

Use:
`If we change X, we expect Y, because evidence A/B/C indicates Z.`

Define:
- primary KPI;
- guardrail metrics;
- target segment;
- success/failure/inconclusive criteria.

## 6. Match rigor to traffic

- high traffic/conversions → controlled A/B tests where appropriate;
- medium traffic → fewer/larger hypotheses and longer windows;
- low traffic → heuristic QA + user testing/session evidence + before/after measurement.

Do not force weekly split tests onto low-volume SMB sites.
