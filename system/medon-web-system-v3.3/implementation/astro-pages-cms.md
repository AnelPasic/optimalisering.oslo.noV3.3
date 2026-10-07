# Implementation Profile — Astro + Pages CMS — v3.3

## Use when
- Medon/client needs simple editing;
- Git should remain source of truth;
- content-led site without Sanity-level editorial complexity.

## Ownership model
- Strategy/Content role owns commercial content meaning.
- Pages CMS gives humans a usable editor.
- Implementation agent owns schemas/adapters/components.
- Git history/PRs provide revision/review.

Pages CMS does **not** make the implementation agent the content strategist.

## Content architecture
Use structured Markdown/YAML/JSON compatible with Astro Content Collections.
Suggested semantic groups: pages, services, cases, articles, FAQ, people, testimonials, pricing/proof/settings as needed.

Do not build a free-form page builder simply because blocks are possible.

## CMS fields
Use human labels. Hide/lock dangerous technical fields when possible.
Do not expose component names/padding tokens as business content.

## Images
Store media where Astro can process it. Define formats/folders/naming and responsive generation. Pages CMS is not a crop/hotspot DAM.

## Leads / PII
Never store submissions/personal leads in Git. Use the lead backend.

## Deploy
edit/merge → Git commit → build → static deploy.

For cPanel: build in CI and upload `/dist`; do not depend on Node production runtime.

## Content handoff
Implementation must render `CONTENT_LOCKED` content faithfully. If locked content and hard-coded fallback conflict, remove/update the fallback rather than silently overriding content.
