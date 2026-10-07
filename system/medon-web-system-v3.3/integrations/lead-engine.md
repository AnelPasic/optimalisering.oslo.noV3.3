# Medon Lead Engine Integration

## Principle

Lead handling is CMS-independent.

The same lead backend should be usable from:
- Astro Static;
- Astro + Pages CMS;
- Astro + Sanity;
- Concrete CMS;
- Nuxt;
- Shopify/other sources where appropriate.

## Minimum payload

```json
{
  "site": "example.no",
  "form": "contact",
  "name": "Example",
  "email": "example@example.no",
  "phone": "99999999",
  "company": "Example AS",
  "message": "…",
  "page": "/service/",
  "referrer": "…",
  "utm_source": "…",
  "utm_medium": "…",
  "utm_campaign": "…",
  "utm_content": "…",
  "click_ids": {
    "gclid": "…",
    "fbclid": "…"
  }
}
```

Only collect fields actually needed.

## Backend responsibilities

- validation;
- spam protection;
- rate limiting;
- secure storage;
- tenant/site separation;
- notifications;
- audit timestamps;
- status/lifecycle;
- retention/deletion;
- integrations;
- conversion events.

## Suggested lifecycle

```text
NEW
→ CONTACTED
→ QUALIFIED / DISQUALIFIED
→ OFFER
→ WON / LOST
```

Keep loss reason where useful.

## Source of truth

Actual customer and revenue truth belongs in CRM/backend/accounting, not ad-platform conversion totals.

## Security/privacy

- no PII in Git;
- no secret API tokens in frontend;
- use TLS;
- minimize collected data;
- implement retention/deletion;
- restrict customer access to their tenant;
- document processors/subprocessors as required.

## Commercial outcome

Aim to connect:
traffic/source → lead → qualification → offer → won customer → revenue/value.

## Assessments

If an assessment/diagnostic is used, follow `integrations/assessment-funnel.md`. Qualification should improve the user's result and routing, not merely enrich the CRM.
