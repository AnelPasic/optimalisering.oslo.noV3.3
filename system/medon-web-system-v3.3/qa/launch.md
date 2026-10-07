# Launch QA — Visually Complete Is Not Launch Ready

## Release blockers

Do not release while any applicable P0 remains unresolved: non-working lead delivery, missing primary conversion tracking, production placeholders/unapproved proof, unresolved redirects/canonical migration, accidental index controls, missing privacy/consent behavior, unknown deployment ownership or broken critical path.

## Before DNS/go-live

- [ ] production build verified;
- [ ] desktop/mobile visual review;
- [ ] core-design consistency preserved;
- [ ] forms work end-to-end;
- [ ] lead appears in correct backend/notifications;
- [ ] conversion event fires;
- [ ] source/UTM survives into lead record where intended;
- [ ] privacy/consent matches actual trackers;
- [ ] title/meta/canonical;
- [ ] sitemap/robots;
- [ ] schema validation where relevant;
- [ ] redirects;
- [ ] 404;
- [ ] favicon/OG;
- [ ] contact/legal details;
- [ ] no placeholder/fake proof;
- [ ] no staging URLs;
- [ ] no accidental noindex.

## Search setup

Where appropriate:
- Search Console;
- Bing Webmaster;
- sitemap submission;
- analytics baseline.

## After launch

Within the agreed review window inspect:
- crawling/indexation;
- real queries;
- conversion path;
- lead quality;
- technical errors;
- performance field data when enough exists.

Do not publish thirty more pages before checking whether the first batch is healthy.
