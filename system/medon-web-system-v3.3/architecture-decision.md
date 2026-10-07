# Architecture Decision — after Technical Preflight

Complete this after high-level requirements and `technical/TECHNICAL-PREFLIGHT.md` are sufficiently known, and before production implementation.

## Decision principle

Choose the least complex architecture that satisfies verified current requirements.

## Profile A — Astro Static

Choose when:
- site is mostly 1–10-ish commercial/content pages;
- Medon handles edits;
- content changes infrequently;
- no client CMS is required.

Do not add a CMS “for later”.

## Profile B — Astro + Pages CMS

Default for many SMB sites when:
- client/Medon needs simple content editing;
- Git should remain source of truth;
- content relations are modest;
- there is no need for rich editorial workflow or true in-context editing.

Strengths:
- simple;
- Git-native history;
- easy Codex workflow;
- low lock-in;
- static output.

Trade-offs:
- weaker visual editing;
- crop/hotspot workflow is not Sanity-class;
- lead inbox must remain separate.

## Profile C — Astro + Sanity

Choose when one or more provide real value:
- client edits actively;
- visual editing matters;
- image crop/hotspot matters;
- richer reusable entities/relations;
- drafts/release workflow;
- multiple editors;
- content reused across channels.

Production should still be static/prerendered unless runtime behavior is actually required.

Do not use Sanity as the default lead CRM. Keep PII in a proper lead backend/private system.

## Profile D — Nuxt 4

Choose when the project is primarily application-like:
- authentication;
- dashboard/portal;
- persistent user state;
- complex search/filter;
- account-specific data;
- workflow;
- app-level interactivity.

Do not use Nuxt merely because it can also generate static pages.

## Decision record

```text
Project:
Date:

Verified requirements:
-

Chosen profile:

Why:

Rejected profiles:
- Astro Static:
- Astro + Pages CMS:
- Astro + Sanity:
- Nuxt 4:

Runtime required?
Yes / No

CMS required?
Yes / No

Client edits?
None / occasional / frequent

Expected content scale:

Lead backend:

Deployment target:

Known migration constraints:
```


## Repository/deploy dependency

Architecture is not fully locked until repository ownership, hosting, deploy method, runtime requirement and lead backend are recorded in Technical Preflight.
