# CONTENT-06 — Add or delete pages in stock Pages CMS

**Only new controls are in English.** Existing navigation groups and all existing published page editors are unchanged. Every saved page is live content: no draft or review statuses.

## Create a service page
1. Pages CMS → **Tjenester** → **New service pages (Add / Delete)** → **Create**. Enter a unique lowercase URL slug (for example `roof-cleaning`). Public URL becomes `/roof-cleaning/`.
2. Fill the existing **SEO**, **Hero**, **Sections** and optional FAQ fields. Provide meaningful customer-ready content before saving. `kind: service` is automatic and fixed; no source editing or new CMS schema file.
3. Save to Git. The normal Astro build discovers the page and adds it to the sitemap. The automatic PageList for services includes it. For manual links, paste `/roof-cleaning/` in the existing Manual URL field.

## Create an article
Pages CMS → **Innsikt** → **New articles (Add / Delete)** → Create. Use a slug such as `innsikt/checklist`; public URL is `/innsikt/checklist/`. The CMS stores a flattened `innsikt-checklist.json` filename inside its isolated collection, and `kind: article` is fixed. As with services, complete the current SEO, Hero and Sections editors, then save.

## Delete a page
Only pages created in these two dedicated collections have **Delete** enabled. Open the entry → Delete. **Before deletion**, remove all internal navigation links, CTAs, manually selected PageList references and page anchors pointing to it. The normal site build/QA fails on broken rendered links; deleting does not automatically rewrite others' content. If a deleted page has search traffic, plan its redirect separately; there is no automatic redirect or SEO-preserving migration. Use Git history to restore an accidentally removed managed JSON file.

**Existing pages are intentionally protected** (Home, Pricing, Contact, SEO, legal and other pre-existing routes). Do not copy them into the deletable collection or bypass the protections. Ask a developer to retire a core page and handle its backlinks/redirects.

## Why no manual YAML sync?

The pre-existing PageList and suggested-URL select choices are generated from the fixed root page files only. Managed pages are in separate folders, so creating/deleting them does not invalidate these check-in-time lists. **Automatic** PageList queries and Astro routes/sitemap discover new managed JSON automatically. A newly created managed page **will not appear in legacy static dropdown options**; the existing Manual URL input remains available. Native references covering all dynamic pages require a future CMS-native option rather than a parallel custom tool.

**Verification:** CMS configuration and source fixtures plus Astro build, link audit, GitHub CI. This does not claim an authenticated Pages CMS Create/Delete round-trip or automatic redirect.
