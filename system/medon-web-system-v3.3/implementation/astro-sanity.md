# Implementation Profile — Astro + Sanity

## Use when

The editorial benefit is real:
- frequent client editing;
- visual editing;
- crop/hotspot;
- reusable structured entities;
- richer references;
- draft/release workflow;
- multi-editor content.

## Production model

Prefer:

```text
Sanity Content Lake
→ Astro build
→ static HTML
→ Cloudflare / cPanel / static host
```

Do not turn normal public pages into SSR solely because Sanity is used.

## Preview

If full visual editing needs server-rendered preview:
- keep production static;
- isolate preview runtime;
- do not make public production depend on preview infrastructure.

## Content modeling

Map Sanity schemas to `content-model.md`.

Frontend should consume normalized domain objects rather than raw CMS-specific response shapes.

## Images

Enable hotspot/crop for editorial images where it adds value.

Use responsive image URLs/sizes and preserve dimensions to avoid layout shift.

## Roles/cost

At project start, verify current Sanity plans/roles from official docs. Do not hardcode old plan assumptions into customer promises.

## Leads / PII

Sanity is a content system, not the default CRM.

Do not place customer submissions into a public dataset.

Prefer the shared Medon Lead Engine or a dedicated private lead system.

## cPanel

Static production works well on cPanel.

Sanity Studio may be hosted separately or self-hosted as static SPA where appropriate.

Build/deploy in CI instead of maintaining Node processes on ordinary cPanel hosting.
