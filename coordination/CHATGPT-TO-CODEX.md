# ChatGPT to Codex
## CURRENT D-129 — implement Worker + D1 + Resend in isolated development branch

OWNER has approved moving from D-128 plan into scoped **development implementation**. Read `coordination/D129-WORKER-D1-RESEND-IMPLEMENTATION.md` FIRST; it supersedes D-128's 'planning only' boundary **only for development code and synthetic testing**. Create a separate `feat/d129-worker-d1-resend` branch from fresh main and a draft PR, preserve existing D-127 unpushed local navigation work, all owner CMS content, pricing and case proof. Deliver D1 receipt+dedupe, Resend-notification status and retry, minimal strongly protected read/export API, safe shared-site architecture and test evidence. No separate CRM and no raw lead PII into current LeadProof browser-event API. Do NOT create production resources, secrets, send real email, activate form flags, publish an indexed page, merge PR or deploy production until separate owner verification. Follow the document's acceptance STOP.


## CURRENT D-128 / 2026-10-23 — Worker + D1 + Resend selected (planning, no activation)

OWNER locks **Cloudflare Worker + D1 + Resend** as preferred small durable form-receipt and Resend notification architecture for Optimalisering Oslo, with future LeadProof forwarding (not a second CRM). This supersedes the prior possible R2 JSON-primary storage option under D-127. D1 receipt **must commit before success ACK**; distinguish receipt from Resend delivery and LeadProof delivery, ensure stable submission ID and idempotent retries. A small read/export endpoint with strong authentication is optional for backup; do not store leads in Git/Pages CMS.

For 10–15 sites, **Cloudflare Free allows at most 10 D1 databases/account**, despite up to 100 Worker scripts/account and 100k Worker requests/day shared. Consider a shared D1 only for approved Medon-owned sites with strictly enforced site separation; isolated customer DBs may justify Workers Paid (~$5/month base per account) subject to billing. Resend Free currently limits one team to three verified sender domains and 3000/month/100/day emails. Clarify per-customer sender/account and privacy before multi-site rollout. LeadProof's current Gate 1 browser ingest does not accept raw lead PII; never send personal data to that event endpoint.

Next Codex task: implement and test the **smallest scoped** Cloudflare form receiver in a review branch only after reading current D-127, C0/C1 intake findings and latest site state; prepare D1 migration, endpoint, Resend retry, export/recovery and privacy guard evidence without provisioning production secrets, enabling real submissions/indexing or deploying a production API until separate OWNER/OPS acceptance. Existing latest local Codex header branch may not be pushed; avoid rewriting its work or assuming it is on main. This entry is a decision/instruction only, NOT authorization to deploy or launch.


## CURRENT D-127 / 2026-10-23 — clickable Synlighet dropdown and Resend-first launch route (OWNER revision)

**READ `coordination/D127-SYNLIGHET-DROPDOWN-AND-RESEND-DELIVERY.md` FIRST on fresh main.** This **supersedes the previous C0/C1 flat header A implementation direction** (old C0/C1 local report remains historical). OWNER specifically wants `Synlighet` **clickable** at `/synlighet/` plus separate accessible submenu control with SEO `/seo/`, AI-synlighet/AIO `/ai-synlighet/` and Lokal SEO `/lokal-seo/`, each with a short explanation. Lokal SEO does NOT exist yet; no dead menu links. Keep Konvertering/Priser/Innsikt/Gratis sjekk, correct 320px hamburger/active page, preserve existing approved visual DNA and H-024C1 mixed Pages CMS list. Implement N1 in noindex review scope and prepare N2 Lokal SEO page research/editor-ready draft; run focused desktop/mobile/keyboard/links/CI tests. OWNER wants a more complete expertise/authority website, but no mass-generated content or service/case price fabrication.

OWNER says **existing live website uses Resend**. Existing new-pilot `app/server/resend.mjs` is only server code; the current static Worker deploy has no API, and `HomeAssessment.astro` is hard disabled. N3: discover/read-only the current working live Resend endpoint and determine the **shortest safe operational reuse** for both free-check and package-order forms. Fix neither public flags nor security/privacy before actual backend delivery, inbox and owner/ops details can be checked; do not create a second backend unnecessarily or assume an API key exists in repo. Provide explicit next scoped launch task. Report any old phone-fixture/template errors without restoring OWNER-discarded company/contact fields.

Site release/real forms/indexing/production still require separate verification, project legal/contact authority and OWNER GO. Do not build a universal starter, new EN or dark mode. Preserve D-126, pricing, global masters, and status of approved Page Builder. Historical «ACTIVE» instructions below are NOT newly authorized tasks.


## CURRENT 2026-10-23 — commercial site closeout / header first (planning scope)

OWNER: «da går vi videre, vi må jo også bli ferdig med nettsiden». **Read `coordination/COMMERCIAL-LAUNCH-CLOSEOUT-2026-10-23.md` first.** Site revenue/go-live has priority over generic MedonWebSystem starter extraction. H-024C1/D-119 homepage unified Pages CMS list is OWNER accepted; old three-group model must not return. Start C0 one-pass **read-only** launch blockers review + C1 constrained shared header/navigation and buyer-path design options. Preserve OWNER CMS content, global masters, FAQ Spiss+ copy, packages/prices, proof, native forms, noindex and disabled intake. English routes are intentionally blocked; current theme is light-only, so NO|EN publication and dark switching are optional later gates. Do not start broad service migrations, sitewide content rewrites or system starter extraction. Material header redesign, form activation, launch/indexing and live production changes need separate OWNER approval. Older «ACTIVE» historical entries below are not renewed tasks.


## ACTIVE D-118 / H-024C1 — one homepage CMS list, no Topp/Hoved/Bunn

OWNER explicitly says the single-list CMS-only model on Synlighet **works** and authorizes the same simplified model for Forside. **Read `coordination/H024C1-HOMEPAGE-SINGLE-SECTION-LIST.md` on FRESH main.** Migrate genuine `home.json` `topSections + sections + bottomSections` in exact render order into sole `sections` list; retain OWNER's newest **global behov in Top** and hidden local **forbehovsvelger** UUID/content exactly, followed by regneeksempel/resultater/priser/sjekk/sporsmal, unless later edits supersede. Hero fixed first. In native Pages CMS show ONE sortable mixed `Innholdsseksjoner` list, no three redundant fields. Remove obsolete triple-list source/runtime/test handling once safe, guard stale saves and links/singletons; don't clone master content or redesign. Build/focused CMS/schema/one desktop-mobile and actual native editor Save→Worker→exact test-only restore due to persisted model change. Deploy promptly to noindex review Worker, STOP for OWNER preview review. All other pages and latest Synlighet bottom calculator unchanged; H-024B4's functional model accepted, no broad service rollout/launch.


## ACTIVE D-117 / H-024B4 — no off-list content sections on Synlighet

OWNER: **«alle elementer som ikke er synlige eller del av det som er i CMS må bare fjernes.»** Existing Synlighet `ServiceFamilyPage` injects Helt Opplagt proof, ServicePricingBridge and FAQ automatically although no placements exist in its CMS sections list. **READ `coordination/H024B4-CMS-ONLY-SYNLIGHET-SECTIONS.md` latest main** and fix. Only nested Hero, native mixed **visible** CMS list and separately managed site shell may render. Remove Synlighet-only legacy local proof/faq data and proofAfter/pricingBridge off-list injection; don't auto-add replacements. Add `priser`/`sporsmal` to native Globalt element picker so OWNER can choose their positions; preserve protected local `sjekk`, latest OWNER regneeksempel bottom and all global master/evidence/media. No implicit global-behov substitution hiding a visible local row; require explicit valid placement. Other service pages/home unchanged. Light but focused schema/render/CMS tests + build/desktop/mobile; native review deployment then OWNER assessment, no public release/index/intake.


## ACTIVE D-116 / H-024B3 — Synlighet hub, samme Hero CMS som forside, behold global plassering

OWNER har sett H-024B2 og **liker den native mixed local/Globalt element-listen**; OWNER har selv lagret global `regneeksempel` NEDERST på `/synlighet/`. **IKKE rull den tilbake!** Neste oppgave `coordination/H024B3-SYNLIGHET-HUB-UNIFIED-HERO.md`: gjør Synlighet til synlighetshub (SEO, lokal SEO, AI-synlighet) med **én samlet Hero i CMS som på forsiden**, ikke oppsett på én plass og overskrift/ingress/CTA/bilde som separate felt. Reuse exact shared native Hero/commercial component structure, migrate Synlighet alene losslessly, preserve full existing Hero/CTA/current service-PNG/alt/crop and current default front-end. Keep the one existing sortable mixed local/global section list, preserve all OWNER data/case/media/blocks, make legacy auto proof/price/FAQ sources understandable without duplicate rendering. No new local-SEO route, no Konvertering rollout, no heavy test marathon. This is a CMS source-shape change: focused schema/form-save/build plus one desktop/mobile and actual review Worker verification, then stop for OWNER. Current HEAD must be read fresh; repo source `65d344cf` already contains OWNER-added calculator.


## ACTIVE D-115 / H-024B2 — OWNER REVISE, shared global module placements on Synlighet

OWNER's actual screenshot shows service-local Helt Opplagt proof and OWNER reports **no option to add «Globale elementer»** in the Synlighet section editor. **H-024B1 is NOT full OWNER PASS; stop claiming complete service CMS**. Verified source: `synlighet.json.proof` + `ServiceFamilyPage.astro` automatic insertion after `prioritering`, independently of current global `resultater.json` master. Case metrics use shared evidence, but display config/heading is local. **Read and implement `coordination/H024B2-SERVICE-GLOBAL-PLACEMENTS-SYNLIGHET.md` on newest main**. One native sortable local/global placement list for Synlighet, references to the existing master library, no copied content, reversible visibility/removal, no duplicates when global proof selected, and original local proof/price bridge/FAQ output exactly preserved until selection. Clear CMS help about local source. Follow D-107 lean QA, one genuine CMS global-resultater Add→Worker→Remove/restore if safe; stop for OWNER. Don't change other pages, global master copy/assets/prices, launch/index/intake.


## ACTIVE H-024B1 CMS NAV UX FOLLOW-UP — D-113

OWNER screenshot shows **Synlighet is missing under Tjenester** (four others listed), so pilot is not OWNER-accepted despite technical pass. `.pages.yml` was narrowly corrected: Tjenester is now stock CMS `type: group` with `services` collection «Øvrige tjenester» plus `serviceSynlighet` file «Synlighet». `synlighet.json` remains excluded from collection to avoid duplicate editors; relevant focused test now looks inside the group. **Verify in a fresh authenticated native Pages CMS**: Tjenester expands, Synlighet opens the actual editor, Øvrige tjenester lists four unchanged; check no duplicate edit destination. Run just YAML/CMS config and `synlighet-cms.test.ts` (and build only if necessary); avoid any CMS save, screenshots marathon, content resets, other-site changes or redesign. If navigation fails, report concrete native behavior and minimal correction. No claim of verified menu until observed; stop for OWNER pilot review. D-112/H-024A3 remains OWNER PASS.


## ACTIVE D-112 / H-024B1 — OWNER approved Pages CMS; start only Synlighet service pilot

OWNER answers **«yep, ser bra ut»** to explicitly closing H-024A3 and advancing to H-024B. **H-024A3 CLOSED as OWNER PASS with accepted native limitations** (technical collapsed IDs, build-guard rather than UI prevention of invalid operations, mouse drag not independently verified). **New bounded implementation task:** read `coordination/H024B1-SERVICE-CMS-PILOT-SYNLIGHET.md` from latest main. Choose existing `/synlighet/` as single service-page CMS pilot: existing native editable/sortable sections must be reused, add only genuinely missing safe optional visibility/add/edit behavior, preserve established Hero, protected CTA, proof-after/pricing-bridge anchors, prices, evidence, all OWNER CMS changes and other pages. Under D-107 use lean focused QA and direct noindex review Worker, then stop for OWNER review before service rollout. No homepage CMS rework or public launch.


## ACTIVE D-111 / H-024A9 — sluttkontroll av uavklarte Pages CMS-punkter

OWNER sier gå videre med gjenstående CMS-punkter. **Les `coordination/H024A9-CMS-CLOSEOUT.md` på nyeste main.** Utfør en kort, read-only evidensaudit, ikke en ny CMS-implementering eller gjentatte testkampanjer. Native add/edit/move/hide/remove/master-save/restore er allerede teknisk dokumentert, collapsed IDs er akseptert, B-forside er implementert og H-022E-malbytte er verifisert. Samlet H-024A3 editor-UX krever fremdeles faktisk OWNER vurdering; untestet mouse-pointer drag må ikke oppgis som bestått. **VIKTIG:** nyere Pages CMS commits i `priser.json`, `resultater.json` og tilhørende media er OWNER-arbeid og må ikke overskrives. Kvitter kort hva som er bevist, kjent begrensning, og ett konkret OWNER-spørsmål. Ingen H-024B eller offentlig lansering.


**H-022E / D-110 levert (2026-10-20):** CMS-malvalg, begge maler og faktisk CMS952daec→native→Worker→CMS-restoreff52bdd er verifisert. Standard Vekslende liste er live; nativefd675e5c SUCCESS/Workera53c2108 at100%. Se CODEX-TO-CHATGPT for korte tester/bevaring/commits. OWNER vurderer visuelt etter publisering; ikke gjenta ACTIVE-oppgaven under. Whole H-024A3 OPEN/H-024B BLOCKED, ingen launch/index/intake.


## ACTIVE D-110 / H-022E — CMS-malvelger for Kunderesultater

OWNER vil **Vekslende liste** som standard og **Bildekort** som alternativ, valgt inne i **Pages CMS → Globale elementer → Kunderesultater**. Les `coordination/H022E-PROOF-CMS-LAYOUT-CHOICE.md` i nyeste main og gjennomfør. Gjenbruk eksisterende visuelle maler fra `/design-system/`, ikke kopier PageList-artikkelkilder/lenker. Knytt valgfrie opplastede bilder til hvert proof-case, med fallbacks uten falske ikoner/bilder; behold OWNERs nyere `eurotents.jpg` og crop. Bevar identiske caseverdier/permission, `primary=true` service-proof, resten av B og alle andre ruter. D-107: lett QA, men verifiser faktisk CMS-malbytte og restore fordi dette er en ny CMS-kontroll. Publiser direkte til noindex review Worker; kort leveransekvittering. Ingen H-024B eller launch.


**H-022D / D-108 levert2361f0f (2026-10-19):** ekte designsystemkort, mindre proof-spesial-CSS; native54797d3f SUCCESS / Workerecf2b303 at100%, lett QA og faktisk Worker verifisert. Se CODEX-TO-CHATGPT. OWNER vurderer visuelt på nettsiden; ikke gjenta ACTIVE-instruksen under som ny oppgave. H-024A3 OPEN/H-024B BLOCKED; ingen launch.


## ACTIVE — D-108 / H-022D: stop custom proof showcase, reuse actual design-system Card

OWNER visually **REVISES** H-022C as still too dull/unrelated. Read `coordination/H022D-PROOF-DESIGN-SYSTEM-REUSE.md` from latest main. Use existing /design-system/ «Kort med bilde» markup (real daisyUI `card md:card-side`, `figure`, `card-body`) for Eurotents with its already captured WEBSITE screenshot and approved ROAS/period/spend narrative inside ONE card. Below use two matched ordinary `card/card-body/card-title` for Nysta/Helt Opplagt; no fabricated graphics or case links. Remove/reduce previous excessive homepage-proof styling, use existing design tokens/components. Preserve primary proof on service pages, B homepage, data/permissions and existing CMS models. Under D-107 publish directly to existing noindex preview after diff/build/focused checks and one desktop/mobile smoke, then short receipt. No new screenshot/evidence marathon and no public launch.


**D-107 / H-022C teknisk levert0504207, native252e2ff8 SUCCESS / Worker bbc92c41 at100% (2026-10-19).** Se kort CODEX-TO-CHATGPT-kvittering. OWNER vurderer visuelt direkte på review Worker; ikke utfør den gamle prototypeinstruksen eller gjenta leveransen som ny oppgave. H-024A3 OPEN/H-024B BLOCKED; ingen launch/index/intake.


## AKTIV D-107 / H-022C — direkte til review Worker, ikke tung prototype

OWNER har eksplisitt endret arbeidsmåten: **bygg kun etterspurt innholds-/bildeseksjon, publiser direkte på eksisterende noindex Worker fra fersk main og la OWNER selv sjekke visuelt der**. Tidligere H-022C-krav om egen gren, firebredde-screenshots, omfattende testing og ekstra visuelt PASS før review-deploy er SUPERSEDED. Les `coordination/PRELAUNCH-DELIVERY-RULE.md` og nå revidert `coordination/H022C-PROOF-VISUAL-REVIEW.md`. Gjør Eurotents til ett integrert kundecase med **ekte skjermbilde av NETTSIDEN, ikke teltfoto**; Nysta/Helt Opplagt i balanserte kort; bevar alle godkjente casetall, kildebetegnelser og perioder. Minimal diff + build + relevante fokustester og kort desktop/mobil smoke; faktisk Cloudflare native review deployment må bekreftes. Ikke H-024B, live POST, indeksering eller redesign av øvrige sider. Lever kort commit/preview-kvittering.


## ACTIVE NEXT — D-106 / H-022C: visual proof showcase prototype only

OWNER: **«Ja kjør på»** after H-024A8G technical delivery and critique of the disconnected «Kunderesultater» mosaic. OWNER wants a **real Eurotents website screenshot, not tent photography**, one editorial Eurotents result case and two consistent Nysta/Helt Opplagt support cards, with locked approved proof data. READ `coordination/H022C-PROOF-VISUAL-REVIEW.md` on latest `main` for the full implementation boundary, source and QA. Build renderable preview/screenshots in an **isolated proposal branch**, not on `main` or the existing review Worker, and STOP for OWNER visual PASS/REVISE. Do not treat this as whole H-022 production acceptance or H-024A3/H-024B approval; preserve H-024A8G B, CMS, commercial facts and launch guards.


**H024A8G TECHNICAL DELIVERY RECEIPT — 2026-10-19:** D-105 implemented8ad20ac; native11989b9b SUCCESS/Worker f56a0d64 at100%, actual CMS and four-width live verification complete. OWNER-approved source exception preserves design-system output. See current CODEX-TO-CHATGPT and evidence/h024a8g/README.md. STOP for OWNER visual/commercial review of B; do not rerun the historical active instruction below as new work. Whole editor acceptance pending, H024B BLOCKED/H022 PARKED, no launch.


## ACTIVE HANDOFF — D-105 / H-024A8G: implement OWNER-approved homepage B

2026-10-19. OWNER has now explicitly selected **B** and accepted the native Pages CMS collapsed technical-ID limitation. Previous D-104/H024A8F is **DELIVERED**, not an unstarted task. The complete authorized implementation contract is now **in this GitHub repository**: `coordination/H024A8G-Codex-Handoff-Forside-B.md`. READ IT on latest `main` and execute its complete minimal-change/preservation/QA/deploy/STOP workflow. Expected visible sections: Hero → regneeksempel → resultater → priser → sjekk → sporsmal. Hide but preserve OWNER Top `forbehovsvelger`; remove only homepage references `behov`, `mekanisme`, `passer` (all eight library masters unchanged). Preserve approved designs, claims, prices, forms, anchors, indexes and CMS configuration. Do not ask again for the missing chat-local attachment: **the GitHub file is authoritative**. STOP after actual technical delivery and OWNER review; H024A3 OPEN, H024B BLOCKED, H022 PARKED.


## ACTIVE HANDOFF — D-104 H-024A8F NARROW CMS LABEL/HELP POLISH + SHORTER HOMEPAGE PROPOSAL

2026-10-19. OWNER says **"ok, god plan da gjør vi det slikt"**, authorizing prior offer: polish technical global row names in collapsed Pages CMS list and prevent repetitive explanatory text under every placement; then propose, but **do not implement**, a shorter commercial homepage composition. Read `coordination/H024A8F-CMS-EDITOR-POLISH-AND-HOMEPAGE-SHORTLIST.md` before touching code.

Current `.pages.yml` list `summary: "{element}{name}"` exposes raw `regneeksempel/behov/sjekk` keys. Select options already have Norwegian labels; test whether native hosted Pages CMS can show those labels in collapsed summaries without duplicating master copy/introducing a second label registry. Its repeated list `description` renders under each row; eliminate clutter while keeping concise, understandable instructions accessible. No custom Pages CMS/DOM hacks or broad rebuild: if native limitation, report it and STOP subpart. Demonstrate actual editor UX with authenticated fresh screenshots and retain save/build/preview integrity.

**Keep all current OWNER source intact:** Pages CMS saved `regneeksempel` before `behov` (`f562b7e`), existing Top `forbehovsvelger`, all eight protected global masters, unchanged H024A8E three groups, pricing/proof/CTA/form/data constraints, noindex & disabled intake. No speculative homepage section removal, moving or hiding; present exactly which section placements could be omitted for OWNER choice, and guard real `/#sjekk` / `/#priser` links. Stop with evidence and recommendations for OWNER. Whole H024A3 still OPEN; H024B BLOCKED; H022 PARKED.

---

## OWNER FEEDBACK D-103 — H024A8E SAVED ORDER MATCHES CMS AND PREVIEW (SCOPED PASS)

2026-10-19 OWNER confirms **"ja ser riktig ut på siden og Pages"** after `f562b7e` reorder of `regneeksempel` / `behov`. Mark section order display + authenticated CMS save propagation OWNER PASS. Previous old fixed editor was cached UI; not a code regression. Preserve the current OWNER-saved order and all global masters. This is **not** whole H024A8E OWNER acceptance or explicit proof of mouse pointer drag. The only suggested pending UX polish is human-readable collapsed labels instead of raw IDs and collapsing/removing repeated per-row instructional text; await scoped go-ahead rather than broad rebuild. OWNER still needs to select exactly which sections to keep on a shorter homepage. H024A3 OPEN, H024B BLOCKED, H022 PARKED.

---

## OWNER CMS VERIFICATION — OLD TAB WAS STALE, SAVE WAS VALID REORDER (2026-10-19)

OWNER reopened Pages CMS; new screenshot shows native H024A8E `Valgfrie seksjoner Topp`, `Hovedseksjoner`, draggable global rows (not the old Before/After UI). Git `f562b7eb87ba6b2f83300535087425bfa0e5f58c` is a real CMS save changing ONLY the first two homepage placements from `behov,regneeksempel` to `regneeksempel,behov`. Current `home.json` is otherwise baseline-equivalent, library masters and new `.pages.yml` intact. No evidence of an old-schema corrupting save. Preserve OWNER's new order and other current content; never blindly restore the pre-save `2b2f1db` receipt. Prior stale-editor/cached-tab issue is RESOLVED unless freshly reproduced.

**No new implementation authorization:** H024A8E remains technically delivered / OWNER whole editor gate open. Potential UX polishing for future scoped review: raw names `behov`, `regneeksempel`, etc. in collapsed global reference rows; repetitive instructional text beneath each item. Do not modify code/structure or start H024B without OWNER direction.

---

## OWNER OBSERVATION — H024A8E OLD PAGES CMS TAB APPEARS STALE; VERIFY BEFORE CHANGING CODE

2026-10-19. OWNER attached screenshots showing **old** `Faste seksjoner` editor with blank `Required` fields, and `Ekstraseksjoner` with Before/After Regneeksempel. This is **not** the new H024A8E schema on GitHub main. Main `.pages.yml` currently declares `topSections` ("Valgfrie seksjoner Topp"), `sections` ("Hovedseksjoner"), `bottomSections` ("Valgfrie seksjoner Bunn"), and `globalElements` ("Globale elementer"); `home.json` contains page-local placements `{_block:"global",element:"..."}`, not old keyed original payloads; the new authentic CMS receipts themselves saw three lists.

**Do not migrate/rollback code or change owner content based on stale-looking screenshots. DO NOT SAVE old CMS tab.** OWNER first closes existing browser tab and launches a completely fresh authenticated editor at `https://app.pagescms.org/anelpasic/optimalisering.oslo.nov3.3/main/file/homepage`, hard refresh and check headings. Only if a new session still shows old fields: reproduce from scratch, verify exact repository/branch, actual fetched config `.pages.yml`, caching/state and mapping, then report scoped UX cause/remedy with evidence. No speculative custom CMS, no source edit/Worker deployment until reproduction. H024A8E not OWNER PASS, H024B still BLOCKED.

---

## ACTIVE HANDOFF — D-102 / H-024A8E GLOBAL ELEMENTS LIBRARY + OPTIONAL PAGE PLACEMENTS (IMPLEMENT)

Date: 2026-10-18. OWNER explicitly changed the model **before you start**: **"ja god plan, endre H-024A8E til denne modellen. Også trenger vi ikke alle de blokkene som er på forsiden."** Implement **REVISED** `coordination/H024A8E-NATIVE-THREE-ZONE-PAGEBUILDER.md` at latest main. This supersedes D-101's direct editable eight-row source list; DO NOT implement obsolete eight-required `min=max8` architecture.

**What the OWNER wants:** a native Pages CMS **Globale elementer** library analogous to Concrete CMS Stacks. Existing calculator, assessment/contact, proof, pricing, FAQ, selector master content/config remain editable in one authoritative place, protected against ordinary CMS UI deletion. Homepage merely chooses placement/reference, toggles Publisert/Skjult, reorders or removes the page instance; never loses masters. Hero stays pinned. Three simple native sortable groups: **Valgfrie seksjoner Topp**, **Hovedseksjoner** (no longer eight-required/authoritative), **Valgfrie seksjoner Bunn**. Local normal content remains directly editable; no per-core Before/After dropdown, numeric reordering, external CMS, page-wide duplicated master data.

**Mandatory:** inspect Pages CMS stock capability (reference supports collections, select can refer to fixed typed files; operations.delete:false on file/collection), choose one simplest native library mechanism. FIRST prove one genuine library master + page reference CMS save→Git→native Worker→restore; if UX/schema proves infeasible STOP rather than migrate everything. Then migrate safe global modules, retain all eight records including content-only `mekanisme`/`passer` and **OWNER-added `forbehovsvelger`** (present in current home source, `before:behov`) with full data/UIDs. Do not reset to historical H-024A8B receipts. Keep one authoritative commercial/proof/form data source, approved components, stable IDs/anchors and no source leakage. Guard existing `/#sjekk`/`/#priser` links; allow removing modules from a page only after anchors have correct legitimate destinations. Prevent duplicate interactive instances per route unless properly tested. Preserve current preview composition initially: "not all sections needed" removes structural **requirement**, but is NOT an OWNER selection of which current visible ones to remove. Report the actual options and request that decision at final STOP.

**Scope**: existing preview only, authentic CMS→Git→Worker tests and selective exact restoration; no page launch/index/intake, H-024B service pages or H-022 proof changes. On technical PASS, STOP for OWNER library/editor/shorter-homepage approval. D-101 text below is historical.

---

## HISTORICAL HANDOFF — D-101 / H-024A8E THREE-ZONE SOURCE LIST (SUPERSEDED BY D-102)

Date: 2026-10-18. Direct OWNER: **"ja men vi kan leve med at vi ikke er beskyttet mot å tømme en rad og duplisering."** This explicitly resolves D-100's outstanding original-core sorting tradeoff. Keep **stock Pages CMS native draggable co-located mixed original 8-block list** despite known original Clear/Replace/duplicate Save risk; protect with **website build/schema checks and narrow Git recovery**, not falsely claimed native CMS blocking. **No numeric ordering, separate order-only list or CMS fork.**

Execute exactly `coordination/H024A8E-NATIVE-THREE-ZONE-PAGEBUILDER.md`: Hero fixed, **Valgfrie seksjoner Topp** native list Add/Hide/Drag, **Faste seksjoner** original eight native drag/edit/hide where safe, **Valgfrie seksjoner Bunn** native list Add/Hide/Drag. Fixed group order, no per-extras Before/After placement. Full original eight `behov, regneeksempel, sjekk, priser, resultater, mekanisme, passer, sporsmal` remain unchanged in content/IDs/UUIDs; `sjekk`/`priser` remain visible due linked CTAs. **RE-PULL current main and preserve actual OWNER-created `forbehovsvelger` optional item** and any other new content; map `before:behov` to Top and remove obsolete placement without changing values. Never overwrite with older canonical test copies or local research branch.

Real Pages CMS save→Git→native Cloudflare Worker→restore for core reorder and both optional top/bottom Hide/Drag/Add/Delete; responsive/public hidden leak/CTA/site schema checks, proven default output parity vs latest OWNER main, historical risk honestly disclosed and recovery guide. Preview only. Deliver evidence `evidence/h024a8e/README.md` and STOP for OWNER whole editor/visual acceptance; no H-024B, H-022, launch/intake/indexing authority. Existing H-024A8C local discovery (`1680608`) is not required to have been pushed; OWNER supplied its full report in ChatGPT.

---

## HISTORICAL OWNER INTENT — D-100 THREE-ZONE PAGE BUILDER (RESOLVED BY D-101)

Date 2026-10-18. OWNER specifies an explicit editing screen model:
- Hero (locked first);
- "Valgfrie seksjoner Topp": independent optional content list, Add, Skjult/Publisert, native drag within top;
- "Låste seksjoner": original business sections with Skjult/Publisert where safe, **desired native drag within this group**, no accidental deletion;
- "Valgfrie seksjoner Bunn": independent optional list, Add, Skjult/Publisert, native drag within bottom.
Group order is fixed. The per-section Before/After dropdown from H-024A8B is no longer the preferred UX if a safe three-zone model can be implemented.

**Do not begin implementation.** H-024A8C local report from OWNER (`1680608`, not pushed) shows mixed core list Clear/Replace can pass client Save validation and cause broken build; stock Pages CMS does not permit both co-located direct core drag and hard protected-row semantics. OWNER must choose direct sortable mixed row with explicit invalid-save/Git recovery risk versus protected fixed core objects plus separate sortable reference/order list (indirect two-step editing). A numeric field is a third UX compromise OWNER has not accepted. Current core is eight entries; OWNER's diagram named only six and omitted `mekanisme` and `passer`, so preserve both. Current `#sjekk`/`#priser` stay required-visible until links safely resolved.

See `coordination/H024A8D-THREE-ZONE-PAGEBUILDER-OWNER-INTENT.md`. Await owner's selection, then write a distinct implementation contract; no product source/code, no deployment, H-024B BLOCKED.

---

## HISTORICAL HANDOFF — D-099 H-024A8C DISCOVERY (OWNER REPORT LOCAL ONLY)

Date: 2026-10-18. OWNER has now reviewed H-024A8B CMS UI and reports: **"Etter hero, så kan ikke de faste seksjoner flyttes opp ned som tidligere."** This is **OWNER REVISE** of original-eight editor reordering, not general rejection of H-024A8B's tested Hide/Publish and optional inserts. The original editor allowed native drag; making core fields fixed was an acknowledged but now OWNER-rejected UX tradeoff. Keep Pages CMS stock, not custom.

**Study only** `coordination/H024A8C-RESTORE-CORE-REORDERING-ASSESSMENT.md`. Primary candidate: reinstate native co-located draggable original eight mixed list at min=max8, **retain separate current optionalSections before/after keyed by original IDs** and visible/hidden toggle, order resolver uses the new actual original ordering. Do not claim min=max8 protects rows from native Remove/Clear (authenticated discovery found enabled confirmations). Determine safely whether native client-side Save validation prevents committing invalid originals, whether schema-only rejection can lead to failed Cloudflare builds, and how protected content would be recovered. Investigate without any production source/runtime mutation, report one practical safe alternative if needed, compare editor usability to prior OWNER rejection of order-only registries. STOP for OWNER decision; no H-024A8C implementation yet.

Status: H-024A8B technical implementation remains, but OWNER REVISE; H-024A3 OPEN, H-024B BLOCKED, H-022 PARKED. No launch/index/intake, no visual/commercial/proof changes.

---

## HISTORICAL HANDOFF — D-098 / H-024A8B STOCK PAGES CMS (DELIVERED; D-099 OWNER REVISE CORE ORDER)

Date: 2026-10-18. OWNER explicitly chooses **Pages CMS as-is** rather than custom hosting/fork. Clarification: "Beskytte de åtte opprinnelige" must mean protect their identity/content against accidental deletion/duplication, **NOT** require public visibility. OWNER allows **new sections before and after the protected originals** and wants some original sections **Skjult/Publisert**. Implement stock-CMS choice B, modified for easy before/after placement, under `coordination/H024A8B-STOCK-PAGES-CMS-CONTINUATION.md`. The prior A-customization recommendation is superseded.

Use non-removable fixed objects for existing eight, one optional content-only list and typed before/after existing-ID position selector; keep source-backed Card/HomeSection/daisyUI, all current values/UUIDs/SEO/CTA/approval untouched. Published/hidden must be reversible, content retained in CMS and **omitted** from HTML/serialized/public design-system. Keep linked #sjekk/#priser and shared commercial projection safe; hide homepage Hero proof derivative if proof is hidden and confirm actual behavior. Show honest stock-CMS tradeoff: original core relative order not native mixed-draggable in this simpler model. Do not imply original eight must be visible. Live homepage default output must remain unchanged after migration; original JSON shape migration may change bytes but all identities/values must be lossless.

**Authorize implementation/test only within the written contract**. Require logged-in Pages CMS add/delete/placement/hide/save→Git→Cloudflare Worker→restore, exact source mapping/responsive checks, STOP for OWNER editor UX and visual approval. If stock CMS cannot meet the requirement safely, STOP for revised direction; do NOT return to CMS fork without OWNER authorization. H-024A3 not yet PASS, H-024B BLOCKED, H-022 PARKED, no launch.

---

## HISTORICAL HANDOFF — H-024A8 DISCOVERY STOP (D-097; SUPERSEDED BY D-098)

Date: 2026-10-18. Direct OWNER: **"ja, enig, men vi bør også kunne sette seksjoner til å ikke være publiserte eller inaktive, så de kan utnyttes senere om det er noe å spare på."** Applies to the agreed next H-024A3 homepage section creation/deletion gate **before** H-024B service rollout.

**Execute `coordination/H024A8-OPTIONAL-SECTIONS-VISIBILITY.md`**, starting with real Pages CMS feasibility. Current list is mixed singleton + content, Pages CMS min/max8, Zod exactly8. Never just raise max to allow protected singleton duplicates/deletes; if native editor cannot safely permit **only additional ordinary content** Add/Delete and native mixed drag/reorder, STOP with practical bounded alternatives and await OWNER decision rather than inventing broken UX.

Add a clear per-homepage-section **visible/hidden (non-published)** CMS setting, missing/legacy→visible. Hiding retains full section record/layout/media in CMS for future reuse and omits it entirely from rendered public HTML/client/SEO/navigation (not CSS display:none). Protect link destinations like `/#sjekk`, `/#priser` and shared package/proof/form authority; protected singleton records cannot be deleted. Use existing shared approved Card/layout/theme components, one central render predicate and no redundant parallel editor. Prove authentic CMS → Git → native Worker hide/re-enable + optional Add/Delete if feasible → exact source/data/Worker restore and no hidden content leaks. Preserve ALL approved Hero/Footer/Card/FAQ/assessment visual work and OWNER edits, noindex/intake off.

Status: **AUTHORIZED scoped implementation with feasibility gate**, not acceptance of H-024A3 whole editor, not H-024B authority. Stop for OWNER review, or stop earlier with a choice if CMS restrictions prevent safe Add/Delete.

---

## Latest OWNER decision — D-096 H-024A7 / scoped H-024A6 PASS (NO ACTIVE CODE TASK)

Date: 2026-10-18. OWNER reviewed actual FAQ shared width and both contact variants and says: **"sett på begge ser bra ut, regner med at vi kan justere dem sentralt fra nå av."** Record **H-024A7 OWNER PASS / CLOSED**, and H-024A6 component-section parity correction PASS within its scoped visual gate (existing split contact/ordinary boxes already passed). Keep approved existing split default, new horizontal CMS option, current FAQ width, Card/Hero/Footer and exact OWNER copy intact.

**Important technical distinction for future work:** shared component source edits to `Faq.astro` and `HomeAssessment.astro` propagate to instances *within this repo after build*; Pages CMS controls content and the homepage layout selector, not an overall global component-style panel. Standalone `AssessmentForm.astro` has separate behavior, and MedonWebSystem/other websites do not live-sync updates from this repo. Do not imply a global UI editor/automatic cross-project propagation has been built.

This is a **decision receipt; do not initiate a new implementation**. H-024A3 whole Pages CMS editor gate remains pending distinct OWNER acceptance; H-024B BLOCKED, H-022 PARKED. No public form intake, indexing, publish/domain launch or other change authorized.

---

## Historical handoff — D-095 H-024A7 FAQ SHARED WIDTH + OPTIONAL HORIZONTAL CONTACT (DELIVERED; D-096 PASS)

Date: 2026-10-18. OWNER directly says: **"Kontaktseksjonen på forsiden er ok as is, men vi vil trenge en vannrett variant. Boksvariant: ok. FAQ-seksjoner: ingen grunn til at den skal ha max bredde lavere enn resten."**

This is **OWNER PASS of existing contact variant and box variants**, not of FAQ's narrow width and not a full H-024A3 editor acceptance. Implement the scoped contract at coordination/H024A7-FAQ-WIDTH-HORIZONTAL-ASSESSMENT.md. Verified FAQ culprit: shared.css sets .faq-grid max-width:1200px although site-shell .shell max-width1440px; remove the extra cap and keep FAQ content, grid semantics and real same-source design-system demo.

The contact is **already two columns**, so new "vannrett" needs to be an actually different, compact full-width alternative with website/email/button inline desktop, stack mobile; keep optional comment, legal/privacy/preview/status and existing transport-disabled behavior. Use same HomeAssessment component, daisyUI + Tailwind, two typed Pages CMS presets, existing default remains unchanged and approved. Present both source-backed options in /design-system/; verify authenticated native CMS choice→Git→Cloudflare→Worker→restore without leaving the live homepage in alternate state. This layout interpretation is provisional until OWNER visual review, not permission to invent or delete form content.

Keep Card/Hero/Footer/PageList approvals and all current OWNER edits untouched; no H-024B, H-022 or launch actions. Deliver native proof and STOP for OWNER review.

---

## HISTORICAL HANDOFF — H-024A6 ASSESSMENT / BOX PADDING / REAL FAQ PARITY (DELIVERED; D-095 partial PASS)

Date: 2026-10-17. OWNER directly points out that other homepage components still "lever sitt eget liv": screenshot of homepage contact, source `.invite-home .assessment-grid {gap:96px;max-width:1280px}`; CMS **Boksvariant** example missing padding; production FAQ at bottom **not actually demonstrated in /design-system/**. Source confirms duplicate assessment sizing authorities, non-card `info-item:not(.card)` zero left/right padding, homepage FAQ inlined in HomepageBlock separate from Faq.astro, and generic design-system collapse rather than actual homepage FAQ.

**Execute narrow correction contract**: `coordination/H024A6-SECTION-COMPONENT-PARITY.md`. Pull fresh main and preserve OWNER's latest CMS changes (including potential modified mekanisme Cards/section colors). Fix actual contact alignment/appropriate daisyUI Card body, keep form disabled and data/JS/IDs/CTA/transport exact; make CMS non-card variants genuinely usable with proper inner breathing room (without regressing accepted D-092 cards or intended legacy editorial states); use one actual homepage/other-route FAQ renderer and demonstrate real homepage FAQ and assessment using production components/source in design-system (avoid duplicate IDs and POSTs). Compare computed responsive geometry, content, accordion keyboard/open/closed, colors and 1440/900/390/320 screenshots on true Worker. Audit remaining homepage components vs design-system as inventory only, no broad makeover. Record exact native/test evidence; push main then **STOP for OWNER review**.

Keep H-026 Hero/Footer **D-093 PASS and unchanged**, accepted Card/typography and PageList, protected CMS/commercial source, noindex/intake disabled. **H-024A3 whole editor still REVISE; H-024B BLOCKED, H-022 PARKED**; no launch, proof or new page expansion.

---

## Latest OWNER verdict — D-093 H-026 HERO + FOOTER PASS / CLOSED

Date: 2026-10-17. OWNER directly confirms about published H-026: **"ser riktig ut."** This is explicit scoped **OWNER acceptance of the Hero/Footer appearance** following genuine daisyUI reuse delivered at `5d4f7d6`. H-026 is COMPLETE; preserve the shared `hero/hero-content`, `footer/footer-title`, the four D-088 Hero CMS presets, original visual geometry and content, and accepted D-092 Card/readability. **Do not reopen Hero/Footer implementation** without a new actual issue.

This is a **decision receipt only; do not initiate code**. The next independent OWNER gate is H-024A3 whole-editor review. H-024B remains BLOCKED and is not implicitly authorized, H-022 is PARKED. No indexing, public intake, domain or launch authority.

---

## Historical handoff — H-026 DAISYUI HERO + FOOTER REUSE (DELIVERED; D-093 PASS)

Date: 2026-10-17. OWNER confirms H-024A5 live card font sizes are good: **"ja størrelsen er bra nå."** Earlier H-024A4 appearance is positively reviewed apart from that corrected typography. **D-092 closes both narrow Card component/readability gates.**

**Proceed with H-026**, exact scope `coordination/H026-DAISYUI-HERO-FOOTER-REUSE.md`. Inspect actual Hero/Footer markup + official daisyUI guidance, adopt real `hero/hero-content` and `footer/footer-title` components where they fit; use Tailwind composition and minimal justified custom CSS. Preserve D-088's four OWNER-approved CMS Hero variants, all existing page copy/CTA/media/crop/proof/pricing authority, glossary/404, footer links/legal/preview labels, mobile order, aesthetics and design-system demo. Compare before/after screenshots and computed geometry across route families/widths on actual deployed Worker, report justified exceptions rather than forcing generic components at the cost of visual regression. Then STOP for OWNER Hero/Footer review.

No new Card changes requested; keep `card-copy` 16px mobile / 18px wide desktop and shared H-024A4 Card geometry. H-024A3 whole-editor acceptance remains separate, H-024B BLOCKED, H-022 PARKED, no launch/indexing/intake.

---

## Historical handoff — H-024A5 CARD BODY TYPOGRAPHY (DELIVERED; D-092 PASS)

Date: 2026-10-17. OWNER says: **"ja men merket at alle kort har litt for liten font, ser det er på [design-system] også, så det er vel globalt. tenker 1rem burde være passe eller det minste."**

The H-024A4 true daisyUI Card structure/visual composition is positively received **except for small card text**; do not record an unconditional whole-editor PASS. New scoped correction: `coordination/H024A5-CARD-BODY-TYPE-FLOOR.md`.

- **Substantive card body/description at least 1rem** (16px normal root) in live `/#passer`, the actual shared 2/3/4 demos, and other real card families where applicable. Distinguish from badges, meta, numbering, CTA, stat labels.
- `--type-body` already has min1rem; check **computed** typography and cascade first. If text already computes >=1rem, do not fake a fix; try a restrained 1.0625rem–1.125rem for substantive descriptions with visual evidence.
- One global semantic card-body approach, not a broad site-wide font change; preserve existing daisyUI card structure, rounded geometry, colors, CMS fields and OWNER copy. Avoid CSS specificity wars.
- Actual computed before/after table + 1440/900/390/320 screenshot comparisons `/#passer` vs `/design-system/` and long/dark cards, focused QA and one bounded verify. No CMS saves needed if source/editor untouched.
- H-026 Hero/Footer reuse remains **QUEUED** until this readability review is resolved; H-024B BLOCKED, H-022 PARKED; no launch.

---

## OWNER daisyUI reuse rule — MWS-029 / H-024A4 now; H-026 after review

Date: 2026-10-17. OWNER requires use of **real daisyUI components wherever suitable**, explicitly naming [Footer](https://daisyui.com/components/footer/) and [Hero](https://daisyui.com/components/hero/). This strengthens MWS-020 with canonical MWS-029 in `AnelPasic/MedonWebSystem`.

**Current H-024A4 implementation must use genuine daisyUI Card structure** (`card`, `card-body`, `card-title`, optional `card-actions`), shared between the production CMS renderer and actual demos. A standalone `card` class on custom `info-item` markup is insufficient. Preserve the existing CMS fields, automatic open/numbered default, actual 2/3/4-column behavior, child surfaces and approved demo appearance.

**Footer and Hero:** inspect existing custom `HomeFooter.astro` and `CommercialHero.astro` against official daisyUI structures; next queued narrow `H-026` spec: `coordination/H026-DAISYUI-HERO-FOOTER-REUSE.md`. Do NOT mix Hero/Footer changes into H-024A4 or reopen OWNER-approved four Hero variants (D-088); H-026 may run after H-024A4 OWNER review, with actual visual parity evidence. No cosmetic generic daisyUI swap just for classes; preserve copy, SEO, CTA, proof, CMS/UX, theme.

H-024B stays blocked; H-022 parked; no launch.

---

## Historical handoff — H-024A4 CARD PARITY (DELIVERED; D-091 type readability follow-up)

Date: 2026-10-17. Direct OWNER CMS and visual screenshot feedback: homepage `Boksvariant: Kort` does **not** look like approved card demonstrations on `/design-system/`. Full diagnosis and scoped correction: `coordination/H024A4-CMS-CARD-DESIGN-PARITY.md`.

Inspect current main and preserve OWNER's real `home.json` saves. The demos render `card > card-body > card-title`, while real ordinary CMS items render `info-item.card` with separate inherited composition CSS. Make them share the same approved visual card primitive. Keep Standard as editorial when no explicit card selected; do not convert all section steps to cards without selection. The pictured `mekanisme` 4-step frontend is **not** the CMS-edited `passer` 2-card section; capture and compare the same section and test separate four-card step fixture. Preserve section/child backgrounds, dark contrast, title/text, optional links and original numbers. Do not alter approved design-system look.

Prove browser computed geometry + actual CMS card change → Git → native build → live `passer` view → restore; compare across routes/widths and 2/3/4 card states. H-025 Heroes remain OWNER PASS under D-088; this finding means H-024A3 is **REVISE**, not PASS. H-024B stays blocked, H-022 parked, launch gates unchanged. Push complete scoped fix and STOP for OWNER same-section visual review.

---

## Latest OWNER verdict — D-088 H-025/H-025A HERO PASS / NO ACTIVE IMPLEMENTATION HANDOFF

Date: 2026-10-17. OWNER directly confirms: **"ja, testet og ser bra ut på Heros."** The four predefined page-specific Hero presets and corrected nondestructive `Sentrert uten bilde` behavior are **OWNER ACCEPTED** under D-088. Do not reopen Hero layouts or the OWNER-liked lower design-system component treatments.

Current separate gate: H-024A3 full ordinary section editor/layout/box UX remains awaiting its own OWNER approval. **Do not start H-024B yet**; it would require that gate and a separately authorized scoped implementation (recommended first on one service page). H-022 remains parked; no public launch, intake/indexing, proof-authority or unrelated content changes authorized. This is a decision receipt, not a new code task.

---

## Historical handoff — H-025A HERO PRESET / CMS PARITY CORRECTION (DELIVERED; D-088 PASS)

Date: 2026-10-16. Direct OWNER screenshot of Konvertering editor + feedback: **"saken er bare at hero valg ikke tillater alle definerte varianter."** H-025 is **REVISE for editor option parity**, not fully approved.
Detailed authorized correction: `coordination/H025A-HERO-PRESETS-CMS-PARITY.md`.

- Current CMS exposes 3 layout values, but the design-system also demonstrates **Sentrert uten bilde**. On a page with uploaded Hero image there is no independent, obvious way to choose this preset without removing media.
- Present **four meaningful explicit presets**: Tekst venstre/bilde høyre, Bilde venstre/tekst høyre, Sentrert med bilde, **Sentrert uten bilde**. Selecting no-image must never delete/clear saved image, crop, alt or related proof data.
- Keep one typed reusable Hero and current sources; preserve all existing page defaults and backwards compatibility.
- **Kort/Lang overskrift** are stress tests, **Tjeneste/Priser** are examples, **not** additional distinct layout presets. Relabel demo versus CMS choices precisely.
- OWNER likes the elements *below Hero demos*; they must remain unchanged.
- Authenticated `konvertering` CMS selection → Git → native Build → live media-free Hero → restore image-visible → verified Worker; source/CTA/SEO/proof/default checks for home, service, non-service; focused responsive/browser/schema QA. Then STOP for OWNER review.
- H-024B stays blocked; H-022 parked, noindex and intake unchanged. No other redesign authorized.

---

## Latest OWNER feedback — H-025 demo components BELOW Hero: POSITIVE / no new implementation task

Date: 2026-10-16. OWNER says: **"Det som er under variantene ser veldig bra ut."** This applies only to the design-system content **beneath the Hero-variant demonstrations**: routine UI controls, cards, forms, surfaces, CMS section/box demonstrations, commercial examples and PageList. Preserve that visual direction. **Do not misrecord this as full approval of the Hero layouts, live page-family Hero experience or complete CMS gate.** H-025 technical delivery at `46aacc8` stays STOP for OWNER review; H-024B blocked; H-022 parked. This is review feedback, **not an authorization to continue coding**.

## Historical H-025 handoff — DELIVERED / OWNER REVISE for CMS preset parity

Date: 2026-10-16. Authority: direct OWNER instruction in ChatGPT.
Exact scoped contract: `coordination/H025-GLOBAL-PAGE-HERO-VARIANTS.md`.

OWNER decides: **service pages AND every other relevant page family must use predefined, globally reusable Heroes, with a page-specific variant choice in Pages CMS**. Current H-024A3 has been delivered at fbcf0de; preserve its box/layout correction and any later OWNER content edits.

Execute H-025 as an independent **Hero-only** scope:
- one actual shared typed Hero renderer/variants for home, service, pricing, index, article, assessment and utility; explicitly audit dedicated glossary and 404
- CMS per-page Hero layout select: text-left/image-right, image-left/text-right, centered with/without image
- display a consistent component family in `/design-system/`; no meaningless demo-only selector
- preserve exact page-owned H1/support/CTA/photo/crop, pricing source, proof permission/gates, semantics/SEO, global daisyUI theme, content and all defaults
- no duplicated editable Hero or commercial source, no image requirement, no invented CTA/proof; existing mobile text-first reading order
- test real authenticated CMS save/build/visible Worker/restore for service + non-service + home and focused multi-route/multi-width QA
- leave H-024B blocked, H-022 parked, noindex and intake disabled; STOP for OWNER whole-site Hero/editor review

Do not start full page-builder rollout or unrelated redesign. If a special page conflicts with normal Hero semantics, preserve content, document proposed safe adaptation/explicit exception, and request OWNER decision instead of forcing misleading structure.

---

## Historical handoff - H-024A2 CMS CO-LOCATED SECTIONS CORRECTION (DELIVERED)

Date: 2026-10-15
Authority: OWNER / D-087
Exact contract: `coordination/H024A2-CMS-COLOCATED-SECTIONS.md`

OWNER tested H-024A in real Pages CMS and REJECTS the editor UX as currently structured.

Pull latest main including OWNER test commits and execute H-024A2 only.

Key correction:
- the draggable section row must also contain the actual editable content for that section
- remove the separate order-only registry model
- put Sections directly after Hero in the editor
- for this homepage pilot, use exactly eight draggable/editable rows and no Add/Delete
- restore the known original order and remove OWNER's test duplicate calculator
- fix primary schema validation so duplicate singleton/UID/anchor states fail before render
- keep one source of truth: move Selector/Calculator/Packages/Proof/Assessment/FAQ editable data into their own ordered block
- /priser/ resolves package data from the homepage Packages block
- hero proof resolves homepage Proof block
- do not duplicate special data elsewhere

Authenticated acceptance must visibly prove:
CMS move Packages to first after Hero -> save -> Git diff -> successful Cloudflare build -> live Worker actually shows Packages after Hero -> screenshot -> restore to original order -> successful build -> live restore.

Do not claim success from JSON order alone.

Preserve all public copy/business logic/proof authority/noindex/intake and H-023B architecture.
H-024B remains untouched. H-022 stays parked.

Push clean final main, verify Worker, update coordination, then STOP for OWNER editor review.

---














## Active handoff - NONE / CENTRAL TERMINOLOGY DELIVERED / STOP FOR REVIEW

Actual direct OWNER Codex request authorizes pulling latest main, one CMS-editable terminology source, selective accessible inline explanations and `/begreper/`, with the 25 specified initial terms/four categories. Preserve existing commercial/proof/calculator/hero/pricing/intake/noindex scopes and page hierarchy beyond the glossary/internal links. Full verify and four-width hover/focus/tap/outside/Escape/layout/no-JS/anchor/source/CMS QA, push main and verify the existing connected review Worker, then stop for review. Incoming main `8b90bbfdc70e46fb62276600770fa4a95058098a` is current after ff-only pull.

Implemented/pushed at **556552b7d543a33f379c85bff9ccc614444cde76**. Native Build **059ff328-5efd-4387-875f-30a467308da7** succeeds, Worker **31ec541b-2803-44bb-a081-5c96baec7e66**; 53 live assets match and all four-width terminology/anchor/no-JS checks pass. Exact main/native/live receipt: CODEX-TO-CHATGPT / `evidence/terminology/`. New definitions remain DRAFT / NON-AUTHORITATIVE. Prior calculator review and separate H-017A/CMS/content/launch dependencies remain independent. This actual request supplies scoped implementation/delivery authority, not content acceptance or launch permission. **STOP for OWNER + STRATEGY_CONTENT review; no active next implementation.**

## Existing separate delivery - TWELVE-MONTH CALCULATOR / STOP FOR REVIEW

2026-10-13 actual direct OWNER continuation moves I dag / Scenario under inputs so the graph gets full height, and replaces 6 months with 12. Implemented/pushed at `0e58d5ae04d22dbab1fd841436048f1ff7e45abd`. Cards/X now sit left beneath fields, graph fills the right column on desktop; both graph and monthly Scenario use month 12. Existing centered copy, monthly compound math/ratio, controls/sliders, illustration disclaimer and unrelated scopes remain preserved. Source JSON/CMS is unchanged. Existing main/Worker/QA authorization continues. Exact delivery: CODEX-TO-CHATGPT / `evidence/calculator-year/`. STOP for OWNER section review; no active next implementation or inferred acceptance/launch authority.

## Historical delivery - ALL CALCULATOR INTRODUCTORY TEXT CENTERED

2026-10-12 actual direct OWNER correction explicitly includes the heading and explanatory paragraph in the text that must move higher and become centered. Implemented/pushed at `c69fb694ab40c303a7085715783ed62e047f2e92`: eyebrow, heading, explanation and formula form one centered introduction above inputs/chart. Text, math, sliders, cards and prior ratio/removal behavior are unchanged. Existing main/Worker/QA authorization continues. Exact delivery: CODEX-TO-CHATGPT / `evidence/calculator-centered/`. STOP for OWNER section review; no active next implementation or inferred acceptance/launch authority.

## Historical delivery - OWNER CALCULATOR PRESENTATION CORRECTION

2026-10-12 actual direct OWNER continuation: remove the public hypothetical-example sentence, replace Forskjell with X in the form 5,5X (550%), and move the existing eyebrow/formula higher and center them. Implemented/pushed at `dbe9398966f0dfd7c31aef811d94606220a1202b`. X is scenario/current; percentage is the same total relative level with today's result as 100 %. Existing monthly growth math, cards, sliders, chart and illustration label remain preserved. The inactive caveat source/CMS field remains; no architecture change. Existing main/Worker/QA authorization continues. Exact delivery: CODEX-TO-CHATGPT / `evidence/calculator-multiplier/`. STOP for OWNER section review; no active next implementation or inferred acceptance/launch authority.

## Historical delivery - OWNER MONTHLY CALCULATOR CORRECTION

2026-10-12 actual direct OWNER continuation: traffic increase is per month with compound growth, and all four numeric fields move left beneath the existing text. Implemented/pushed at `78b3dcca8fd81e61feebe89e2c3d98b23098ab5c`. Six monthly scenario points compound the chosen traffic rate; Scenario / Måned 6 shows that month's outcome, not a cumulative total. Monthly label and 10 % example default are the only content changes. This supersedes the previous one-time math/linear illustration within the calculator; all unrelated scopes remain preserved. Existing verification/publication authorization continues. Exact full/focused/local/live/native delivery: CODEX-TO-CHATGPT / `evidence/calculator-monthly/`. STOP for OWNER review; no active next implementation, new content lock or inferred verdict.

## Historical delivery - OWNER CALCULATOR CHART

2026-10-12 direct OWNER instruction in Codex authorizes one homepage-calculator enhancement: compact live SVG with Uten optimalisering / Med optimalisering, six illustrative month steps based on existing monthly outputs, explicit Illustrasjon - ikke prognose, and synchronized numeric/range controls for both conversion rates. Preserve existing section copy/math/result cards, all other sections/pages, accepted hero/proof, packages/chrome, CMS, noindex and disabled intake. Full verify, 1440/900/390/320 QA, main/native Worker verification and exact outbound evidence followed by STOP were explicitly requested. This consumes the actual direct instruction; no new numbered decision, content lock or launch authority is inferred.

Implemented/pushed at `9773fcbb1d11cb7b41630084d16e0c30a3493ed8`. Exact local/live/native delivery evidence: CODEX-TO-CHATGPT and `evidence/calculator-chart/`. STOP for OWNER review; no active next implementation. H-017E is already PASS / COMPLETE under incoming genuine D-080 and remains unchanged.

## Completed delivery - H-017E / accepted under D-080

2026-10-12 IMPLEMENTATION receipt: H-017E is implemented and pushed at `13402d0383ab3b2e93aca81145bfc95324abacda`. Exact full/focused/local/live/connected Worker evidence is recorded in CODEX-TO-CHATGPT and `evidence/h017e/`. STOP for OWNER + STRATEGY_CONTENT visual review; no new acceptance or next implementation is inferred. H-017D/D-078, H-017C/D-077 and H-017B remain complete within their existing scopes; launch gates remain separate.

## Completed handoff - H-017E HOMEPAGE HERO PROOF

Date: 2026-10-12
Authority: OWNER + STRATEGY_CONTENT / D-079
Exact contract: `coordination/H017E-HERO-PROOF.md`

H-017D is now PASS / COMPLETE under D-078 at implementation `73a5b913a5ce609d8d3a8b3c5002206606199806`.

Pull latest main and implement only H-017E:
- attach one compact proof panel to the existing homepage hero image
- derive it from the first publishable selected homepage proof case
- current expected output: **ROAS 4,3x -> 17,2x** / **Eurotents · Google Ads**
- fail closed if featured proof is not publishable
- preserve hero copy, CTAs, photo/crop and H-017D lower proof
- no duplicate proof data, no extra caveats/dates/metrics, no wider redesign/CMS work

Run focused hero/proof QA + full verify, push to main, verify connected Worker, update CODEX-TO-CHATGPT, then stop for OWNER + STRATEGY_CONTENT visual review.

---

## Completed review - H-017D / D-078

OWNER + STRATEGY_CONTENT PASS. The simplified public proof at `73a5b91` has the intended concise information density. No further H-017D revision is required.

## Completed handoff - H-017D PROOF SIMPLIFICATION

Date: 2026-10-12
Authority: OWNER + STRATEGY_CONTENT
Exact contract: `coordination/H017D-PROOF-SIMPLIFY.md`

H-017C remains accepted. This is a narrow subtraction pass only.

Simplify the public proof renderer to the information density defined in the contract:
- keep client / metric / delta / before -> after / period
- stop rendering work/intervention and limitation/caveat paragraphs publicly
- keep all internal evidence and proof gates intact
- no redesign or wider CMS work

Pull latest main, implement, full verify, push, verify Worker, report, stop.

---


## Active handoff - NONE / H-017C COMPLETE

2026-10-12 OWNER + STRATEGY_CONTENT review passes final H-017C under D-077. Implementation `317ae431f1947cddc46173af6fbb6d8b724bb49e` and its live/local 1440/390/320 evidence are accepted for the proof visual/content scope. Two safe content-only service headings were polished afterward at `59b248355bc6e125c09f2a5479b59a6bb13ed854` and `3bc87cff00747b09f4618bdc32cf4a9a4c96a8e3`. Do not reopen H-017C or H-017B. No Codex action is required for these wording changes. H-017A technical review and launch/indexing/intake gates remain separate. Earlier H-017C versions below are historical and superseded.

## Completed handoff - H-017C FINAL / D-075-D-076

Date: 2026-10-11
Authority: OWNER + STRATEGY_CONTENT
Exact contract: coordination/H017C-PROOF-PUBLISH.md

This supersedes the earlier H-017C instructions that left the homepage empty or limited public proof to Nysta.

OWNER has now approved Eurotents, Nysta, Helt Opplagt, Tankeverksted and Oracles for public reference use. Permission is not a blocker for these five.

Implement the final locked placement:
- homepage: Eurotents featured/dominant + Nysta + Helt Opplagt supporting
- /konvertering/: Nysta primary
- /synlighet/: Helt Opplagt primary
- do not render Oslo Privatklinikk
- do not manufacture comparable before/after data for Tankeverksted or Oracles
- do not create /resultater/ yet

Add/import the proof records and the smallest service-page/CMS support needed for these placements. Preserve strict proof gates, pricing/order/CMS architecture, service visuals, noindex and fail-closed intake.

Run full QA, push to main, verify the connected Worker, update CODEX-TO-CHATGPT with exact commits/evidence, then STOP for OWNER + STRATEGY_CONTENT review.

---


## Active handoff - H-017C REVISED

Date: 2026-10-11
Authority: OWNER + STRATEGY_CONTENT D-072-D-074
Exact contract: coordination/H017C-PROOF-PUBLISH.md
Candidate audit: coordination/PROOF-CANDIDATE-AUDIT-2026-10-11.md

Implement only:
- Nysta proof on /konvertering/.
- Reusable proof component and homepage slot readiness.
- Homepage must render no proof while no approved homepage case is selected.

Do NOT render or select Oslo Privatklinikk.
Do NOT independently publish Eurotents, Helt Opplagt, Tankeverksted or Oracles from the candidate audit.
Do NOT weaken proof gates.

Preserve all current pricing, ordering, CMS, service visuals, noindex and fail-closed intake.

Follow coordination/COPY-STYLE.md.

Run full proof/visual/regression QA, push to main, verify Worker, then STOP for OWNER + STRATEGY_CONTENT proof review.

Do not create /resultater/ yet.


---

## Active handoff - H-017C

Date: 2026-10-11
Authority: OWNER + STRATEGY_CONTENT D-069-D-071
Exact contract: coordination/H017C-PROOF-PUBLISH.md

Implement the two locked proof placements exactly.

- Homepage: Oslo Privatklinikk only.
- /konvertering/: Nysta only.
- Use the updated publishable proof registry records on main.
- Build one visually strong reusable proof component.
- Do not render extra evidenceMetrics.
- Do not weaken getPublishableCases or any publication gate.
- Keep source/provenance internal.
- Preserve current pricing, ordering, CMS, service visuals, noindex and fail-closed intake.

Follow coordination/COPY-STYLE.md.

Run full proof/visual/regression QA, push to main, verify Worker, then STOP for OWNER + STRATEGY_CONTENT proof review.

Do not create /resultater/ yet.


---

## Active handoff - NONE / STOP FOR OWNER CMS REVIEW

H-017B is technically complete and delivered to main/the connected static review Worker. Actual authenticated CMS edit `86211b5` and revert `acded21` each create one expected content commit, pass full verify/native builds, and update/revert the Worker. All 17 content Git blobs are restored exactly. OWNER must review the delivered CMS experience; no role acceptance, H-017A verdict, next page implementation or launch is inferred. Exact source/build/screenshots are in CODEX-TO-CHATGPT and evidence/h017b; this receipt's own revision is identified through Git history.

## Completed handoff - H-017B / DIRECT OWNER CONTINUATION

2026-10-10. Following the H-017B gap check, actual OWNER reply in Codex: "ok, gjort ferdig?". IMPLEMENTATION treats this in context as the scoped instruction to finish queued H-017B under D-065 and `H017B-CMS-UX-DEPLOY.md` (spec commit `ba0cb912e3c504020ed22169f8bba99a433d617c`). Complete the CMS editor information architecture, data-preservation round trip and build/deploy verification, using the existing D-013 static review target. Preserve website design/copy/prices/proof, default-off intake, noindex, English and read-only references. Attempt authenticated CMS verification only when access is available; the actual OWNER save/revert remains the final proof if Codex cannot authenticate. Stop for OWNER CMS review. No H-017A verdict or launch approval is inferred.

## Previous stop - OWNER menu / Innsikt correction

The inline OWNER menu / Innsikt correction is implemented. Stop for OWNER review of this correction; H-017A technical review remains required and H-017B remains queued/unexecuted. No further page propagation or production enablement is authorized.

## Completed handoff - Inline OWNER menu / Innsikt correction

2026-10-10. Actual OWNER request in Codex: "toppmeny Priser må peke til /priser siden - Innsikt fortsatt på gammel mal."

Scoped correction: change the shared CMS navigation price destination to `/priser/`; render the `/innsikt/` overview using the existing accepted chrome/palette/hero/section pattern and its current content. Implementation interprets "Innsikt" as the named overview only. Retain its draft status/authority, copy, metadata and guide destinations. Other page templates/content, guide articles, package prices/art, CMS editor, noindex and intake remain preserved. This is a direct OWNER correction, not STRATEGY_CONTENT content acceptance or H-017B execution. Validate desktop/mobile and use the existing D-013 static review delivery boundary; stop after this correction. No production enablement.

## H-017A remains stopped for technical review

H-017A implementation and local verification are complete. OWNER + STRATEGY_CONTENT technical review is required before another scoped handoff. Review intake remains disabled; no real submissions, email, secrets, indexing or production enablement are authorized. Exact delivery and Worker evidence are in `CODEX-TO-CHATGPT.md` and `evidence/h017a/`.

## Completed handoff - H-017A

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT D-062
Exact contract: coordination/H017A-INTAKE-READINESS.md

This is parallel technical work while OWNER/STRATEGY_CONTENT review content, visuals, proof and CMS.

Execute H-017A exactly.

Main goal:
- make direct package ordering technically ready behind a dedicated fail-closed public feature gate;
- reuse existing lead transport, attribution and idempotency patterns;
- keep both review forms unable to send real data;
- harden tests and production guards;
- document all remaining OWNER/OPS launch dependencies.

Do not touch package/service copy, prices, visuals, proof, SEO/AI rollout, English, noindex, live secrets or production enablement.

Follow coordination/COPY-STYLE.md for any visible status copy.

Push to main, verify the review Worker remains fail-closed, update coordination/evidence, then STOP for OWNER + STRATEGY_CONTENT technical review.

No real submissions or emails.


---

## Completed handoff — H-016 / STOP FOR OWNER REVIEW

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT D-053–D-057
Exact contract: coordination/H016-CMS-EDITOR-PRICING.md

H-015 is usable. Stop polishing package artwork in code.

Implement the CMS/editor-first pricing pass exactly.

Priorities:
1. expose every safe customer-facing package/caption/icon/image/CTA-label field in Pages CMS;
2. keep key/href/preselection routing protected;
3. use the current compact H-015 pricing-card anatomy on the homepage;
4. on /priser/, render package details open by default but collapsible;
5. remove the old Optimalisering distinction;
6. set Vekst selection rule to “Velg Vekst når to forbedringer kan forsterke hverandre.”;
7. replace “Ett viktig problem om gangen.” with “Ett viktig forbedringsområde om gangen.”;
8. avoid “problem” in package/pricing customer copy;
9. preserve prices, direct-order behavior and the single shared package source;
10. attempt authenticated CMS save/revert verification if access is actually available.

Do not rewrite unrelated content.

Push to main, verify Worker, update coordination/evidence, then STOP for OWNER review.

After this handoff, OWNER intends to do routine package wording/image changes directly in Pages CMS.


### H-016 implementation receipt (no new approval)

2026-10-09, IMPLEMENTATION. Incoming main **9068011f73ec263a82ab8f19d9bf20bae014398b**; implementation/local evidence **8ff933cd49423dbd661032b9b9556e32a7aff81e**. Consumed active H-016 exactly under D-053–D-057 / `coordination/H016-CMS-EDITOR-PRICING.md`. Genuine D-053 makes H-015 visually usable; no further package-art polish. One existing `home.homepage.packages` object supplies the same complete compact-card anatomy on home and pricing: native details closed on home, open and user-collapsible on `/priser/`. Homepage position/surroundings are preserved.

All safe section/package/caption/icon/image/CTA-label fields are exposed with neutral editor labels. Former embedded package headings/free-check label now use shared `labels`; the existing detail-link label supplies each native summary (default “Se pakken”). Key, order href/preselection and detail href are readonly and schema-protected; order form/intent/endpoint/backend remain untouched. Independent SVG/WebP/PNG pickers use `packageVisuals`, alt/crop and existing motif/caption fallback. CMS select configuration uses official `options.values`, including one inherited image-kind shape repair required for valid config; choice values and service content/art are unchanged.

Exact defaults applied: Optimalisering descriptor “Ett viktig forbedringsområde om gangen.”; old negative distinction empty and absent in both modes; Vekst selection “Velg Vekst når to forbedringer kan forsterke hverandre.”; decision-strip wording naturally uses forbedringsområde. No package/pricing “problem” remains. All other existing package copy/prices/VAT/Partner fra/recommendation/art, other page JSON/status/authority, proof/chrome/provider/i18n, accepted service HTML/styles, backend and read-only system/project are preserved. Historical H-012/H-014/H-015 audits/history remain; active verification now checks current shared CMS source and H-016 modes instead of frozen editable strings. Commercial reference binding is one pass, preserving inserted CMS strings verbatim.

Final restored full verify: **121 files / zero diagnostics; 55 tests; 444 links**. **40** whole-site synthetic browser checks; four accepted routes at **1440/390/320**, **187 frozen hashes / 105 retained style/geometry snapshots / 12 captures**. Same normalized card anatomy, native keyboard/no-JS disclosure, initially open pricing/manual collapse, all query/home/pricing/manual/history/invalid package choices and disabled/programmatic/no-JS submission/no false acknowledgment pass. Real reversible CMS edits pass full verify with edited copy and independent supplied SVG/WebP/PNG; single-image swap, missing-file fallback, alt/crop, changed price units, optional Partner prefix and numeric-ending names are covered; all source bytes restored/test assets removed. Fresh technical review's two findings (select shape and repeated-name substitution) are resolved, independently rechecked with **7/7 targeted tests**; no unresolved technical issue. This supplies no formal role verdict. Zero review POST/real orders/live emails.

**Authenticated CMS dependency — OWNER / H-016 acceptance:** actual connected Chrome opened app.pagescms.org and redirected to `/sign-in?redirect=%2F`; editor/media/save-revert not proven. OWNER must log in with GitHub, choose `AnelPasic/optimalisering.oslo.noV3.3` main → Forside og felles pakker → Forsidens innhold → Felles pakker (homepage.packages), verify editable fields/readonly routes/packageVisuals, save one harmless caption/support change, verify both routes after the native build, then revert/save and record actual commits/results. Source/evidence: implementation **8ff933cd49423dbd661032b9b9556e32a7aff81e**, `app/docs/h016-package-cms.md`, `coordination/evidence/h016/cms-session.json`. Local implementation/build/browser checks and review delivery can proceed independently.

**Required next review — OWNER:** review the complete home/pricing package presentation and editor-first workflow against H-016, including the remaining authenticated check. Routine safe package wording/image tuning now belongs in Pages CMS under D-054. Record genuine reviewed revision/verdict and scope in DECISIONS/REVIEW-QUEUE; no new material approval/lock, formal RED_TEAM verdict, other-page propagation, proof publication, service art, live ordering or production launch is inferred. **STOP for OWNER H-016 review; no next code/page implementation is active.**

**Main / live H-016 receipt:** pushed **21b4e9f3e7127f3cf92b325d269414c19b0d38c7** after latest-main ff-only check found no further updates. Implementation **8ff933cd49423dbd661032b9b9556e32a7aff81e**; native connected Workers Build **b384d89d-69dd-4119-9983-876e232fc980** succeeded; verified Worker **65b5d964-9295-4594-95cb-214a573ae316**. All 15 content HTML, four public CSS (line-ending equivalent where applicable), selected/alternate three home WebPs, robots/empty sitemap/noindex and intake GET 404 match the tested build. Live home/pricing/service **1440/390/320** checks pass with **187 frozen hashes / 105 retained snapshots / 12 captures**; actual card heights match the final local build. Shared normalized anatomy, home collapsed/pricing initially open and user-collapsible, exact copy cleanup, native keyboard/no-JS and all order query/home/pricing/manual/history/invalid selections plus disabled/programmatic/no-JS submit/no false acknowledgment pass. Zero POST/real orders/live emails. No direct/backend deployment, secret, infrastructure, domain cutover or enablement change. Authenticated CMS editor/media/save-revert remains the exact documented OWNER step after actual sign-in redirect; local tests and live static checks do not prove authenticated CMS editing. This following receipt adds live evidence and corrects the CMS entry/guide to the neutral “Forside og felles pakker” label (targeted CMS tests 3/3 PASS), without changing any website asset; identify its own SHA through Git history. **STOP for OWNER H-016 review; no next code/page implementation is active.** Routine safe package tuning belongs in Pages CMS under D-054; unrelated content/proof/service-art/launch gates remain.

Live evidence: [home 1440](evidence/h016-live/home-packages-1440.png) / [390](evidence/h016-live/home-packages-390.png); [pricing initially open 1440](evidence/h016-live/pricing-initial-1440.png) / [390](evidence/h016-live/pricing-initial-390.png); [manual collapse](evidence/h016-live/pricing-manually-collapsed-390.png); [responsive/order/preservation checks](evidence/h016-live/checks.json); [native build/assets](evidence/h016-live/deployment.json); [all captures](evidence/h016-live/README.md).

Local evidence: [home 1440](evidence/h016/home-packages-1440.png) / [390](evidence/h016/home-packages-390.png); [pricing initially open 1440](evidence/h016/pricing-initial-1440.png) / [390](evidence/h016/pricing-initial-390.png); [manual collapse](evidence/h016/pricing-manually-collapsed-390.png); [responsive/order/preservation checks](evidence/h016/checks.json); [CMS source/asset regression](evidence/h016/package-source-regression.json); [actual CMS session](evidence/h016/cms-session.json); [resolved technical review](evidence/h016/implementation-review.md); [all evidence](evidence/h016/README.md).

---

## Completed handoff — H-015

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT D-050–D-052
Exact contract: coordination/H015-PRICING-VISUAL-POLISH.md

H-014 compactness passes. Do not reopen density/copy/order logic.

Implement visual polish only:
- replace bare curve feel with stronger editorial infographic motifs;
- recreate the useful fragments of the previously approved pricing illustration as clean SVG-style package visuals;
- Optimalisering = one controlled lever/path;
- Vekst = one clearly stronger compounding path;
- Partner = several coordinated growth tracks;
- optional tiny semantic callouts may sit in HTML beside the SVG if they improve comprehension;
- no percentages or numerical performance claims;
- no whole-card image.

Preserve:
- H-014 card heights/density;
- all copy;
- icon rows;
- Se detaljer;
- direct-order CTA/preselection;
- disabled review submit;
- homepage compactness;
- shared CMS source.

Push to main, verify Worker, update coordination/evidence, and STOP for OWNER + STRATEGY_CONTENT visual review.


### OWNER visual-reference followup / implementation receipt (no new approval)

2026-10-09, IMPLEMENTATION: Incoming **041be18218543f89c0e69f3031165b31b42ea110**, implementation/local evidence **d2ab35bb4df7385a2ef31cebf99760f72ec8160f**. D-050–D-052 / exact H015-PRICING-VISUAL-POLISH.md authorize visual-strip polish only. OWNER's actual subsequent message “bruk heller dette som grunnlag” supplies the preserved original reference at evidence/h015/owner-reference.png. Local reusable SVG motifs use its fading green/blue/teal curves, filled arrowheads, soft mint wash and compact mint HTML callouts; no whole-card artwork or reference copy/CTA/claims is imported. Optimalisering retains one controlled moderate path and Én spak / Tydelig fremgang; Vekst has two short reinforcing inputs merging into one dominant accelerating path and To grep / Forsterker hverandre; Partner has three coordinated rising tracks and Flere kundereiser / Prioriteres løpende. The exact H-015 optional captions are editable alongside independent visualAsset fields in the existing shared home package source; assets still replace both motif and caption, with alt/crop/contain/cover and missing-file fallback preserved.

All six default heights are exactly H-014: pricing 1440 **770 / 770 / 770px**, 390 **758.89 / 813.39 / 721.89px**, 320 **809.25 / 840.56 / 863.75px**; home 1440 **482 / 488.38 / 482px**, 390 **482 / 516.38 / 482px**, 320 **521.17 / 521.17 / 521.17px**. Every card HTML element/style/geometry outside the visual interiors is unchanged. Existing copy/prices/VAT/Partner fra/Vekst Anbefalt, plum recommendation, icons, short/long details, decision/multiplier, six direct CTAs and one disabled order form remain. H-013 order component/payload/backend are unchanged.

Fresh full verify: **117 files / zero diagnostics, 50 tests, 447 links**; **40** whole-site synthetic browser checks; four accepted routes at 1440/390/320; **187 frozen hashes / 114 retained snapshots / 21 captures**. Home/pricing graphics/captions also fit at 1201/1200/1180/1101/1100/1024/901/900/768/651/650, fourteen widths total; independent review's tablet-caption finding is corrected inside the visual strip and rechecked. Real source/CMS-caption/missing/supplied SVG-PNG fixture, full verification with supplied assets and final restored-source verification pass. All local SVG gradient references resolve uniquely. Native detail/multiplier keyboard/no-JS reading, no default/expanded overflow, all query/home/pricing CTA/manual/history/invalid selection and disabled/programmatic/no-JS submit/no false acknowledgment pass. Fresh independent technical review has no unresolved issue and supplies no formal role verdict. Zero review POST/real orders/live email. Other page JSON/status/authority, home outside packages, service HTML/styles/copy/chrome/fit/proof, all backend and system/project are preserved. CMS authenticated save remains manual/unproven; separate service art, any later external package-art integration and real-order/launch dependencies retain their actual gates. **STOP for OWNER + STRATEGY_CONTENT H-015 visual review.** No next implementation is active.

**Main / live H-015 receipt:** pushed **5d5b33eb364252ba9ec82346aaef3e20d28d9d94** after latest-main check found no further updates. Implementation **d2ab35bb4df7385a2ef31cebf99760f72ec8160f**; native Workers Build **2bafbfc6-694f-48e4-b2f9-378d12f64a35** succeeded; verified Worker **96a9284c-e117-4d13-93af-34b0a90a22a1**. No direct/backend deployment, secret, infrastructure or enablement change. All 15 content HTML, four public CSS (line-ending equivalent where applicable), selected/alternate three home WebPs, robots/empty sitemap/noindex and intake GET 404 match the tested build/safeguards. Live four-route 1440/390/320 checks preserve 187 frozen hashes, 114 snapshots, all card HTML outside visual interiors and exact H-014 heights. Pricing/home graphics and semantic callouts also fit all eleven added intermediate widths (fourteen widths total), including the corrected tablet cases. All local gradients resolve uniquely; short/long copy, native keyboard/no-JS detail, default/expanded overflow, all query/home/pricing/manual/history/invalid package choices and disabled/programmatic/no-JS submit/no false acknowledgment pass. Zero POST/real orders/live email; 21 live captures in evidence/h015-live/. This following evidence/coordination receipt changes no website asset; identify its own SHA through Git history. **STOP for OWNER + STRATEGY_CONTENT H-015 visual review.** Authenticated CMS save and later artwork/real-order/launch gates remain separate; no next implementation is active.

Live evidence: [pricing cards 1440](evidence/h015-live/cards-1440.png) / [390](evidence/h015-live/cards-390.png); [home 1440](evidence/h015-live/home-packages-1440.png) / [390](evidence/h015-live/home-packages-390.png); strip [Optimalisering](evidence/h015-live/visual-optimalisering.png), [Vekst](evidence/h015-live/visual-vekst.png), [Partner](evidence/h015-live/visual-partner.png); [responsive/order checks](evidence/h015-live/checks.json), [native build/assets](evidence/h015-live/deployment.json), [all captures](evidence/h015-live/README.md).


---

## Completed handoff — H-014

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT D-047–D-049
Exact contract: coordination/H014-COMPACT-PRICING.md

H-013 ordering/data architecture passes. Its visual card density does not.

Execute H-014 exactly.

Core rule:
**The card helps the customer choose. The disclosure explains the package after they want more detail.**

Do not rewrite package strategy.

Implement:
- compact three-card comparison;
- exact short visible copy from H014-COMPACT-PRICING.md;
- compact horizontal visual area;
- compact icon row;
- long existing package copy moved behind native collapsed Se detaljer;
- homepage cards even shorter;
- direct ordering preserved;
- free check remains secondary.

Keep the whole card semantic HTML. Use SVG/image only for conceptual visual/icon artwork.

Measure and report actual before/after default card heights.

Push to main, verify Worker, update evidence/coordination, and STOP for OWNER + STRATEGY_CONTENT H-014 review.

Do not continue to other pages or production ordering.


### Implementation receipt (no new approval)

2026-10-09, IMPLEMENTATION: Incoming **ffa87852fd0a69683bd387607a82f9fdae6e4647**, implementation/local evidence **dc26e93a25eee77c2485c6e83fe9840de4d36f3b**. D-047–D-049 / exact H014-COMPACT-PRICING.md authorize this compact presentation revision. All three default desktop pricing cards are **770px** (H-013: 1862.81 / 1610.67 / 1858.63px); at 390px **758.89 / 813.39 / 721.89px** (H-013: 1788.03 / 1631.08 / 1860.33px), in Optimalisering/Vekst/Partner order. Home desktop **482 / 488.38 / 482px**; home 390 **482 / 516.38 / 482px**. Exact short fit/situations/icon labels use the existing shared source; every long H-012/H-013 offer sentence remains under native collapsed Se detaljer. Semantic text, horizontal 120/110px pricing visuals, compact icons, favored Anbefalt Vekst, Partner fra and all prices/VAT/order keys remain. Decision strip stays close; multiplier conceptual row leads, full existing explanation is natively disclosed. H-013 order component/payload/backend are unchanged; all six primary CTAs still preselect one safely disabled form. No transport/success state/production enablement. Full verify: 111 files/zero diagnostics, 49 tests, 447 links; 40 synthetic browser checks; four commercial routes at 1440/390/320; 187 frozen file hashes/93 retained geometry/style snapshots; 21 captures; real shared-source/missing/supplied SVG-PNG regression with full supplied-asset verification and restored-source final checks. Keyboard/no-JS detail and multiplier reading, no expanded overflow, order/query/CTA/history/invalid-query/programmatic/no-JS safety pass. Fresh technical review has no unresolved issue and adds no formal role approval. Zero review POST/real orders/live email. Home outside packages, other page JSON/status/authority, service HTML/copy/styles/chrome/fit/proof, all backend and system/project remain preserved. Authenticated CMS save and final package/service artwork remain manual/unsupplied. Evidence: coordination/evidence/h014/; current CMS/docs: app/docs/h014-compact-pricing-cms.md. Main/Worker receipt follows in CODEX-TO-CHATGPT and Git history. **STOP for OWNER + STRATEGY_CONTENT H-014 review.** No further pages/SEO-AI/English/proof/real-order/launch work is authorized.


**Main / live H-014 receipt:** pushed **d7a74c9e149c23166dc9ca6f11c8db895e6775d6** after latest-main check found no further updates. Native Workers Build **57047187-2b43-4157-bd61-6475262810b8** succeeded; verified Worker **24cffa47-842d-4c43-b322-368204fed170**. Implementation **dc26e93a25eee77c2485c6e83fe9840de4d36f3b**. No direct/backend deployment or secret/infrastructure/enablement change. All 15 content HTML, four public CSS (line-ending equivalent) and three selected/alternate home WebPs match the tested build; robots/empty sitemap/noindex and intake GET 404 pass. Live home/pricing/synlighet/konvertering at 1440/390/320 preserves 187 frozen hashes/93 retained snapshots, with exact same measured before/after heights as local. Exact compact copy, all long copy in collapsed native details, keyboard/no-JS reading, horizontal visual strips, no default/expanded overflow, all three package/query/home/pricing CTA choices, manual selection/history/invalid query and disabled/programmatic/no-JS submit/no false success pass. Zero POST/real orders/live email; 21 live captures in evidence/h014-live/. This following evidence/coordination receipt changes no website asset; use Git history for its own SHA. **STOP for OWNER + STRATEGY_CONTENT H-014 review.** Final approved package/service artwork and authenticated CMS save remain separate/manual; no next implementation, real ordering or launch is authorized.


---

## Completed handoff — H-013

**Date:** 2026-10-09  
**Authority:** OWNER + STRATEGY_CONTENT D-044–D-046  
**Exact implementation contract:** `coordination/H013-PRICING-VISUAL-ORDER.md`  
**Scope:** package visual architecture + card presentation + direct package ordering

### Objective

H-012 offer logic/copy is accepted. Its visual execution is not.

Do not brainstorm new packages or rewrite the offer.

Implement H-013 exactly:
- three independent package visual asset fields;
- structured package icon/focus fields;
- stronger, airier card presentation;
- direct ordering as the primary package CTA;
- one order section/form with package preselection;
- free check as secondary uncertainty path.

### Non-negotiable CTA hierarchy

Package primary CTAs:
- Bestill Optimalisering
- Bestill Vekst
- Bestill Partner

They must preselect the chosen package in the single /priser/ order form.

Secondary:
- Usikker? Ta en gratis sjekk
- homepage may also keep Se pakken as the detail link.

Do not leave “Ta en gratis sjekk” as the primary button on package cards.

### Safety

Do not enable production intake or fabricate successful order submission.

Build/test the full ordering UX and document the final enablement dependency.

### Visuals

Create the CMS/media architecture but do not invent final marketing artwork.

Current inline curves may remain only as fallback until ChatGPT supplies the approved three assets.

### Preservation

Preserve:
- H-012 exact commercial copy/price logic;
- Partner fra 14 900;
- Vekst Anbefalt;
- one shared package source;
- accepted homepage/pricing/service systems outside authorized pricing/order changes;
- proof/provider/i18n safeguards.

### Delivery

Run all H-013 acceptance/evidence checks from the contract.

Push to main and verify Worker.

Stop for OWNER + STRATEGY_CONTENT review and final package-visual asset supply.

Do not continue to SEO/AI/English/proof rollout.


### Implementation receipt (no new approval)

2026-10-09: incoming **f5edb6ac6b8060e25435ab9d89e31722e2f3a395**, implementation/local evidence **24818ee7997c816c752cc4c334cb65559f69a01c**. H-012 offer logic is preserved; independent visual/icon CMS architecture, stronger cards and exact direct-order primary CTAs route to one safely disabled preselected form. Full verify: 106 files/zero diagnostics, 48 tests, 450 links; 40 synthetic browser checks; four commercial pages at 1440/390/320; 181 frozen files and 93 retained geometry/style snapshots; 19 captures; real four-route CMS/visual regression including full verify with supplied SVG/PNG assets and restored fallback. Three-package query/home/pricing CTA preselection/history/invalid-query and disabled-submit/programmatic/no-JS safety checks pass. Zero real leads/review POST/live email. Main/Worker receipt is in CODEX-TO-CHATGPT and Git history. **STOP for OWNER + STRATEGY_CONTENT review and ChatGPT-supplied final package assets.** No next implementation active.

Live delivery: main source **81b1c7bc05f928c8c2c453d3bb197ddc8bfb680d**, native build **0da60927-0e3d-413c-a2f0-8a946d89cc9b**, verified Worker **73452c87-e484-448f-aea9-d76bd6cb1b5c**. All assets/safeguards and live responsive/order/preservation checks pass; evidence/h013-live. Zero POST/real orders/email. STOP for OWNER + STRATEGY_CONTENT review + final package visuals; no next handoff active.

---

## Completed handoff — H-012

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT D-041–D-043
Exact copy/visual contract: coordination/H012-PRICING-OFFER.md
Scope: shared package data + homepage compact package presentation + full /priser/ package decision experience

### Objective
Implement the exact H-012 pricing architecture so OWNER can judge it on the real review site.
Customer must understand in seconds: 4 500 = one important problem at a time; 6 900 = two reinforcing levers in parallel; from 14 900 = several services/customer journeys requiring ongoing prioritization.

### Requirements
1. Extend the existing shared home.homepage.packages source; do not create a second price source.
2. Use coordination/H012-PRICING-OFFER.md as exact public-copy authority.
3. Homepage stays compact: name, price, descriptor, short fit, visual, CTA/link.
4. /priser/ renders full fit, typical-business examples, situations, combinations/work areas, selection rule, Partner price note, decision strip and multiplier block.
5. Add optional pricePrefix so only Partner renders fra 14 900 kr/mnd.
6. Keep Vekst badge Anbefalt. Do not use Mest valgt.
7. Package visuals must be inline SVG/CSS explanatory graphics: one controlled curve for Optimalisering; one steeper exponential-style curve for Vekst; multiple controlled upward tracks for Partner. No numeric uplift labels.
8. Preserve CRO emphasis in Vekst combinations exactly as locked.
9. Make the 4 500 vs 6 900 distinction explicit: sequential one-bottleneck work versus two parallel reinforcing levers. The user must not reasonably infer that alternating 4 500 focus month-to-month is equivalent to Vekst.
10. Preserve ad-budget/external-cost/separate-work rules and do not invent contract terms.
11. Update Pages CMS for all new shared package fields.
12. Preserve /synlighet/ and /konvertering/ pricing bridges from the same source.
13. Do not add the future external-marketing-department offer.

### QA
- full verify/tests/browser checks
- single-source regression across home /priser/ /synlighet/ /konvertering/
- exact-copy checks for descriptors, fit and selection rules
- scan proving Mest valgt is absent
- scan proving no unsupported uplift percentages are rendered
- 1440 / 390 / 320 checks on home and /priser/

### Evidence
Capture homepage package section 1440 + 390; /priser/ full page 1440 + 390; package cards 1440 + 390; decision strip + multiplier block 1440 + 390.

Push to main, verify Worker, update coordination, then STOP for OWNER + STRATEGY_CONTENT H-012 review.
Do not continue to SEO/AI propagation or English pages.

### Implementation receipt (no new approval)

2026-10-09: incoming **2402e886203d1a4946cc505c7787df90b0c472fe**, implementation/local evidence **605613755620a3ba767a64e5b157c114a3e6b4dc**. Exact D-041 copy and D-042 visual semantics are delivered through the single shared CMS package source, compact home/full pricing, Partner optional prefix, selection/decision/multiplier details and both service bridges. Full verify: 95 files/zero diagnostics, 41 tests, 445 links; 40 synthetic browser checks; four commercial pages at 1440/390/320; 185 frozen files and 93 retained layout/style snapshots; eight captures; real four-route CMS regression including both optional-prefix states. No real lead/POST/live email. Main/Worker receipt belongs in CODEX-TO-CHATGPT and Git history. **STOP for OWNER + STRATEGY_CONTENT H-012 pricing review.** No next implementation active; no English/SEO-AI propagation or final artwork integration.

Live delivery: main source **1ec3c486c0b31fc40a7032b38c54a73b6033bce0**, native build **e59fdbaa-7476-4e9b-ab99-46c1bc485bd7**, verified Worker **733cdb4d-3bce-4d24-a3ee-be696f63eea7**. All assets/safeguards and four-route responsive preservation pass; evidence/h012-live. STOP for OWNER + STRATEGY_CONTENT pricing review; no next handoff active.

---

## Completed handoff — H-011

**Date:** 2026-10-09  
**Authority:** OWNER + STRATEGY_CONTENT D-033–D-038  
**Rule file:** `coordination/H011-LANDING-PAGE-RULES.md`  
**Scope:** system hardening only — accepted pages/chrome + service visual architecture + minimal i18n scaffolding

### Objective

Pause service-page rollout.

Before continuing to SEO/AI-synlighet, harden the accepted system around four new project rules:

1. every commercial service page is a landing page;
2. every service hero must support a dream-outcome image/illustration;
3. Optimalisering Oslo is the customer-facing brand; Medon is provider disclosure/legal context, not the service brand;
4. the site will be Norwegian + English, but English copy is not ready yet.

Do not turn this into a redesign or a full localization project.

---

## 1. Preserve H-010 acceptance

H-010 /konvertering/ passes under D-033.

Preserve:
- exact D-031 Konvertering copy;
- D-030 Synlighet service pattern;
- home/pricing layouts;
- shared package source;
- current palette/typography/spacing;
- current proof guards.

The lack of a hero visual in H-010 is addressed by this new handoff; it does not authorize unrelated changes.

---

## 2. Apply the locked homepage/provider revision

Consume current `app/src/content/pages/home.json` including D-037 revision at:

`89f5918caed62971445fccaba13491ac170d87ea`

Do not restore older Medon-heavy copy.

Required visible outcomes:
- hero intro no longer says Medon;
- standalone Medon/provider content section is absent from homepage;
- fit section uses the locked competitive-fit/poor-fit examples;
- footer provider disclosure is exactly:
  **Tjenesten drives av Medon AS.**
- “Om Medon” in accepted chrome becomes **Om tjenesten**;
- normal commercial FAQ/copy uses “vi” / Optimalisering Oslo rather than Medon;
- legal/operational references to Medon may remain where actually required.

Also preserve the current provider-neutral `/priser/` SEO title from:
`ec538f3edb314152e9c0eb596ffdb2b93063954c`

Do not rewrite the locked homepage fit examples.

---

## 3. Provider-neutral chrome

For the accepted home/pricing/service chrome, Medon must appear only once in normal commercial chrome:

> Tjenesten drives av Medon AS.

Do not show:
- “En tjeneste fra Medon AS. Synlighet og konvertering for bedrifter.”
- “Om Medon” as a navigation label
- repeated Medon copyright/service branding.

Use **Optimalisering Oslo** for the visible service copyright/brand line where appropriate.

Do not remove Medon from privacy/terms/company/legal facts where it is required to identify the responsible company.

Architecture/code should not hard-code Medon as the permanent future service operator beyond provider/legal config.

---

## 4. Service hero visual architecture

Extend the validated `ServicePage` system so each service page can optionally render one dream-outcome visual in the hero.

Add a reusable content/CMS object such as:

- kind: `photo | illustration`
- src
- alt
- positionX
- positionY
- optional decorative/background treatment only if genuinely useful

Use a dedicated service media collection/path, for example:

`app/public/images/services/`

Do not reuse the homepage customer photo by default.

The hero component must support:
- text-only fallback when no asset exists;
- text + visual split when an asset exists;
- responsive crop;
- no broken image;
- no fake caption/metric.

Prepare **Synlighet** and **Konvertering** to receive assets without another structural redesign.

Do not create final hero artwork in Codex.

ChatGPT will generate/select the actual visual assets after H-011 review.

### Intended briefs

**Synlighet**
Dream outcome:
> Relevant customers find the business before they have already chosen a supplier.

Preferred mode:
- editorial illustration;
- simple discovery -> relevant business/page -> next-step idea;
- never fake #1 ranking or guaranteed visibility.

**Konvertering**
Dream outcome:
> More of the relevant visitors already arriving continue to enquiry or purchase.

Preferred mode:
- authentic-ish customer/business photo OR editorial illustration;
- convey reduced friction / completed action / business relief;
- never fake conversion uplift.

The structure must also be reusable later for /seo/ and /ai-synlighet/, but do not route those pages through ServicePage yet.

---

## 5. Landing-page contract

Record/test the service-page contract from `H011-LANDING-PAGE-RULES.md`.

A service page is not accepted merely because it contains SEO copy.

At minimum its rendered journey must support:
- outcome-focused hero;
- dream-outcome visual capability;
- problem/mechanism clarity;
- practical customer meaning;
- fit/limits where relevant;
- commercial bridge;
- bounded next step.

Do not add a generic “features” block just to satisfy the contract.

---

## 6. Homepage fit section

Render D-037 exactly.

The point is commercial qualification, not negativity.

The poor-fit example must communicate:
- if there is effectively no competitive customer-choice problem;
- and customers already find/buy from the business;
- optimization may not be the current bottleneck.

Do not turn this into a long disclaimer or hide it in FAQ.

Preserve it as a visible homepage section.

---

## 7. Minimal i18n scaffolding

Target architecture:

- Norwegian Bokmål = default/root paths:
  - /
  - /synlighet/
  - /konvertering/
  - /priser/
- English = future `/en/` equivalents:
  - /en/
  - /en/visibility/ or another explicitly mapped English slug
  - etc.

For H-011, implement **only low-risk infrastructure**, not translations.

Required:
- central locale config: default `nb`, supported future `en`;
- route/translation-pair contract or helper;
- document intended canonical/hreflang behavior for later English rollout;
- reusable header language-switch slot/component.

Important:
- **do not show an EN control if there is no English equivalent yet**;
- do not create empty /en/ pages;
- do not machine-translate current drafts;
- do not duplicate all page JSON just to claim i18n readiness.

If the cleanest H-011 implementation is a hidden/non-rendered switch component plus locale config and documentation, that is acceptable.

The visible top-menu switch comes when real English equivalents begin landing.

---

## 8. CMS

Pages CMS should support:
- service hero visual fields for Synlighet/Konvertering;
- future page locale/translation relationship if this can be added without duplicating every draft page;
- current provider-neutral chrome fields.

Do not expose internal provider/legal config as casual marketing fields if that would make it easy to delete required company disclosure.

Authenticated CMS save remains a manual check and is not a blocker.

---

## 9. Current page routing

After H-011:
- /synlighet/ remains on validated ServicePage;
- /konvertering/ remains on validated ServicePage;
- /seo/ and /ai-synlighet/ remain frozen on their current renderer;
- no additional service-page propagation.

The new hero visual support must not automatically change frozen pages.

---

## 10. No image fabrication in implementation

Do not:
- fetch stock photography;
- draw a generic SVG and call it final artwork;
- copy Mementor illustrations;
- use their logo/mascot/composition;
- invent client-result visuals.

A neutral development fallback may be used only if necessary for layout testing, and it must not become visible final copy/claim.

ChatGPT will supply the real assets.

---

## 11. Preservation

Apart from the explicit provider-neutral/home-fit changes:
- homepage layout remains unchanged;
- /priser/ layout/content remains unchanged;
- /synlighet/ copy/layout remains unchanged;
- /konvertering/ copy/layout remains unchanged;
- shared commercial package values remain unchanged;
- proof remains non-public;
- backend/intake remains unchanged;
- /system/ and /project/ unchanged.

Other pages should not receive visual propagation in this handoff.

---

## Acceptance criteria

1. H-010 /konvertering/ remains materially identical except optional hero-visual-ready markup that renders no final asset yet.
2. /synlighet/ remains materially identical except optional hero-visual-ready markup that renders no final asset yet.
3. Homepage renders D-037 qualification/provider copy exactly.
4. Standalone homepage Medon section is gone.
5. Accepted commercial chrome shows only one normal provider disclosure: **Tjenesten drives av Medon AS.**
6. “Om Medon” is no longer a normal accepted-chrome navigation label.
7. /priser/ SEO title no longer brands the service as Medon.
8. ServicePage has a reusable, CMS-editable dream-outcome visual contract.
9. Missing service visual does not break or awkwardly empty the hero.
10. No stock/fake/final visual is introduced by Codex.
11. Minimal nb/en locale architecture exists and is documented.
12. No visible dead English switch exists.
13. No /en/ placeholder routes are created.
14. Home, pricing, Synlighet and Konvertering still pass 1440/390/320 QA.
15. Proof, backend, protected inputs and frozen pages remain protected.

---

## Evidence / delivery

Run:
- full verify/tests/browser QA;
- exact provider-disclosure scan across accepted commercial pages;
- exact D-037 fit-copy check;
- service visual missing-asset/fallback test;
- no-dead-language-switch check;
- no accidental /en/ route check;
- preservation regression for home/pricing/Synlighet/Konvertering except authorized deltas.

Capture:
- homepage fit section 1440 + 390;
- accepted footer/header 1440 + 390;
- Synlighet hero 1440 + 390 after visual-slot refactor;
- Konvertering hero 1440 + 390 after visual-slot refactor.

Push to main and verify Worker.

Update coordination/report/evidence.

Stop for:
1. STRATEGY_CONTENT/OWNER review of H-011;
2. ChatGPT-generated Synlighet/Konvertering hero assets.

Do not continue to SEO/AI-synlighet or English page generation without the next handoff.

**Implementation receipt, 2026-10-09:** received main **5b527b9d26a7a4209dc84444a3a2faa89413f48d**, implemented at **2faf9dc6632d080e2b594b079b69245c0415475e**. D-033–D-038 and the authoritative landing-page rules are consumed without changing source JSON/status/authority. Exact D-037 fit/provider copy and pricing title render; accepted chrome has one visible provider disclosure. Optional service-media schema/CMS/renderer preserves text-only missing-file fallback and supports supplied photo/illustration without generating final art. Minimal nb/en contracts and empty switch slot emit no English control/routes. Verification passes: 89 files/zero diagnostics, 39 tests, 442 links; 40 synthetic browser checks; four accepted pages at 1440/390/320; all 183 frozen hashes and 42 retained geometry/style snapshots; ten captures; actual both-service missing/supplied asset fixture. Fresh independent technical review reports no actionable finding. Main/Worker receipt belongs in CODEX-TO-CHATGPT and its Git history. **STOP for STRATEGY_CONTENT/OWNER review, then ChatGPT hero-asset generation/selection; no next implementation handoff is active.**


---

## Completed handoff — H-010

**Date:** 2026-10-09  
**Authority:** STRATEGY_CONTENT D-030/D-031 + OWNER/STRATEGY_CONTENT D-032  
**Scope:** controlled propagation of validated service pattern to `/konvertering/` only

### Objective

H-009 validates the service-page system on /synlighet/.

Apply that same system to /konvertering/ using the exact D-031 locked content. Do not redesign the service pattern and do not independently rewrite copy.

### Authoritative content

Use the current exact bytes of:

`app/src/content/pages/konvertering.json`

locked at:
`8b8f4c4eecda1458e45c392dfabe3d4ac4fbc8d5`

Key locked text:

**Eyebrow**
> Fra besøk til henvendelser og kjøp

**H1**
> Det er ikke alltid kunden som må overbevises. Noen ganger må nettsiden slutte å stå i veien.

**First section heading**
> Det skal være enklere å kjøpe enn å gi opp.

Do not shorten or replace these in implementation.

### 1. Reuse the validated service-page pattern

Use the D-030 /synlighet/ pattern:
- accepted header/footer;
- 1440px max shell and controlled text measures;
- Instrument Sans / Figtree roles;
- current plum/teal/mint/lavender family;
- text-led service hero;
- quiet breadcrumb;
- open editorial sections;
- cards only where they improve comprehension;
- one compact commercial bridge;
- bounded free-check block;
- FAQ.

Do not create a new Konvertering design language.

### 2. Hero

Render:
- breadcrumb;
- locked eyebrow;
- locked H1;
- locked intro;
- primary CTA: Ta en gratis sjekk;
- secondary CTA: Se priser.

The H1 is intentionally longer than Synlighet's. Handle line length/responsive wrapping with layout/measure, not copy edits.

Do not add a second headline or fake CRO dashboard.

### 3. Page sequence

Render the locked sections in this order:

1. Hero
2. “Det skal være enklere å kjøpe enn å gi opp.”
3. “Flere skjema er lite verdt hvis henvendelsene ikke passer.”
4. “Vi starter med hindringen som står mest i veien.”
5. “Hvis de rette besøkene ikke kommer, er ikke konvertering hele svaret.”
6. Shared-data commercial pricing bridge
7. “Send siden der du vil at kunden skal handle.”
8. FAQ
9. Footer

No filler sections.

### 4. First section

The three items are:
- Før kunden bestemmer seg
- Når kunden vil videre
- Etter handlingen

Use the same clear card language as the first Synlighet section, but preserve the exact copy.

The section should visually communicate a simple path from interest → action → useful outcome. Do not add arrows/steps if they make the page feel like a SaaS funnel diagram.

### 5. Quality section

The three locked items:
- Tjenestebedrift
- Nettbutikk
- Måling

This section explains that more form submissions/orders are not automatically better business outcomes.

Use a calm, competent treatment. It may use open columns rather than cards if that matches the validated service pattern better.

Do not invent benchmarks, conversion rates, margins or client results.

### 6. Prioritization section

Keep this editorial/open.

The message is:
- find the biggest friction;
- prioritize it;
- implement agreed work;
- measure effect;
- no promised uplift.

Do not add generic CRO checklists.

### 7. Conversion × visibility section

Use the same strong contrasting section treatment that works for Synlighet × Konvertering on /synlighet/.

Locked heading:
> Hvis de rette besøkene ikke kommer, er ikke konvertering hele svaret.

Links:
- Se Synlighet → /synlighet/
- Se pakker og priser → /priser/

Do not imply that traffic volume alone is the answer. Relevant traffic is the distinction.

### 8. Generalize the service pricing bridge

Current `ServicePricingBridge.astro` hard-codes “Synlighet” in its two context lines.

Refactor it so the active service supplies/derives the service name, producing:

For /synlighet/:
- Når Synlighet er det ene prioriterte området.
- Når Synlighet jobber sammen med et annet område.

For /konvertering/:
- Når Konvertering er det ene prioriterte området.
- Når Konvertering jobber sammen med et annet område.

Do not duplicate prices or create a second package source.

The package names/prices/recommendation/VAT still come from the existing shared CMS package source.

Prove /synlighet/ rendered output remains unchanged after this refactor.

### 9. Free check

Use locked copy exactly.

It must say:
- 3 most important findings;
- within 2 business days;
- manual/bounded;
- not a full CRO audit;
- not a complete error list;
- not a forecast;
- not free implementation.

Route CTA to:
`/#sjekk`

Do not create a second form.

### 10. SEO / authority

Preserve:
- SEO title includes **Konverteringsoptimalisering (CRO)**;
- one semantic H1;
- clean H2/H3 hierarchy;
- internal links to /synlighet/ and /priser/.

Do not stuff “CRO” repeatedly into headings. The page should read naturally to a Norwegian business owner.

### 11. Renderer architecture

Extend the validated ServicePage route to /konvertering/.

Allowed:
- reusable service-name/context props;
- small renderer generalization;
- shared service visual mode.

Not allowed:
- automatically converting /seo/, /ai-synlighet/ or other pages to ServicePage;
- broad schema migrations;
- visual changes to /synlighet/.

### 12. Proof

No client proof in H-010.

Do not change proof registry or guards.

### 13. Frozen scope

Must remain materially unchanged:
- homepage
- /priser/
- /synlighet/
- /seo/
- /ai-synlighet/
- /nettbutikkoptimalisering/
- /vurdering/
- /om/
- /kontakt/
- legal pages
- insight pages/articles
- backend/intake
- /system/
- /project/

### Acceptance criteria

1. /konvertering/ renders exact D-031 locked copy.
2. Exact H1 and first-section hook are preserved.
3. Page clearly belongs to the D-030 service-page system.
4. Lead/order quality distinction is understandable without specialist knowledge.
5. Conversion × visibility relationship is clear.
6. Pricing bridge uses the shared package source.
7. Service pricing bridge is generalized; no hard-coded Synlighet remains in reusable logic.
8. /synlighet/ output is unchanged after bridge refactor.
9. Homepage and /priser/ remain unchanged.
10. No fake metrics/proof/benchmarks or invented terms.
11. Other pages stay frozen.
12. 1440 / 390 / 320 QA passes.

### Evidence / delivery

- Run full verify/tests/browser checks.
- Add exact-copy checks for H1/eyebrow/first-section heading/order.
- Add renderer regression covering both Synlighet and Konvertering bridge context.
- Capture /konvertering/:
  - full 1440 + 390;
  - hero + first section 1440 + 390;
  - quality/prioritization 1440 + 390;
  - conversion×visibility + pricing bridge + free check 1440 + 390.
- Compare /synlighet/ output against H-009 baseline.
- Recheck homepage and /priser/.
- Push to main and verify Worker.
- Update coordination state/report/evidence.
- Stop for STRATEGY_CONTENT review of /konvertering/.

Do not continue to /seo/ or /ai-synlighet/ until the next handoff.

**Implementation receipt, 2026-10-09:** H-010 consumed incoming main **cbd7e18ff29c1aff01421df81048eb66c3b3c8ba** and is implemented at **f30eebee2600a5e99c79ce6edc46ff9dac6c8204**. Exact D-031 JSON/status/authority remains unchanged. Both services derive bridge context from the active slug and share the existing CMS packages. Home/pricing/Synlighet outputs and measured geometry, all 188 frozen files and the H-009 delivered Synlighet HTML hash match. Full verify (77 files, zero diagnostics; 34 tests; 443 links), 40 synthetic browser checks, actual four-route CMS regression, 1440/390/320 and eight captures pass. Fresh technical review found no material issue. Local evidence: coordination/evidence/h010/; main/Worker receipt belongs in CODEX-TO-CHATGPT and its Git history. **STOP for STRATEGY_CONTENT /konvertering/ review; no next handoff is active.**


---

## Completed handoff — H-009

**Date:** 2026-10-09  
**Authority:** STRATEGY_CONTENT D-027/D-028 + OWNER/STRATEGY_CONTENT D-029  
**Scope:** controlled visual/commercial propagation to `/synlighet/` only

### Objective

The homepage and /priser/ patterns are now validated.

Use `/synlighet/` as the first service-page test.

Do not rewrite the page. Render the exact D-028 content and give it the accepted visual confidence, airiness and commercial clarity without turning it into another homepage.

### Authoritative content

Use the current exact bytes of:

`app/src/content/pages/synlighet.json`

locked at:
`cc02995a5b43d3d0ee28df23a4588ff09a16cd21`

Key locked signals include:

**Eyebrow**
> SEO, lokal SEO og AI-synlighet

**H1**
> De søker etter løsningen. Så etter deg.

Do not restore the earlier “Du skal bli funnet…” version.

### 1. Visual system

Apply the accepted H-006/H-008 system:
- Instrument Sans headings/major figures;
- Figtree body/UI;
- 1440px max shell with narrower text measures;
- current plum/teal/mint/lavender family;
- current accepted header/footer;
- Storebrand-like whitespace and task clarity;
- Mementor-like competence and commercial restraint.

Do not create a generic old inner-page clone.

Do not introduce a new brand direction.

### 2. Hero

The hero should be simpler than the old InnerPage hero and clearly service-specific.

Use:
- breadcrumb, but visually quiet;
- locked eyebrow;
- locked H1;
- locked intro;
- primary CTA: Ta en gratis sjekk.

Add one restrained secondary path:
- Se priser → /priser/

Do not add a second keyword-heavy headline.

For visual balance, a restrained semantic side treatment may show the three concepts:
- SEO
- Lokal SEO
- AI-synlighet

This may be typographic/graphic, but:
- no fake search rankings;
- no fake AI citations;
- no analytics dashboard;
- no stock image;
- no invented metrics;
- no visual that needs a paragraph to explain it.

If the page is stronger without that side treatment, keep the hero text-led. Clarity wins.

### 3. Section hierarchy

Render the locked content in this sequence:

1. Hero
2. “Hvis bare de som kjenner navnet ditt finner deg…”
3. “SEO, lokal SEO og AI-synlighet løser ulike deler av samme jobb.”
4. “Vi starter med det som kan gjøre det lettere for en relevant kunde å finne deg.”
5. “Mer trafikk er lite verdt hvis de rette besøkende ikke går videre.”
6. Compact commercial/pricing bridge using the shared package source
7. Free manual check
8. FAQ
9. Footer

Do not add filler sections.

### 4. Cards / open composition

Use cards only where they improve choice/comprehension:
- the three need/path items in the first main section;
- SEO / Lokal SEO / AI-synlighet can use three clear service cards or open columns.

The prioritization and Synlighet × Konvertering sections should feel more editorial/open, not another wall of cards.

Use asymmetry/whitespace where useful, but keep the information obvious.

### 5. Commercial bridge — no duplicated prices

Add a compact price block after the Synlighet × Konvertering section.

It must consume the existing shared package source from the homepage, not hard-code prices again.

Customer logic:
- **Optimalisering — 4 500 kr/mnd eks. mva.** when Synlighet is the one prioritized area.
- **Vekst — 6 900 kr/mnd eks. mva.** when Synlighet works together with another area.
- Link to full `/priser/`.
- Partner does not need a full third card here unless required for layout; the goal is routing, not reproducing the entire pricing page.

The source must remain one-source-of-truth and CMS-editable.

Do not expose internal hour guardrails or invent terms.

### 6. Free check

Use the locked D-028 copy:
- 3 most important findings;
- within 2 business days;
- manual/bounded;
- no complete SEO audit;
- no forecast/guarantee/free implementation.

Route the CTA to the current accepted homepage check:
`/#sjekk`

Do not create a second form on /synlighet/ in H-009.

### 7. Authority / SEO structure

The page is an umbrella authority page for:
- SEO;
- Lokal SEO;
- AI-synlighet.

Preserve clear internal links:
- /seo/
- /ai-synlighet/
- /konvertering/
- /priser/

Do not create `/lokal-seo/` in H-009.

Do not force AEO/AIO/GEO synonym lists into the page. Those belong under the AI visibility topic when useful.

Use semantic headings cleanly:
- one H1;
- section H2s;
- item H3s.

### 8. Current proofs

Do not publish Nysta or Oslo Privatklinikk on this page.

D-025 proof candidates remain non-public.

Do not change proof registry fields or renderer guards.

### 9. Code/system direction

The old generic InnerPage renderer may be insufficient for the accepted service-page system.

You may:
- add a dedicated ServicePage component or service visual mode;
- extract reusable service section patterns;
- add a service-specific stylesheet based on the accepted tokens.

Prefer reusable architecture because /konvertering/, /seo/ and /ai-synlighet/ may follow after review.

But do **not** automatically switch the other service pages to the new component/styles in H-009.

Gate the new renderer to `/synlighet/` only until reviewed.

### 10. Frozen scope

Do not redesign/rewrite:
- /konvertering/
- /seo/
- /ai-synlighet/
- /nettbutikkoptimalisering/
- /vurdering/
- /om/
- /kontakt/
- /personvern/
- /vilkar/
- /innsikt/ and articles
- backend/intake
- /system/
- /project/

Homepage and /priser/ must remain materially unchanged apart from any safe shared-component refactor with proven identical output.

### Acceptance criteria

1. /synlighet/ renders exact D-028 copy.
2. Locked H1 is exactly “De søker etter løsningen. Så etter deg.”
3. Page visually belongs to homepage + /priser/ system.
4. SEO / Lokal SEO / AI-synlighet are immediately understandable as distinct but related.
5. The page explains commercial relevance before technical detail.
6. Compact pricing bridge derives from the shared package source.
7. No duplicated package price source is introduced.
8. No fake rankings, AI proof, client proof or invented claims appear.
9. Free check retains exact bounded promise.
10. Homepage and /priser/ remain unchanged.
11. Other pages remain frozen.
12. 1440 / 390 / 320 responsive QA passes.

### Evidence / delivery

- Run full verify/tests/browser checks.
- Add exact-copy checks for D-028 H1/eyebrow/section order.
- Add regression proving the service pricing bridge reads shared package values.
- Capture:
  - /synlighet/ full page 1440 and 390;
  - hero + first section 1440 and 390;
  - three-area section 1440 and 390;
  - commercial bridge + free check 1440 and 390.
- Recheck homepage and /priser/ after shared-component changes.
- Push to main and verify Worker.
- Update coordination state/report/evidence.
- Stop for STRATEGY_CONTENT review of /synlighet/.

Do not continue to /konvertering/ or deeper service pages until the next handoff.

### Implementation receipt — no new approval

2026-10-09, IMPLEMENTATION: incoming main **fd48a91a4c7353aa37cb55b9abd30efd8e18a9f7** consumed; implementation/local evidence **36c305f62c82897e54dd99384e2fcc9c1d96e356**. D-027's corrected pricing revision and D-028's exact Synlighet bytes/status/authority remain untouched. New service renderer/style is gated only to `/synlighet/`; text-led hero, locked sections, compact shared two-package bridge and bounded homepage-check routing. The same source binds its repeated price FAQ. All 187 frozen files and home/pricing HTML/styles/geometry match the incoming baseline. Full verify (74 files, zero diagnostics; 34 tests; 445 links), 40 browser checks, actual shared-source/optional-navigation regression and responsive 1440/390/320 pass. Eight captures, technical review/fix and CMS guide are in evidence/h009 and app/docs/h009-service-cms.md. Main/Worker receipt belongs in CODEX-TO-CHATGPT. **Stop for STRATEGY_CONTENT review of /synlighet/; no further implementation handoff is active.** D-025 proof remains hidden, other 12 pages stay frozen and no full-page visual acceptance, proof/launch or broader propagation approval is inferred.


---

## Completed handoff — H-008

**Date:** 2026-10-09  
**Authority:** STRATEGY_CONTENT D-024 + OWNER/STRATEGY_CONTENT D-026  
**Proof direction:** D-025  
**Scope:** render locked commercial copy + controlled propagation to `/priser/` only

### Objective

H-007 is commercially accepted after STRATEGY_CONTENT refined the content layer directly.

Do not rewrite that copy.

Now make `/priser/` the first controlled propagation page using the accepted H-006 homepage visual system and one package source of truth.

### Authoritative content revisions

Preserve exactly:

- homepage commercial content from commit `10c5890b2e4d678340384dd399a1785e3e01ba36`
- pricing-page supporting copy from commit `a37bf7a9067f18f4eafd59e2efd753240aecc96c`

If main has advanced, consume the current bytes of those files; do not restore older H-007 generated wording.

### 1. Homepage

Render the current locked commercial wording exactly.

Do not change:
- hero;
- selector;
- calculator;
- package wording/prices;
- free-check wording;
- related FAQ wording;
- selected hero image;
- current owner color tweaks;
- section order.

Component refactoring for shared package rendering is allowed only if rendered homepage output remains materially identical.

### 2. One package source of truth

Homepage and `/priser/` must not contain independently maintained package numbers/rules.

Preferred implementation:
- factor the package rendering into a reusable component;
- use one content source for package names, prices, descriptors, fit/scope, recommendation state, work areas and shared cost notes;
- keep that source editable through Pages CMS.

Do not duplicate 4 500 / 6 900 / 14 900 in a second editable content object if avoidable.

If the least-risk implementation is for `/priser/` to consume the homepage package object, that is acceptable for this phase. Do not perform a broad content migration merely for architectural purity.

### 3. /priser/ visual propagation

Apply the accepted representative visual language to `/priser/`:
- Instrument Sans headings/major price figures;
- Figtree body/UI;
- max 1440px shell with narrower readable measures;
- current plum/teal/mint/lavender family;
- Storebrand-like air and clear task hierarchy;
- current header/footer direction;
- restrained open sections rather than a wall of cards.

Do not invent a second design direction.

### 4. /priser/ information order

The pricing page should be immediately useful to a buyer:

1. concise pricing hero using the locked `priser.json` title/intro;
2. the same three packages and prices used on the homepage;
3. work areas / what can be optimized;
4. what is additional / separately priced;
5. free-check section with the 3-findings / 2-business-days promise;
6. pricing FAQ;
7. footer.

Do not add filler sections.

### 5. Package rendering

Use the exact locked commercial facts:

- Optimalisering — 4 500 kr/mnd eks. mva.
- Vekst — 6 900 kr/mnd eks. mva. — Anbefalt
- Partner — 14 900 kr/mnd eks. mva.
- no Sprint
- ad budget additional
- external tools/platform costs additional when necessary and not agreed included
- smaller work/adjustments on existing landing pages may fit agreed scope
- larger new landing pages, websites, substantial technical work and redesign are separately priced
- monthly capacity does not roll forward

Do not expose internal hour guardrails.

Do not invent binding, cancellation, minimum term, setup fee or invoice terms.

### 6. Proof

Do not publish proof in H-008.

D-025 sets future order only:
1. Oslo Privatklinikk = preferred homepage proof candidate
2. Nysta = preferred ecommerce/conversion supporting case

Both remain blocked because current imported records still lack required intervention, attribution/limitations wording and confirmed comparable periods.

Do not set:
- strategyReviewStatus=CONTENT_LOCKED
- publicationStatus=PUBLISHABLE
- publicationApproved=true

Do not weaken renderer guards.

### 7. Pages CMS

Ensure the shared package source remains straightforward to edit.

If fields move as part of the one-source-of-truth refactor:
- preserve values exactly;
- update `.pages.yml`;
- preserve hero/selector/calculator/form/proof editing;
- document the new location clearly.

Authenticated live CMS testing remains a manual owner/editor action and is not a reason to block implementation.

### 8. Frozen scope

Do not redesign or rewrite:
- /synlighet/
- /konvertering/
- /seo/
- /ai-synlighet/
- /nettbutikkoptimalisering/
- /vurdering/
- /om/
- /kontakt/
- /personvern/
- /vilkar/
- /innsikt/ or its articles
- any other non-home/non-pricing page
- backend/intake
- /system/
- /project/

### Acceptance criteria

1. Homepage still renders the exact D-024 commercial copy.
2. /priser/ renders the exact package ladder and locked supporting copy.
3. Homepage and /priser/ use one package content source.
4. /priser/ visually belongs to the accepted H-006 system.
5. Vekst is clearly but tastefully recommended.
6. No Sprint or invented terms appear.
7. Ad-budget/external-cost/separate-work rules remain visible and understandable.
8. Free check clearly states 3 findings within 2 business days.
9. Proof remains completely non-public.
10. Remaining 13 non-home pages and protected inputs remain unchanged.
11. 1440 / 390 / 320 responsive QA passes for both homepage and /priser/.

### Evidence / delivery

- Run full verify/tests/browser checks.
- Add regression test proving homepage/pricing package data cannot drift.
- Capture /priser/ full page at 1440 and 390.
- Capture package block at 1440 and 390.
- Recheck homepage at 1440 and 390 after any component/content refactor.
- Push to `main` and verify the review Worker.
- Update coordination state/report/evidence.
- Stop for STRATEGY_CONTENT review of `/priser/`.

Do not continue to service-page propagation without the next handoff.

### Implementation receipt — no new approval

2026-10-09, IMPLEMENTATION: incoming main **73ce60d8789ba0b44661ce5222adff53a4831127** consumed; implementation/local evidence **87a839216db412305337daae24c01858176db15e**. Both D-024 JSON records and authority/status fields are unchanged. Shared CMS homepage packages render both pages and bind repeated FAQ/metadata facts; only `/priser/` receives visual propagation. Exact homepage DOM/styles/geometry and all 182 frozen files match the pre-implementation baseline. Full verify (69 files, zero diagnostics; 34 tests; 445 links), 40 browser checks, real-Astro source regression and both routes at 1440/390/320 pass. Six required captures, CMS guide and technical review are in evidence/h008 and app/docs/h008-pricing-cms.md. Main/Worker receipt follows in CODEX-TO-CHATGPT.md. **Stop for STRATEGY_CONTENT R-06; no further implementation handoff is active.** D-025 proof stays non-public, other 13 pages and backend/reference inputs stay frozen, no production intake/launch or new role approval is inferred.


---

## Completed handoff — H-007

**IMPLEMENTATION receipt, 2026-10-09:** consumed incoming main 7b98ff8184e7a8063682877b1edfcff3d4941f20; implementation/evidence fdcdaf84020ae4ecf8446806329b74cb3e4320d2. Exact ladder, free-check promise, evidence-only guarded registry and CMS fields delivered. Final verification and responsive/preservation checks pass. Main/review Worker receipt is maintained in CODEX-TO-CHATGPT.md. Stop for STRATEGY_CONTENT review; no further implementation handoff is active. The original authorized scope below is retained.

**Date:** 2026-10-08  

**Latest-main clarification consumed:** 209063989df3911acde3c4d95c06a2ea76457216 confirms OWNER name/case permission GRANTED. Final H-007 records are EVIDENCE_ONLY / READY_FOR_STRATEGY_REVIEW; exact public presentation remains unpublished pending STRATEGY_CONTENT lock. Permission follow-up implementation is fdcdaf84020ae4ecf8446806329b74cb3e4320d2.

**Authority:** OWNER R-03 PASS + STRATEGY_CONTENT / COMMERCIAL  
**Decisions:** D-021, D-022, D-023  
**Authoritative commercial input:** `coordination/H007-COMMERCIAL-INPUT.md`  
**Scope:** homepage commercial layer + proof data model + Pages CMS wiring

### Objective

Stop iterating on the representative layout.

Use the accepted current homepage as the visual/IA baseline and move the project forward commercially:

1. implement the previously locked V3 package ladder;
2. prepare the real case/proof evidence as structured evidence-only records with hard publication gating;
3. make the commercial fields cleanly editable through Pages CMS;
4. preserve the rest of the current homepage architecture and current visual direction.

Codex is implementation. Do not improvise marketing strategy or customer-facing claims beyond the exact factual inputs supplied.

### 1. Replace the temporary package section with the D-022 ladder

The current temporary Synlighet / Konvertering / Begge price placeholders are superseded as **packages**.

The need selector above remains:
- Bli funnet
- Gjør flere besøk til henvendelser og salg
- Begge deler

The package/pricing section must instead use:

#### Optimalisering
- **4 500 kr/mnd eks. mva.**
- descriptor: **Ett prioritert hovedområde**
- one main area / one priority at a time

#### Vekst
- **6 900 kr/mnd eks. mva.**
- badge: **Anbefalt**
- descriptor: **To områder som jobber sammen**
- two connected areas

#### Partner
- **14 900 kr/mnd eks. mva.**
- descriptor: **Helheten + større kapasitet**
- greater capacity across relevant areas
- never describe it as unlimited

Use Instrument Sans for major price figures per the established typography rule.

Do not publicly expose internal hourly guardrails unless later authorized.

### 2. Package scope facts

The monthly work can combine these four areas:
- Konvertering
- Synlighet: SEO + Lokal SEO + AI-søk / AI-synlighet
- Google Ads
- Meta Ads

Måling & sporing is a shared foundation, not a fifth package/service card.

Make this understandable without turning each pricing card into a feature dump.

Hard rules that must be visible near pricing where relevant:
- **Annonsebudsjett kommer i tillegg.**
- applicable external platform costs are additional unless explicitly agreed otherwise
- larger/new landing pages, websites, substantial technical work and redesigns are quoted separately

Do not invent:
- binding period
- cancellation period
- minimum term
- setup/onboarding fee
- invoice terms
- unlimited work

Do not reintroduce Sprint.

### 3. Free check

Integrate the established offer:
> **Få våre 3 viktigste funn innen 2 virkedager.**

Keep the existing bounded/manual wording and safeguards:
- not a complete audit
- not free implementation
- not a forecast/result guarantee
- not an automated score presented as human expertise

Do not make the form longer.

### 4. Proof/case registry

Create a structured proof/case content model that can later drive homepage proof and result pages without code changes.

Import the exact evidence records from `coordination/H007-COMMERCIAL-INPUT.md`:
- Nysta
- Oslo Privatklinikk

Both must remain during H-007:
- `EVIDENCE_ONLY`
- `READY_FOR_STRATEGY_REVIEW`
- `naming/publication permission = GRANTED`
- non-rendering on public pages until ChatGPT/STRATEGY_CONTENT locks the exact public presentation

Required model fields should support at minimum:
- id
- client/display name
- anonymized label
- result/dominant metric
- before
- after
- delta
- period/timeframe
- intervention/change
- source/provenance
- limitations/attribution caveat
- naming permission
- artifact/screenshot status
- publication status
- publicationApproved boolean

Implement a hard renderer guard so no case can appear publicly unless publication status/approval explicitly permits it.

No test fixture, environment flag or missing field may accidentally make a case public.

Do not create fake testimonials, fake logos or public anonymized claims in H-007.

### 5. Homepage proof slot

Keep the homepage proof position in the established sequence.

For now, although publication permission is confirmed, no exact public case presentation has yet been STRATEGY_CONTENT-locked:
- do not render a fake proof card;
- do not fill the space with generic praise;
- it is acceptable for the public proof slot to remain omitted.

The purpose of H-007 is to make the real proof data ready for immediate STRATEGY_CONTENT selection after implementation, not to manufacture or prematurely publish raw registry claims.

### 6. Pages CMS

Make the following commercially meaningful data editable through Pages CMS without touching component code:

Homepage:
- package section eyebrow/heading/intro
- package names
- descriptor
- price
- VAT suffix
- recommended badge/state
- customer-facing fit/scope copy
- CTA label/href
- external-cost note
- free-check promise/copy
- existing hero/selector/calculator/form/FAQ fields

Proof registry:
- all evidence/status/permission fields listed above
- publication controls must be explicit and safe

Do not make internal delivery-hour guardrails a public CMS marketing field. If stored, keep them in a non-public operational field/file.

Authenticated Pages CMS account/GitHub-app operation is still not proven. Validate schema/config locally and report the exact manual authentication/connection step that remains; do not claim it works live unless actually tested.

### 7. Visual/layout preservation

Preserve the current visual baseline including OWNER's direct small color/selector changes.

Do not:
- reopen hero design
- change image
- change section order
- rework palette
- redesign need cards
- redesign calculator
- propagate homepage visual system to the other 14 pages

You may make minimal pricing/proof/CMS layout adjustments required to render the new package ladder cleanly.

### 8. Content authority

The exact package labels/prices/rules in D-022 are authoritative.

Generated connective copy remains DRAFT / REVIEW_REQUIRED unless supplied verbatim by this handoff.

Do not mark the entire homepage CONTENT_LOCKED.

ChatGPT will perform the next copy/content refinement directly against the CMS/content layer after H-007.

### 9. Existing pages

Do not expand/redesign the remaining 14 pages in this handoff.

A later controlled propagation/content phase will decide:
- which service pages stay
- page-specific copy
- /priser/ synchronization
- result/case URLs
- authority/insight expansion

### Acceptance criteria

1. Homepage visually preserves the accepted D-021 baseline.
2. Pricing section renders 4 500 / 6 900 / 14 900 kr/mnd eks. mva. accurately.
3. Vekst is visibly but tastefully marked Anbefalt.
4. Sprint is absent.
5. Ad-budget-extra rule is visible.
6. No invented contract/term language appears.
7. Free check states 3 key findings within 2 business days while retaining bounded/manual safeguards.
8. Nysta and Oslo Privatklinikk exist as structured evidence-only records with publication/name permission = GRANTED and render nowhere publicly until STRATEGY_CONTENT locks the exact public presentation.
9. Automated tests prove proof cannot render without explicit publishability.
10. Pages CMS exposes the intended homepage commercial fields and proof registry safely.
11. Other 14 pages, `system/`, `project/` and backend/intake behavior remain unchanged.
12. 1440 / 390 / 320 responsive checks pass.

### Delivery

- Run full verify/tests/browser QA.
- Add focused H-007 tests for exact package prices, VAT suffix, recommended state, Sprint absence, ad-budget note, free-check promise and proof-publication guard.
- Capture homepage package section at 1440 and 390.
- Capture free-check section at 1440 and 390.
- Do not create screenshots of hidden proof as if public.
- Push to `main` and verify the review Worker.
- Update `CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md`, `REVIEW-QUEUE.md`.
- Stop after H-007 for STRATEGY_CONTENT review.

Do not independently continue into remaining-page propagation.


---

## Completed OWNER selector follow-up — H-006

**IMPLEMENTATION receipt:** consumed at 7b7a970f301a1cb47dff7307a61f97175c5589d1. Local verification/evidence passes; exact delivery and live receipt belong in CODEX-TO-CHATGPT and Git history. Stop for OWNER R-03. D-019/D-020 remain the genuine prior layout/photo verdicts, not an invented review of this selector delta.

2026-10-08, actual OWNER instruction in Codex after selected-photo delivery 4d1e6e7: set `.invite-home .discipline` to `font-size: 17px`; use exact combined label **Synlighet X Konvertering**; replace its symbol with upward arrows or another progress icon; set `.invite-home .need-card-2` background to `#320c43` and text to `#e0f0ef`. This authorizes only those homepage selector changes under D-018. Preserve CMS-driven copy, selected single hero/alternatives, remaining homepage structure and all other pages. Continue the existing static review workflow, synchronize implementation/verification receipts, then return to OWNER R-03. D-019/D-020 remain genuine RED_TEAM verdicts on their exact reviewed revisions; this instruction supplies no whole-page acceptance or launch/scale-out authority.

## Completed OWNER asset follow-up — H-006 selected hero image

**IMPLEMENTATION receipt:** consumed at dc045748180897c20efa418ac739b4135bf5e517. First supplied image is selected; all three originals and optimized single-hero options are retained. Layout/content remain unchanged; CMS field now uses a single-image media picker. Verification and static-review delivery are in CODEX-TO-CHATGPT and evidence/h006-photo. Return to OWNER R-03 and fresh formal RED_TEAM R-04; no further implementation is active.

**Concurrent review reconciliation:** upstream main 33ad5bd returns the genuine D-019 H-006 layout R-04 PASS, with final-photo exclusion, preserved below. The remaining review on the photo-integrated revision is OWNER R-03 plus that separate photo review; implementation does not reset the layout PASS or approve the asset's authenticity/crop/proof implications.

2026-10-08, actual OWNER instruction in Codex after H-006 delivery 1e5f5edfee8127a4726a9b05ca4fbf7e13af9a81: use the first generated image as the homepage hero; retain a clean CMS-editable/content-driven asset field for later swaps without layout changes; do not introduce a slider/gallery; keep the other two generated images available as later review alternatives. Supplied repository assets: app/public/images/home/happycustomer.png, happycustomer2.png, happycustomer3.png. This explicitly authorizes the narrow asset integration following D-018; it does not approve the complete homepage, other pages, content/terms/proof or production launch. Deliver within the existing static review workflow, synchronize evidence, then return to OWNER R-03 and fresh formal RED_TEAM R-04. Use this entry's Git history and outbound receipt for the implementation/delivery revision.

## Completed handoff — H-006

**IMPLEMENTATION receipt (2026-10-08):** incoming main 99734a73a3f3cd0ba93a1155cfbdd95395a91245 consumed at implementation/evidence 7e69c079d57281d5126d2c94dbc3f1dfac90f265. Delivery and live verification are recorded in CODEX-TO-CHATGPT.md and its Git history. H-006 is complete; no further implementation handoff is active. Stop for OWNER R-03 and fresh formal RED_TEAM R-04. Final generated photo remains a separately supplied asset; no acceptance, content lock or launch approval is inferred.

**Date:** 2026-10-08  
**Authority:** OWNER EXPLICIT / DESIGN + CRO POLISH  
**Decision:** D-018  
**Baseline:** H-005B implementation `1d4bdf77bd234783b68a7f581bdb88ab6ef2af38`  
**Scope:** representative homepage visual/layout polish only

### Objective

H-005B has the right information architecture and the clearest hero so far, but the page still feels too compact and slightly too component-designed.

Move it toward:
- **Storebrand-like airiness and task clarity**
- **Mementor-like competence and commercial confidence**
- while keeping the existing Invite-derived visual life.

This is **not a redesign** and not a content rewrite.

### 1. Large-screen width

Set the homepage large-screen shell to a **maximum content width of 1440px**.

Do not stretch readable text to 1440px.

Use nested measures:
- full homepage shell: max 1440px;
- hero content/photo composition: can use most of the shell;
- normal body/readable copy: roughly 650–760px where appropriate;
- split explanatory sections: keep each text column comfortably readable;
- FAQ/form content may use narrower internal widths even inside the larger shell.

Use responsive side gutters rather than allowing content to touch viewport edges.

The goal is more breathing room, not simply bigger components.

### 2. Spacing / page rhythm

Increase whitespace materially across the homepage.

Target direction, not rigid pixel law:
- major desktop sections: roughly 96–120px vertical padding where the section job benefits from it;
- tighter utility/transition sections may be smaller;
- tablet: roughly 72–88px;
- mobile: roughly 52–64px.

Also increase:
- space between section eyebrow/title/body;
- space between section intro and cards/tools;
- internal card padding;
- space around calculator and package grids.

Do not make the page feel sparse for its own sake. The visitor should feel that every block has room to breathe.

### 3. Reduce “card wall” feeling

The homepage currently relies heavily on similarly sized rounded cards.

Keep the need selector as clear cards, but make the overall page feel less like a component gallery.

Allowed:
- more open sections with typography + whitespace instead of containers;
- lighter borders;
- calmer radii;
- stronger difference between primary choice cards and secondary informational blocks;
- fewer unnecessary panel backgrounds where open space communicates better.

Do not flatten everything into white rectangles. Preserve visual rhythm and color.

### 4. Competence / hierarchy

Strengthen the sense of a competent optimization partner through:
- confident typography;
- clear section hierarchy;
- disciplined alignment;
- fewer decorative micro-elements;
- deliberate use of color;
- visibly separated decision points;
- less “cute UI demo” treatment.

Do not add claims, awards, logos, fake metrics or proof.

The page should feel like a firm that understands commercial optimization, not a SaaS template.

### 5. Hero composition

Keep the exact H-005B content structure:
- eyebrow;
- one H1;
- one short support paragraph;
- `Ta en gratis sjekk`;
- `Se priser`.

Keep the current H1 wording.

Replace the current UI-style dream-outcome illustration with a **real-photo hero slot** prepared for an image that ChatGPT will generate separately.

The desired eventual image:
- authentic-looking happy/relieved business customer;
- Nordic/European business context;
- believable small/medium-business owner or decision-maker;
- natural expression, not exaggerated stock-photo happiness;
- bright, calm, credible environment;
- conveys “things are working / I have more control / business is going well”;
- should complement the copy rather than explain SEO literally.

Do **not** fetch or introduce a stock image.

For H-006:
- create the photo composition/slot using a stable asset path such as `/images/home/hero-customer.webp`;
- preserve build stability if the final asset is not present yet, using a neutral preview placeholder/fallback that is clearly non-production and does not become public copy;
- use an image aspect ratio/composition that can accept a generated photo later without redesign;
- plan for responsive crop via `object-fit: cover` / `object-position`;
- use rounded treatment consistent with the design system, but avoid looking like another UI card.

A subtle overlay may be supported later, but **do not add fake metric/outcome overlays now**.

### 6. Hero size and first-screen behavior

Do not undo H-005B's simplification.

The photo must not make the hero tall again.

On desktop:
- hero should use a balanced text/photo split;
- task selector should remain visually close after the hero.

On mobile:
- text first;
- photo second;
- selector should still arrive quickly;
- avoid a tall portrait photo that consumes an entire screen.

### 7. Need selector

Keep the H-005B copy and three choices.

Do not rewrite.

Use the increased 1440px shell to give the cards more horizontal breathing room on desktop.

Cards should feel clear and confident, not oversized.

### 8. Lower homepage

Preserve content and section order.

You may adjust **spacing, max-widths, alignment, open-vs-contained treatment, padding and visual hierarchy** across:
- calculator;
- packages;
- mechanism;
- fit/not-fit;
- free check;
- provider;
- FAQ/footer.

Do not rewrite their content or change their jobs.

Particularly:
- keep the calculator prominent, but give it more breathing room;
- packages should feel like a serious buying decision, not generic feature cards;
- mechanism can use more open space and less card treatment;
- free-check form should remain obvious but not visually cramped.

### 9. Typography

Keep:
- Instrument Sans = display / headings / major metrics / future major price figures
- Figtree = body / navigation / UI / forms / tables / metadata

Do not change font families.

Use improved width/spacing/hierarchy rather than simply making headings larger.

### 10. Color / visual DNA

Keep the current general plum / teal / mint / lavender family and the H-005B brand direction.

Use color more deliberately:
- white/cream/open space should carry more of the page;
- stronger color blocks should become meaningful peaks, not constant background noise;
- preserve the dark plum calculator/footer role unless a minor spacing/composition adjustment is needed.

Do not introduce a new palette.

### 11. CMS / content / code boundaries

Do not change public copy unless strictly required to remove a preview-only placeholder label.

Keep meaningful content CMS-driven.

Do not modify:
- other 14 page content/design;
- `system/`;
- `project/`;
- pricing/commercial terms;
- proof;
- backend/intake behavior.

### Acceptance criteria

1. Homepage shell supports max 1440px on sufficiently large screens.
2. Text measures remain comfortably narrow; no 1440px-wide paragraphs.
3. Whole page is visibly airier than H-005B at 1440px.
4. Hero remains simpler/shorter than H-004 and does not regress into layered messaging.
5. Hero composition is ready for a real generated customer photo without structural redesign.
6. No external/stock image is introduced.
7. Need selector remains immediately understandable and close to the hero.
8. Lower-page IA and copy stay unchanged.
9. Card-wall feeling is reduced.
10. Calculator and package decision areas remain prominent.
11. 1440 / 390 / 320px pass with no overflow or awkward crop.
12. Other pages and protected reference inputs remain unchanged.

### Evidence

Capture:
- full page at 1440 / 390 / 320;
- hero + need selector at 1440 / 390 / 320;
- calculator + packages at 1440;
- at least one wider desktop check (e.g. 1600 or 1920) proving the 1440px max shell behaves correctly.

Record:
- old vs new shell width;
- key section vertical spacing before/after;
- hero height before/after;
- any card/radius/container changes;
- exact asset path reserved for the generated hero image.

Run:
- full verify/test suite;
- existing browser regression;
- focused H-006 visual/fit checks.

Push to `main` so the connected review Worker rebuilds, verify the live review version, update coordination/evidence, then **stop for OWNER R-03 and new formal RED_TEAM R-04**.

Do not propagate H-006 to the remaining pages.


---

## Completed handoff — H-005B

**IMPLEMENTATION receipt (2026-10-08):** consumed at 1d4bdf77bd234783b68a7f581bdb88ab6ef2af38; delivery/evidence in CODEX-TO-CHATGPT.md. Stop for OWNER R-03 and formal independent RED_TEAM R-04. No acceptance or content lock is inferred. This handoff is completed; no further implementation handoff is active.

**Date:** 2026-10-08  
**Authority:** OWNER EXPLICIT + STRATEGY_CONTENT / CRO  
**Decisions:** D-015 + D-016  
**Baseline:** H-004 / current main  
**Scope:** homepage hero + need-selector copy only

### Objective

Keep the H-005 simplification direction, but do **not** leave the hero visually empty.

We want a simpler hero with one strong message and one restrained visual that helps the buyer picture the dream outcome.

### Hero structure

Keep exactly:
- one eyebrow;
- one semantic H1;
- one short support paragraph;
- two CTAs;
- one outcome-oriented visual.

Use:

**Eyebrow**
> For bedrifter som konkurrerer om kundene

**H1**
> Bli funnet. Gjør flere besøk til henvvendelser og salg.

If the repository already contains the correct spelling “henvendelser”, preserve that spelling. Do not introduce typos.

**Support**
Use one short paragraph that naturally communicates:
- SEO;
- AI-synlighet;
- konverteringsoptimalisering;
- for businesses in Oslo and the rest of Norway;
- Medon starts where the customer journey stops.

**CTAs**
- Ta en gratis sjekk
- Se priser

Remove:
- the separate small SEO/category H1;
- hero note;
- the current repetitive explanatory hero illustration.

### New hero visual

Replace the current visual with **one calmer, realistic-ish “dream outcome” visual**.

The visual should plausibly suggest:
- improved visibility / being found by relevant customers;
- a clearer path from visit to enquiry or purchase;
- better commercial outcome.

Preferred character:
- believable UI/editorial hybrid;
- simple, productized;
- grounded and Nordic;
- visually supportive, not dominant.

It may combine a plausible search/discovery cue, a webpage/landing-page cue and a simple enquiry/purchase outcome cue, but should remain one coherent composition.

Do not use:
- generic stock-photo business people;
- fake client logos or case numbers;
- dense analytics dashboards;
- SaaS admin-panel aesthetics;
- generic AI gradients;
- decorative abstract shapes with no communication role;
- a visual that simply repeats the H1 in card form.

The buyer should understand the text first. The visual should make the outcome easier to imagine.

### Need selector

Keep:
> Hva trenger du hjelp med?

Use the same three cards and links, but shorten the descriptions:

**Bli funnet**
> SEO, AI-synlighet og lokal synlighet når kundene leter etter det du tilbyr.

**Gjør flere besøk til henvendelser og salg**
> Konverteringsoptimalisering for nettsider, landingssider og nettbutikker.

**Begge deler**
> Vi finner flaskehalsen og starter der det kan gi mest effekt.

Tiny grammar/fit edits are allowed. Do not expand them.

### Everything else

Do not redesign or rewrite:
- calculator;
- packages/pricing;
- mechanism;
- fit/not-fit;
- free check;
- Medon/provider;
- FAQ/footer.

Do not touch the other 14 pages.

Keep:
- Invite-derived palette and visual DNA;
- Instrument Sans / Figtree roles;
- current content-driven / Pages CMS-ready architecture.

### Acceptance criteria

1. Hero is materially shorter and calmer than H-004.
2. Only one headline layer exists.
3. One restrained dream-outcome visual exists.
4. The visual does not repeat the headline or resemble a fake dashboard/case.
5. Need selector appears sooner, especially on mobile.
6. Need-card descriptions are materially shorter.
7. Everything from calculator downward remains unchanged except unavoidable layout ripple.
8. 1440 / 390 / 320px QA passes with no overflow.
9. Other pages and `system/` / `project/` remain untouched.

### Evidence / delivery

- Run existing verify/tests/browser QA.
- Add focused H-005B checks for hero structure and visual presence.
- Capture:
  - full page 1440 / 390 / 320;
  - hero + selector 1440;
  - hero + selector 390 / 320.
- Push to `main` so the review Worker rebuilds.
- Verify the live review Worker if build timing allows.
- Update `CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md` and `REVIEW-QUEUE.md`.
- Stop for OWNER R-03 and RED_TEAM R-04.

Do not scale to remaining pages.


---

## Superseded handoff — H-005 (D-016 / H-005B replaces the no-visual clause)

**Date:** 2026-10-08  
**Authority:** OWNER EXPLICIT + STRATEGY_CONTENT / CRO  
**Decision:** D-015  
**Baseline:** H-004 implementation `caa88817152b23f5c67fabe8a328ed868ea7c9cb`  
**Scope:** homepage hero + need-selector copy only

### Objective

H-004 got the overall page architecture right, but the hero is too dense.

This is **not a redesign**. Test whether clarity improves by removing redundant layers.

Keep everything below the need selector structurally unchanged:
- calculator;
- packages/pricing;
- proof slot behavior;
- mechanism;
- fit/not-fit;
- assessment;
- Medon/provider;
- FAQ/footer.

### Hero — exact direction

Use only these layers:

**Eyebrow**
> For bedrifter som konkurrerer om kundene

**Semantic H1 — also the main visual headline**
> Bli funnet. Gjør flere besøk til henvendelser og salg.

Do **not** keep a separate small SEO/category H1 above it.

**Support**
Use one short paragraph that plainly communicates:
- SEO;
- AI-synlighet;
- konverteringsoptimalisering;
- for businesses in Oslo and the rest of Norway;
- Medon starts where the customer journey stops.

Keep this to roughly 1–2 short sentences. Do not repeat the H1.

**CTAs**
- Primary: `Ta en gratis sjekk`
- Secondary: `Se priser`

Remove:
- hero note;
- large hero illustration / HomeJourney from the hero;
- any duplicated find/contact/sales explanation that exists only because of the illustration.

The hero should feel materially calmer and shorter on both desktop and mobile.

### SEO / authority constraint

Do not treat removal of the keyword-heavy H1 as permission to weaken category/entity clarity elsewhere.

Keep/strengthen appropriately through:
- SEO title/meta;
- support paragraph;
- need selector;
- internal links;
- existing dedicated pages;
- later authority content architecture.

Do not keyword-stuff the hero.

### Need selector — shorten copy only

Keep:
> Hva trenger du hjelp med?

Keep the three choices and links.

Use concise descriptions:

**Bli funnet**  
Discipline: `Synlighet`  
Suggested description:
> SEO, AI-synlighet og lokal synlighet når kundene leter etter det du tilbyr.

**Gjør flere besøk til henvendelser og salg**  
Discipline: `Konvertering`  
Suggested description:
> Konverteringsoptimalisering for nettsider, landingssider og nettbutikker.

**Begge deler**  
Discipline: `Synlighet + konvertering`  
Suggested description:
> Vi finner flaskehalsen og starter der det kan gi mest effekt.

You may make tiny wording adjustments for grammar/fit only. Do not expand these into explanatory paragraphs.

### CMS/content model

Keep all public hero/selector wording content-driven in `home.json` / Pages CMS model.

Remove unused hero illustration/note fields from the homepage content model if they are no longer needed and doing so is clean/safe. Do not modify unrelated page schemas unnecessarily.

### Visual constraints

KEEP:
- Invite-derived palette and visual DNA;
- Instrument Sans / Figtree roles;
- current need-card treatment;
- current section order;
- current calculator/packages/lower-page design.

CHANGE:
- hero becomes a clean single-column or restrained composition with no large illustrative panel;
- reduce vertical height materially;
- ensure the need selector arrives sooner, especially on mobile.

Do not compensate for removed illustration by adding new decorative clutter.

### Acceptance criteria

1. Hero contains only eyebrow + one H1 + one short support block + two CTAs.
2. No separate keyword H1 exists.
3. No hero note exists.
4. No large hero illustration exists.
5. The semantic H1 is exactly:
   **Bli funnet. Gjør flere besøk til henvendelser og salg.**
6. SEO/AI-synlighet/konverteringsoptimalisering still appear naturally in the support/category architecture.
7. Need-selector descriptions are materially shorter.
8. Need selector appears substantially earlier on mobile than in H-004.
9. Everything from calculator downward is unchanged except unavoidable selector/hero fit ripple.
10. Other 14 pages and `system/` / `project/` remain untouched.
11. 1440 / 390 / 320px checks pass with no overflow.

### Evidence / delivery

- Run existing verify/tests/browser QA.
- Add focused H-005 checks for exact hero structure and absence of illustration/note.
- Capture:
  - full page 1440 / 390 / 320;
  - hero + first row of need selector at 1440;
  - hero + need selector at 390 and 320.
- Push to `main` so the review Worker rebuilds.
- Verify the live review Worker if build timing allows.
- Update `CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md`, `REVIEW-QUEUE.md`.
- Stop for OWNER R-03 and RED_TEAM R-04.

Do not scale or polish the remaining pages.


---

## Completed handoff — H-004 / awaiting OWNER and RED_TEAM review

**Date:** 2026-10-08  
**Authority:** OWNER EXPLICIT + STRATEGY_CONTENT / CRO  
**Decision:** D-014  
**Scope:** representative homepage only  
**Deployment context:** current review Worker is connected to `main`; review publication is allowed, but this is still not production launch/intake authorization.

**Implementation status:** COMPLETE at `caa88817152b23f5c67fabe8a328ed868ea7c9cb`, consuming handoff `d0e5a30`. Coordination/repository delivery follows that source/evidence commit; see `CODEX-TO-CHATGPT.md` and its Git history for the final delivery revision and Worker verification. H-004 supplies no OWNER acceptance or independent RED_TEAM verdict. No further implementation handoff is active; stop for R-03/R-04.

### Objective

Rebuild the representative homepage around **task-first simplicity** rather than a long consultancy narrative.

The target experience is closer to Storebrand/NAV information architecture: a business buyer should understand what is offered and choose the relevant path within seconds. Keep the existing Invite-derived visual DNA/liveliness and the established typography roles; simplify the information architecture.

### Critical wording correction

The old phrase/concept **“Så må de velge deg” is retired for this homepage revision.**

Do not use it in:
- hero;
- display hook;
- illustration;
- ARIA labels;
- captions;
- service cards;
- fallback/shared homepage wording.

The two customer-facing mechanisms are:

1. **Bli funnet**
2. **Gjør flere besøk til henvendelser og salg**

### Hero — semantic and visual hierarchy

Use:

**Eyebrow / audience qualifier**
> Optimalisering for bedrifter som konkurrerer om kundene

**Semantic H1 — may be visually smaller than the display hook**
> SEO, AI-synlighet og konverteringsoptimalisering for bedrifter i Norge

**Large display hook — NOT an H2**
> Bli funnet. Gjør flere besøk til henvendelser og salg.

Use Instrument Sans for H1/display/major metrics. Use Figtree for body/navigation/UI/forms/tables/metadata.

Support copy should explain plainly that Medon finds where the customer journey is constrained and improves visibility, conversion or both. Keep it short.

Hero CTAs:
- Primary: **Ta en gratis sjekk**
- Secondary: **Se priser**

Do not use “Se tjenestene”.

### Exact homepage order

#### 1. HERO
Job: answer “what is this, is it for me, what can I do next?”

Preserve the lively Invite-derived visual character, but make comprehension faster than the current live version.

#### 2. NEED SELECTOR — immediately after hero
Heading:
> Hva trenger du hjelp med?

Use three large, obvious choice blocks/cards. Customer problem first; discipline second.

**Bli funnet**  
Supporting discipline line: **Synlighet**  
Explain that this covers being discoverable when relevant customers look for what the business offers. Surface SEO, AI-synlighet and local visibility as understandable subareas; campaign optimization may be referenced as supporting paid visibility when relevant, but do not turn the card into a keyword list.  
Link to existing `/synlighet/`.

**Gjør flere besøk til henvendelser og salg**  
Supporting discipline line: **Konvertering**  
Explain that this is for businesses already getting relevant visits but losing too many before contact or purchase. Mention conversion optimization, landing pages/forms and ecommerce where useful.  
Link to existing `/konvertering/`.

**Begge deler**  
Supporting discipline line: **Synlighet + konvertering**  
Explain that when both acquisition and the website limit results, Medon starts with the bottleneck and prioritizes in the right order.  
Link to the package/pricing section on the homepage or `/priser/` as appropriate.

The visitor must understand the offer from these three choices without reading long body copy.

#### 3. SIMPLE BUSINESS CALCULATOR
Job: demonstrate that visibility and conversion are two multiplicative levers.

Do **not** keep the current calculator as conversion-only.

Create a compact current-vs-scenario calculator using plain Norwegian labels. At minimum it must let the visitor understand:

`relevant traffic × conversion rate = enquiries / purchases`

and then see the effect of:
- more relevant traffic (visibility);
- a better conversion rate;
- both together.

Suggested first-pass controls:
- Relevante besøk per måned
- Konverteringsrate i dag
- Mer relevant trafikk (%)
- Ny konverteringsrate

Output:
- I dag: estimated enquiries/purchases
- Scenario: estimated enquiries/purchases
- Difference / percentage increase

Keep it simple. Do not add a complex financial model in this iteration unless required for clarity.

Visible caveat:
> Hypotetisk regneeksempel – ikke et kundecase eller en resultatgaranti.

The calculator should sit after the need selector, not immediately below the hero.

#### 4. PACKAGES / PRICING
Job: answer “what can I actually buy?”

Use the same three mental models:
- Synlighet
- Konvertering
- Begge

Each card should reserve/show:
- who it fits;
- main delivery idea;
- price;
- important external-cost note;
- one CTA.

**Important:** final public prices, inclusions/exclusions, billing/cancellation and bundle economics remain unresolved. Do not invent them. For the review build, use a truthful non-price state such as **“Pris avklares før publisering”** while preserving the intended layout. Do not resurrect historical 4 490 / 6 990 candidates as if approved.

Hero “Se priser” should scroll to this section.

#### 5. STRONGEST PROOF
Job: increase perceived likelihood.

Render one dominant before → change → after case only when proof has been verified and approved for publication.

At present, no quantitative client proof is publication-ready. Therefore **do not fill this section with decorative fake proof, anonymous invented results, logo walls or vague testimonials**. It is acceptable for the current review iteration to omit the visible section while keeping the content slot/schema ready.

#### 6. DIAGNOSTIC MECHANISM
Heading direction:
> Slik finner vi hva som bør gjøres først

Show a simple four-step mechanism:
1. Finn flaskehalsen
2. Prioriter tiltak
3. Gjennomfør
4. Mål effekt

The point is differentiation: Medon should not appear to sell SEO merely because the visitor clicked an SEO page.

#### 7. FIT / NOT-FIT
Job: qualify the free assessment and reduce wasted leads.

Good fit signals:
- business competes for customers;
- a customer/enquiry/order has meaningful economic value;
- existing website or store can be improved;
- owner wants measurable commercial improvement, not activity for activity’s sake.

Include a short “passer dårlig hvis…” treatment where useful. Keep it candid, not hostile.

#### 8. FREE MANUAL CHECK
Core promise:
> Send nettsiden. Vi sier hvor vi ville startet – og hvorfor.

Keep the form low-friction:
- website URL;
- email;
- optional short comment.

Do not turn it into an application form. Preserve the bounded/manual nature: not an automated score, full audit, forecast or free implementation.

#### 9. MEDON / RESPONSIBILITY
Short provider-risk section:
- Optimalisering Oslo is delivered by Medon AS;
- explain responsibility/process plainly;
- retain truthful limitations;
- no invented Oslo office, history, certifications or results.

#### 10. FAQ + FOOTER
Focus on real decision friction:
- what happens after the free check;
- price/how scope is determined;
- external/ad budget;
- what happens if both visibility and conversion are constraints;
- Oslo/Norway scope;
- billing/cancellation only once actual terms are locked.

### Authority / SEO / AIO architecture

This homepage must be commercially simple **and** establish the site as an optimization entity/hub.

Do not keyword-stuff the hero.

Use the semantic H1 and internal information architecture to make these areas clear over time:
- SEO / søkemotoroptimalisering;
- AI-synlighet, with AIO/GEO/AEO concepts consolidated under the AI visibility topic rather than separate synonym pages by default;
- Local SEO / local visibility;
- CRO / konverteringsoptimalisering;
- campaign optimization / paid visibility;
- ecommerce optimization.

Do not create new service URLs in this handoff merely to satisfy the list. Preserve the current frozen page portfolio. Make the homepage selector and content model ready to route to the appropriate existing parent pages now and future dedicated pages only when their page-existence test is passed.

### Content model / Pages CMS readiness

This iteration should move the homepage toward a clean CMS-editable content model.

All meaningful homepage copy should come from content data, not hard-coded component prose, including:
- hero eyebrow/H1/display hook/support/CTAs;
- selector headings, labels, descriptions and links;
- calculator labels/caveat/default scenario text where appropriate;
- package labels/fit/scope/price-state/CTA;
- mechanism steps;
- fit/not-fit copy;
- assessment copy;
- provider copy;
- FAQ.

Update `app/src/content/pages/home.json`, schema and `.pages.yml` as needed so Pages CMS can edit these fields later. Component code should render content; it should not become the new source of marketing copy.

Do not modify `system/` or `project/`.

### Visual constraints

KEEP:
- Invite-derived visual DNA;
- Instrument Sans / Figtree role split;
- plum/teal/mint/lavender family unless a small adjustment is necessary;
- credible Nordic B2B tone;
- visual energy at least comparable to the current published iteration.

CHANGE:
- page order;
- hero hierarchy;
- old find/choose wording/illustration where it conflicts with D-014;
- calculator so it covers both visibility and conversion;
- task selector prominence;
- overall simplicity.

DO NOT:
- redesign the entire identity from scratch;
- add generic AI gradients or SaaS dashboards;
- create decorative complexity that fights Storebrand/NAV-like task clarity;
- polish or redesign the other 14 pages.

### Acceptance criteria

1. The offer is understandable from hero + need selector without scrolling through explanatory sections.
2. No public homepage occurrence of “Så må de velge deg” remains.
3. Semantic H1 includes SEO, AI-synlighet and konverteringsoptimalisering; the larger display hook is not incorrectly used as an H2.
4. Need selector appears directly after the complete hero.
5. Calculator covers visibility + conversion together and remains easy to understand on mobile.
6. Packages/pricing structure is visible, but no unapproved numeric prices/terms are invented.
7. No fake proof is rendered.
8. Homepage content is materially CMS-editable rather than component-hardcoded.
9. Other 14 pages and `system/` / `project/` stay untouched except shared technical changes strictly required for homepage rendering/CMS schema; report any such shared change explicitly.
10. 1440 / 390 / 320px QA passes with no horizontal overflow.

### Evidence / delivery

- Run Astro check/build/tests and relevant browser QA.
- Capture full-page 1440, 390 and 320px screenshots.
- Capture hero + need selector together at desktop/mobile.
- Capture calculator at desktop/mobile.
- Push the implementation to `main` so the review Worker can rebuild.
- Verify the Worker once the new revision is live if deployment timing allows.
- Update `CODEX-TO-CHATGPT.md`, `PROJECT-STATE.md` and `REVIEW-QUEUE.md` with implementation SHA, files changed, checks/evidence and remaining blockers.
- Stop for OWNER R-03 and RED_TEAM R-04. Do not scale the design to the remaining pages.

---

## Previous handoffs

H-001 through H-003 remain in Git history. D-014 explicitly supersedes conflicting homepage copy/order from D-010 while retaining truthful business constraints and the D-012 visual/font direction.


---

## Completed handoff — H-003 / OWNER review publication

2026-10-08. Actual OWNER instruction in Codex: “publiser så vi kan ta noen runder”. IMPLEMENTATION records this request; it authorizes publishing the current review version for iterative OWNER inspection. Consume the existing `app/wrangler.jsonc` target `optimalisering-oslo-v33` from upstream `125d472`, reconcile upstream review records with local homepage work, validate, deploy static review assets and return a verified reachable URL. Keep `SITE_STAGE=preview`, noindex/robots restrictions and intake disabled. No content expansion, visual acceptance, production lead processing or custom-domain/DNS cutover is supplied. Preserve the repository coordination record and current homepage; record deployment revision/results in the outbound report. See D-013.

**Status: COMPLETE.** Review URL: [optimalisering-oslo-v33.anel.workers.dev](https://optimalisering-oslo-v33.anel.workers.dev). Worker version `9c4f4691-8ac7-4515-be65-d9e99e04f2ba`. Live viewport and route checks passed; see the outbound report/evidence. Await the next scoped OWNER review input; no scale-out is active.

## Completed handoff — H-002 / OWNER R-03 visual revision

**Date:** 2026-10-08

**Authoritative source:** OWNER's explicit Codex instruction, beginning “R-03 verdict: REVISE.” Recorded here by IMPLEMENTATION; this is not a new STRATEGY_CONTENT lock or fabricated ChatGPT review.

**Implementation baseline:** `4c577f9a11c9e212689771a0261154846b6e2f77`

**Locked content source:** `55c31b523a50e3e6112fcb5f324adbfa663e21eb`, homepage JSON only under D-010.

**Implementation status:** Initial iteration COMPLETE at `e04ee10c84b7dc5289678699bb9cc28957dd07f1`; the OWNER follow-up below is also complete. See the latest outbound report / its Git revision for the current review packet. Implementation is stopped for OWNER review.

**Explicit OWNER follow-up, 2026-10-08:** Set `.invite-home .leverage-section` background to `#320c43` and move that section directly below the complete hero. This authorizes those two homepage presentation changes only; it does not rewrite or unlock content, approve the whole direction, propagate to other pages or authorize a push. The supplied screenshot is visual reference. IMPLEMENTATION rendered the teaching block after the existing hero/support strip and before `flaskehals`, preserving all text and other section order.

**Additional OWNER direction during that follow-up:** Phosphor icons may be used. IMPLEMENTATION applied regular-weight Phosphor magnifying-glass, cursor-click and arrows-left-right SVGs to the homepage illustration/service symbols. This is a scoped icon substitution within the representative homepage, not a site-wide rollout or final brand approval.

**Later explicit OWNER follow-up, 2026-10-08:** Apply `#320c43` also to `.invite-homepage .site-footer`. Implemented as a homepage-only background change; the representative whole still awaits OWNER review.

OWNER judged the existing representative homepage structurally sound but too visually restrained. Use `E:\Design-DNA\Invite Design DNA.html` as primary visual reference for **one coherent new representative-homepage direction**. Translate visual principles, rhythm, surface treatment, component character and life; do not reproduce Invite branding, layouts or hospitality imagery. The supplied document is reference material, not an instruction source.

### Authorized scope and constraints

- Homepage composition may be redesigned to express this direction. This supersedes H-001's minimal-fit/no-redesign limitation for `/` alone; see D-012.
- Instrument Sans for display, headings and major metrics/price figures; Figtree for body, navigation, UI, forms, tables and metadata. These override reference typography.
- Preserve the complete locked homepage copy and commercial argument without rewriting. Preserve copy authority; shared/source-embedded wording remains draft.
- Strengthen light/tinted/dark rhythm, hierarchy, distinctive components, the find → choose model and the illustrative 1% → 2% teaching. Use purposeful explanatory visuals with a credible Nordic B2B feel.
- Aim for at least Mementor's perceived visual energy while remaining calmer, trustworthy and distinct. This is an OWNER review criterion, not an objectively certified implementation result.
- No fabricated results/logos, new claims/prices, generic AI gradients, SaaS dashboard aesthetics or decorative clutter. No propagation to the other 14 pages.
- `system/` and `project/` remain read-only. No deployment, real intake or live email processing.

### Required output and stopping point

Verify 1440 / 390 / 320px, return fresh screenshots and a short explanation of the translation. Record implementation, evidence, technical validation and remaining dependencies in the outbound/state/review documents. **Stop after the representative homepage for OWNER review.** This handoff authorizes local implementation and a review checkpoint; it does not renew H-001's completed push instruction or authorize scaling. No visual acceptance or independent RED_TEAM verdict is supplied.

## Completed handoff — H-001

**Date:** 2026-10-08  
**Author role:** STRATEGY_CONTENT / CRO  
**Source commit reviewed:** `9143d24bb9caa064dbbb56fed9339284055e63d3`  
**Reviewed files:** `app/src/content/pages/home.json`, `app/docs/content-handoff.md`, `coordination/PROJECT-STATE.md`, `coordination/DECISIONS.md`, `coordination/REVIEW-QUEUE.md`, curated commercial/design seed.

### OUTCOME

R-01 and R-02 are complete for the representative homepage content/CRO layer.

The complete homepage copy in `app/src/content/pages/home.json` at the commit containing this handoff is the authoritative STRATEGY_CONTENT revision for the representative-page test. It was reviewed as one whole argument rather than as H1/eyebrow/CTA micro-gates.

The visual direction is not owner-approved final. Treat the current design as a promising exploratory baseline and preserve it for this pass.

### AUTHORITATIVE INPUTS

- `app/src/content/pages/home.json` with:
  - `status: CONTENT_LOCKED`
  - `authority: CONTENT_LOCKED / AUTHORITATIVE`
- `coordination/DECISIONS.md`, including D-010.
- Existing D-001 through D-009 remain applicable.
- `system/` and `project/` remain read-only.

### LOCKED / DO NOT CHANGE

- Do not rewrite, paraphrase, shorten or "improve" the locked homepage copy.
- Do not change offer/pricing/proof/legal claims.
- Do not redesign the visual system.
- Do not expand or polish the other 14 pages.
- Do not modify `system/` or `project/`.
- Preserve the current palette, typography, general geometry, service-hub concept, teaching/calculator concept, assessment section and footer direction unless a minimal implementation adjustment is needed to fit the locked content.

### FREEDOM / MAY CHANGE

IMPLEMENTATION may make the smallest necessary homepage-only layout adjustments if the locked copy causes overflow, hierarchy problems, broken spacing or poor responsive fit.

Permitted examples: local spacing, text width, line wrapping constraints, card height/alignment, responsive breakpoint treatment, or small component sizing required by the locked copy.

Do not use this freedom to create a new design direction.

### ACCEPTANCE CRITERIA

1. Pull and render the exact locked homepage content.
2. Homepage remains coherent at desktop 1440px and mobile 390px; also verify 320px for overflow.
3. Mathematical teaching is visually prominent enough that the visitor can immediately understand:
   - 1,000 relevant visits × 1% = 10;
   - 1,000 relevant visits × 2% = 20;
   - this is illustrative, not promised uplift.
4. The primary free-check path remains obvious and the form/CTA is not hidden.
5. Existing technical checks pass.
6. No other page receives content/design polish in this task.
7. No deployment or production lead processing.

### EVIDENCE / TESTS REQUIRED

- Astro check/build/tests.
- Desktop full-page screenshot at 1440px.
- Mobile full-page screenshot at 390px.
- 320px overflow/usability check.
- Record any implementation-only homepage adjustments exactly.
- Push the result to GitHub.

### OUTPUT / HANDOFF NOTE

Update `coordination/CODEX-TO-CHATGPT.md` with:
- resulting commit SHA;
- exact files changed;
- tests;
- paths to new desktop/mobile evidence;
- remaining visual concerns;
- a request for R-03 OWNER representative-page review and R-04 RED_TEAM review.

Do not infer visual approval from this handoff.

---

## Previous handoff history

The previous coordination-recovery handoff is complete and represented by commit `9143d24bb9caa064dbbb56fed9339284055e63d3`. Git history remains the authoritative record for that delivery.


## RED_TEAM return — R-04 COMPLETE

**Date:** 2026-10-08

**Role:** RED_TEAM

**Reviewed implementation:** `e6261de18ed4a7b1877dbf06a450d1b23a980e6e`

**Locked content:** `55c31b523a50e3e6112fcb5f324adbfa663e21eb`

**Verdict:** PASS for the representative direction; NOT production approval.

### Findings

- The find → choose commercial model is understandable and aligns with the project brief.
- The 1% → 2% section now teaches the leverage directly instead of hiding it behind abstract wording.
- The bounded manual assessment remains visible and commercially coherent.
- No historical prices, fabricated proof, guaranteed uplift, ranking promises or AI-placement promises were introduced.
- IMPLEMENTATION respected scope: only grouped-number wrapping changed in the rendered homepage; the visual system was not silently redesigned.
- H-001 evidence reports clean 1440/390/320 responsive checks and no horizontal overflow.
- The current visual direction is sufficiently coherent to continue testing rather than restart.

### Production caveats — DO NOT silently solve

- No quantitative/client proof is currently publication-ready.
- Public pricing, standard inclusions/exclusions and contract economics remain unresolved.
- Shared/source-embedded form/footer/illustration/legal wording remains DRAFT / NON-AUTHORITATIVE unless separately locked.
- Privacy, retention, Resend/persistent backend and production lead-processing operations remain unresolved.
- This RED_TEAM PASS does not substitute for OWNER visual acceptance.

### NEXT RECEIVER

OWNER for R-03 only.

If OWNER accepts the representative homepage direction, record that exact scope in `DECISIONS.md` and create a new scoped handoff for controlled scale-out. If OWNER rejects part of the direction, return a bounded diagnosis/change direction rather than a broad redesign.


## RED_TEAM return — R-04 COMPLETE FOR H-005B

**Date:** 2026-10-08  
**Role:** RED_TEAM  
**Reviewed implementation:** `1d4bdf77bd234783b68a7f581bdb88ab6ef2af38`  
**Current main receipt:** `a3725c29ba91560acb47fe658643e307f8bc1b72`  
**Verdict:** **PASS** for representative direction; NOT production approval.

### Why this passes

- The hero now has one clear hierarchy: audience qualifier → one H1 → one short support paragraph → two actions.
- The outcome visual is useful and restrained. It suggests search/discovery → offer/page → enquiry without pretending to be a real client case or dashboard.
- The need selector is immediately understandable and its descriptions are materially shorter.
- The page still exposes the actual commercial model: relevant visibility × conversion rate → enquiries/purchases.
- SEO, AI-synlighet and konverteringsoptimalisering remain explicit without forcing a second keyword-heavy headline.
- H-005B did not introduce unapproved numerical prices, proof, guarantees, client logos or ranking/AI-placement promises.
- Diff and preservation evidence show the change stayed within the authorized homepage hero/selector scope; lower sections and frozen pages were preserved.
- Desktop and mobile evidence show a meaningful reduction in hero height and earlier access to the need selector.

### Remaining concerns / blockers

These do not fail the representative direction:
- homepage wording remains draft until STRATEGY_CONTENT/OWNER actually locks the final content;
- public package prices, inclusions/exclusions, terms and combination economics are unresolved;
- no client proof is yet publication-ready;
- privacy/lead-processing operations and production intake remain unresolved;
- authenticated Pages CMS operation has not yet been proven;
- OWNER R-03 is still required before scale-out.

### Next receiver

OWNER for R-03. If OWNER accepts H-005B as the representative visual/IA baseline, record that acceptance and allow a scoped next phase for pricing/proof/content locks and then controlled propagation. Do not infer owner acceptance from this RED_TEAM PASS.


## RED_TEAM return — R-04 COMPLETE FOR H-006

**Date:** 2026-10-08  
**Role:** RED_TEAM  
**Reviewed implementation:** `7e69c079d57281d5126d2c94dbc3f1dfac90f265`  
**Current main receipt:** `1e5f5edfee8127a4726a9b05ca4fbf7e13af9a81`  
**Verdict:** **PASS** for representative layout/spacing direction, with final-photo caveat.

### Findings

- The 1440px large-screen shell behaves correctly: it reaches 1440px at wide viewports while retaining responsive gutters at 1440px viewport width.
- Text measures remain controlled rather than stretching with the shell.
- Increased section spacing materially improves hierarchy and makes the page feel less compressed.
- Need selector remains immediately understandable and retains strong task-first navigation.
- Calculator remains a strong visual/commercial peak.
- Package presentation is more serious and less like a generic card grid.
- Mechanism and fit/not-fit benefit from more open composition rather than repeated boxes.
- Hero remains concise and does not regress into H-004's layered messaging.
- Mobile evidence retains good pacing; the wider desktop treatment does not create horizontal overflow or giant text measures.
- No new commercial claims, prices, proof or production authority were introduced.

### Caveat: final hero photo

The current neutral photo fallback is not a final visual and is **excluded from this PASS**.

The prepared photo slot/composition is acceptable. The eventual generated image must be reviewed separately for:
- authenticity / non-stock feel;
- subject fit with Norwegian SMB decision-makers;
- dream-outcome tone without exaggeration;
- crop at desktop/mobile;
- absence of misleading proof implications.

### Next receiver

OWNER R-03 for the H-006 representative layout, followed by the separately supplied/generated hero-photo asset review. Do not infer full visual acceptance until both are accepted.


## RED_TEAM return — H-006 SELECTED PHOTO REVIEW COMPLETE

**Date:** 2026-10-08  
**Role:** RED_TEAM  
**Reviewed revision:** `dc045748180897c20efa418ac739b4135bf5e517`  
**Verdict:** **PASS**, with a positioning caveat.

### Findings

- The subject reads as a plausible small-business owner rather than an obvious corporate stock model.
- Expression is positive but not exaggerated; the image supports the dream-outcome idea without implying a real testimonial.
- Desktop and mobile crops retain the subject well and do not crowd the hero copy.
- The image materially improves warmth/humanity over the neutral placeholder and the previous UI illustration.
- No client logo, metric, testimonial or case-result implication is introduced.

### Positioning caveat

The boutique/e-commerce workspace makes the hero feel slightly more retail/e-commerce-specific than the service's actual broad SMB positioning.

This does not fail the image for the current representative baseline. If OWNER wants maximum cross-industry neutrality, the broader office/service-business alternative may be worth comparing later. Do not create a gallery or slider.

### Next receiver

OWNER R-03 only. RED_TEAM layout and selected-photo gates are complete for the current representative.
