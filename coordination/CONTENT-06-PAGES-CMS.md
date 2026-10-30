# CONTENT-06 — Native Add / Delete of service and article pages

All service pages are now in **Tjenester → Alle tjenester**. Pages CMS supports Create and Delete in this single collection, including the existing SEO, Synlighet and Lokal SEO pages. No separate `New service pages` menu item remains.

## Create a service page

1. Open **Tjenester → Alle tjenester → Add an entry**.
2. Choose a unique `Page URL slug`, e.g. `roof-cleaning`. The page URL will be `/roof-cleaning/` and the canonical file will be `app/src/content/pages/roof-cleaning.json`.
3. Add genuine SEO metadata, Hero, sections and optional FAQ, then Save. The page kind is fixed to `service`. Astro discovers the new root JSON without extra YAML edits.

## Edit or delete any service

Existing SEO, Synlighet, Lokal SEO, AI-synlighet, Konvertering and Nettbutikkoptimalisering are in the same list and can be edited. **Delete really is enabled for every service in this collection**, not just newly created ones; Pages CMS does not offer per-file exceptions within a collection. Remove inbound navigation, CTAs, PageLists and anchor links before deletion. If the page has traffic, arrange a redirect outside CMS. CI/build detects dangling links; Git history can restore deleted files. Be especially careful with important existing service URLs. Their original content, route, SEO/hero, global references and proof are unchanged by this CMS reorganization.

**Not deletable from Alle tjenester:** Home, Pricing, Contact, legal pages, Insight, About and other fixed or article pages. Their own editors remain protected.

## Create and delete articles

Articles now use **Innsikt → Artikler** for all existing and new articles. The separate `New articles (Add / Delete)` menu has been removed. The three existing article JSON files were moved byte-for-byte to `managed-articles/innsikt-*.json`, preserving slugs and public URLs. Use a slug such as `innsikt/checklist`: CMS stores `managed-articles/innsikt-checklist.json` and Astro routes `/innsikt/checklist/`. Native Delete is available for all articles, so review inbound links and redirects first. Services and fixed pages remain outside this collection.

## Reference and verification notes

Legacy PageList and suggested-URL dropdowns are **pinned to their existing choices** so native Add/Delete does not require editing `.pages.yml`. New services are available immediately in automatic PageLists and via Manual URL; they are intentionally not appended to the old static pickers. After deleting an established service, its old static suggestion may remain, but link/build validation rejects any actual dangling links. Prefer Manual URL for new pages. This is not a new CMS, template engine, status workflow, redirect manager or custom browser UI.

The prior disposable `test-service` page created via authenticated Pages CMS was deleted by OWNER before this regrouping. The existing managed-services folder is retained for backward compatibility with any older nested content, but new service pages are created **only** in the root `Alle tjenester` collection. This change needs a fresh authenticated CMS Add → Save → Edit → Delete acceptance check.
