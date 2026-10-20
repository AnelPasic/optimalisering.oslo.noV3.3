# H-024B3 — Synlighet som tjenestehub med samme CMS-prinsipper som forsiden

**2026-10-20 · D-116 · OWNER DESIGN/CONTENT DIRECTION, implement only /synlighet/ in prelaunch review.**

OWNER: «Synlighet siden bør ha samme struktur som forsiden, da den samler flere tjenester, og kan i grunn være på samme nivå. Så kan vi samle alle synlighets-tjenester under den. Samme med Konvertering etterhvert. Og hero på Synlighet er strukturert annerledes i CMS enn Hero på forsiden, unødvendig. Har nå lagt inn global element nederst, det er faktisk bra. Da kan vi i grunn beholde den valgfriheten hvor vi legger til elementer som ønsket.»

**Important narrow acceptance:** OWNER considers H-024B2's ability to add a global element at the end of the existing native service list **good**. Keep and reuse this behavior. This does NOT automatically approve the entire current service page, legacy proof/pricing injection, or broad scale-out. The new requested architecture supersedes the previous assumption that Synlighet must remain a conventional low-level service detail page.

**Read fresh** project main, coordination/CHATGPT-TO-CODEX.md, PROJECT-STATE.md, REVIEW-QUEUE.md, DECISIONS.md, CODEX-TO-CHATGPT.md, PRELAUNCH-DELIVERY-RULE.md, H024B1/B2 and system repo MedonWebSystem docs/CROSS-THREAD-START-HERE.md, CURRENT-STATE.md, DECISIONS.md. Incoming pilot main when authored: `65d344cfc08c25ed3b4c4f5d4d25ea1dc341acdf` — DO NOT check out an older baseline; preserve any newer OWNER edits. Most recent OWNER CMS Save on `synlighet.json` **added a real global `regneeksempel` placement at the bottom**. It must remain present, in the same order with the same visibility; do not roll back to H-024B2 test-restoration state.

## Agreed information architecture and objective

- **`/synlighet/` = first-class commercial hub / parent for visibility offerings**, comparable in commercial weight and coherent CMS experience to the homepage, but with *its own SEO intent, headline, content and CTA*. NOT a copy of the homepage and not a new domain.
- Its three child topics: **SEO**, **Lokal SEO**, **AI-synlighet**. Existing public routes **`/seo/`** and **`/ai-synlighet/`** are retained, with existing internal links from the `kanaler` content. Lokal SEO currently has no approved dedicated URL; keep as a genuine, editable hub subsection/card for now. **Do not invent/publish a new local-SEO route or change URL hierarchy, redirects, navigation globally, canonical or existing pages without separate authorization.** Consider an eventual link/breadcrumb/nav hierarchy as a follow-up proposal, not an automatic change to sibling routes.
- Later, **`/konvertering/` could receive the same parent/hub editing model**, but this H-024B3 only modifies Synlighet. Do not roll out, reauthor or restructure Konvertering, SEO, AI-synlighet or e-commerce routes.
- Keep the approved Synlighet H1 **«De søker etter løsningen. Så etter deg.»**, existing intro, service image, case/proof/price facts, CTA and links; do not improvise new headline/copy/claimed results to make it feel like a homepage.

## Same CMS model — ONE hero, ONE flexible ordered section list

### 1. Hero: match the *actual homepage's editing structure*

Current mismatch (verified): `home.json.hero` contains `layout, eyebrow, title, support, primaryCta, secondaryCta, visual` in **one** object and Pages CMS shows all Hero fields inside it. `synlighet.json.hero` currently contains only `layout`; `eyebrow`, `title`, `intro`, `cta` and `heroVisual` are separate *top-level* fields. The live renderer is already the common `CommercialHero` projected via `resolvePageHero`; this is primarily a **data/CMS-editor** inconsistency, not a justification for new hero components.

**Deliver:** In `Pages CMS → Tjenester → Synlighet` render exactly **one logically grouped «Hero» editor** with the same fields and order as `Forside → Hero`:
`Oppsett / Overtekst / Hovedoverskrift / Ingress / Primær handling / Sekundær handling / Bilde og utsnitt`. Use the **same approved CMS field labels, types, choices, shared schema/primitive definitions wherever safe**. No separate extra editable copies elsewhere in Synlighet's CMS entry. A service-specific image can be `kind:illustration` and `/images/services/discoveringlocalfavorite-1.png` with alt `Bli funnet`; the homepage's image schema is more restrictive (`/images/home/*.webp`, no service alt) so **do not blindly apply the homepage image regex or migrate/recompress image just to match a data type**. Model the shared *hero logical shape and editor fields* safely with existing actual service image and cropping.

- Migrate `synlighet.json` **losslessly** to one authoritative nested hero source (or an equivalent canonical shape that actually removes split CMS authority); existing public Hero text, two CTAs (existing primary `/#sjekk`, secondary pricing link currently derived from route), breadcrumb, media, alt, X/Y, layout and responsive geometry remain identical until OWNER requests a visual change. Do not duplicate secondary CTA via both route derivation and edited hero field; define exactly one authority and keep correct link destinations.
- `resolvePageHero` and content schema must read the new Synlighet variant while **all other pages retain their existing format/behavior**. If legacy top-level fields still must exist for other data consumers, document them as non-editor-derived compatibility projections; NO two editable truth sources on Synlighet. Do not introduce a second hero renderer or change the global theme.
- Protect against partial CMS saves losing image/copy/CTA by making migration idempotent, checking latest file blob, focused form roundtrip fixture (CMS Save simulation or one minimal real Save if needed), and exact semantic before/after render parity. Prefer minimal shared primitive extraction over redundant duplicated form structures.
- Show Hero at top of Synlighet editor in coherent order, not interleaved between unrelated SEO fields, and verify a fresh native editor read: **one Hero group**. The homepage's CMS Hero and other service Hero formats are untouched.

### 2. Keep the already successful native mixed section builder

Current Synlighet `sections` contains five existing local/protected sections plus the OWNER's newest **`{_block:"global",element:"regneeksempel"}` at the end**. Preserve it byte-semantically and in the exact final position. Continue to allow Add/Move/Hide/Remove for ordinary local and allowed global references using existing `serviceGlobalPlacement` / `getGlobalElement` and proof permission/anchor guards.

**Use the same core CMS principle as the homepage**, without necessarily copying its *three lists* Topp/Hoved/Bunn: Hero first, **one direct sortable ordered mixed-content list** is cleaner on the hub since OWNER has just confirmed liking it. Do not invent separate reference-order registries, shadow copies, numerical ordering, new CMS or repeated bespoke styling. Keep named Globalt element selector and the existing five safe choices; adding `sjekk/priser/sporsmal` is NOT authorized unless duplication/anchor/data controls can be proved safe and OWNER approves specific behavior.

**Make existing auto-inserted sections legible in the editor.** The local proof currently comes from `synlighet.json.proof` and is auto inserted after `prioritering`. The `ServicePricingBridge` is auto inserted after `sammenheng`; FAQ is read from local `faq`. Do not silently switch master or move these during Hero migration. Include concise **clear native CMS labels/help showing source and placement**. The end-goal is page-level editor transparency; if making these three into ordinary movable typed placements is small and safe, propose a precise plan with parity/gates before doing it. **Do not accidentally create doubled proof, prices, FAQ or assessment; preserve H-024B2 global-proof precedence.** Do not treat publicationApproved as a layout toggle.

### 3. Hub presentation, not a homepage clone

Preserve H1/title, existing child-topic card semantics, current package/proof content, typography/daisyUI primitives, and approved layout. Make the **three topic pillars** unmistakably positioned as the Synlighet hub's child offerings. Reuse currently present `kanaler` three-card content and links. SEO and AI-synlighet already have existing URLs; Lokal SEO should be a clear real service area but not linked to an invented route. Use only minimal tweaks within Synlighet where clarity or navigation actually requires them. Distinguish the hub from a detail SEO page without duplicating its full content; include no false promises, claims or invented prices. The intent is an equal-quality commercial entry point and modular CMS editing, **not copying all sections/phrases from homepage**. Do not change the user-approved blocks' current order or insert the global content on OWNER's behalf.

## Scope & proof/preservation

- No changes to `home.json`, other pages, eight global master records, actual OWNER-selected `resultater.json` `mediaCards`/media/crops, `priser.json` price/copy, or the five local OWNER PNGs except incidental source reads. No screenshots test-fixture reversion.
- Preserve service-local Helt Opplagt proof unless OWNER chooses global resultater; global proof is one module, not two, and case values/provenance remain locked. Preserve current `#sjekk`, `/#sjekk`, `#priser`/link semantics, FAQ and disabled intake.
- Preserve other service pages and their traditional flat-hero editors **until** separately scoped work. Any common source changes must be type-discriminated; test old paths.
- No public launch/indexability, production domain, form POST, new service route, new pricing, consent or proof publication. Keep original noindex review Worker.

## Execution and evidence after D-107 — proportionate to actual schema risk

1. Snapshot current main and inspect active CMS content/diff, especially latest Synlighet OWNER calculator placement. If content changed during work, reconcile; STOP rather than blindly overwriting.
2. Implement the **unified Hero schema + Pages CMS UX** and preserve the existing mixed sections and hub hierarchy. Don't redesign all sections or create a general page-builder framework.
3. Because this includes a **real CMS data-model migration**, run focused schema/hero/CMS form-roundtrip/links/section builder tests and a build, plus one 1440 desktop and 390 mobile check for HERO visual/CTA/image and bottom calculator behavior, against incoming preview. Check homepage and Konvertering for no regression. Do not demand a giant screenshot archive or 158/196 full suite.
4. A single **real Pages CMS read/edit/save/restore** may be needed to prove one nested Hero field survives Git→native Cloudflare→Worker. Do not restore the full Synlighet page or OWNER-added calculator; only revert your specific test field after fresh Git check. Never claim real CMS PASS if only simulated.
5. Commit/deploy promptly to existing `https://optimalisering-oslo-v33.anel.workers.dev/synlighet/` review Worker. Confirm native deployment and actual page before claiming delivery. Short receipt in `coordination/CODEX-TO-CHATGPT.md`, project status/review queue; list exactly changed files, migration treatment, user-owned calculator preserved, and true test results.
6. STOP for OWNER **Hero editor + hub presentation** visual/functional review before applying this to Konvertering or other service pages. New OWNER feedback controls follow-up.

**Acceptance:** The CMS user edits **one Hero object with the same field experience as the homepage**; creates/reorders/hides local and global sections in one native list; the OWNER's newest bottom global calculator remains; Synlighet is clearly the visibility hub; the reviewed front-end has not silently changed unrelated material or added duplicate marketing/proof modules.
