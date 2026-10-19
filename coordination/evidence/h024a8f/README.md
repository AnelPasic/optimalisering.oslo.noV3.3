# H024A8F — native CMS help polish; homepage proposal only

**Help fix DELIVERED / label subissue STOP: native limitation / homepage composition OWNER choice pending.** Authority D-104. Incoming main `6dda6abce9b4f2c4c2715982aa2f13c6d99269ca`; concurrent coordination-only `25c0c06` merged without source changes. Preserve OWNER's actual order save `f562b7e`. Implementation `75a953c3b9119f0eb5512b112da6c126e8f712f9`.

## Actual editor result

Exactly **three verbose descriptions** were removed from `.pages.yml`, one per Top/Main/Bottom field. Fresh authenticated editor shows **9 repeated instructions before → 0 after**, all8 main rows visible together, native sort handles/Add/Remove, current Top row and current OWNER order retained. [Before screenshot](cms-before.jpg) / [after screenshot](cms-after.jpg), [native before](native-before.json) / [actual after + picker/master-help readback](native-after.json).

Collapsed friendly names are **not restored**. [Official native interpolation/source and observed limitation](native-summary-limit.md) show summaries read stored values, not select-option labels. The actual row says `regneeksempel` while the expanded picker says `Konverteringskalkulator`. We introduce no second name field, label registry, eight-type model, reference migration, custom CMS or DOM hack. Small supported workaround: use the existing Norwegian picker and named **Globale elementer** library until upstream supports display-label summaries. This subissue stops under the explicit D-104 fallback.

Removal/link help stays inside expanded reference rows; named master editors still explain shared-edit effects. These were verified in fresh authenticated tabs, not inferred from schema alone; [actual expanded help](cms-help-after.jpg). A native keyboard Space/ArrowDown/Escape probe confirms pickup/movement/cancellation, original order and disabled Save; [receipt](native-keyboard-cancel.json). This is not a new persisted reorder roundtrip or mouse-drag proof. No CMS data Save is required or claimed for this configuration-only change. No temporary content mutation/revert or order restoration occurs; fresh Save stays disabled.

## Verification and preservation

- [Full verify](verify.log): **156 tests**, CMS28, static/copy/surface and **196 typography groups** PASS; zero Astro errors/warnings.
- Native Cloudflare Build **f67b4674-7c1b-48aa-a06a-9260735036d5 SUCCESS**, commit `75a953c`, Worker **e7e02489-0154-47c9-9f7f-b064ccad5fb5 at100%**, deployment `9b87ae6a-a0df-4fc7-846c-f937b0d7b690`.
- [Before Worker](before/checks.json) / [after Worker](after/checks.json): all **56 public artifacts byte-identical**, four exact text/layout/order snapshots at1440/900/390/320. Zero overflow, duplicate IDs/H1 errors, browser JS errors or public POSTs; noindex and disabled form remain.
- [Preservation](preservation.json): all **29 source content records**, app source/public assets/server and readonly system/project Git blobs exact; incoming home bytes exact. Only3 parsed CMS description keys differ; all other configuration values remain equal.
- [Full incoming content snapshot](incoming-content.json), [home](incoming-home.json), [CMS config](incoming-pages.yml). Five pre-existing OWNER images remain untouched.
- Native labels/visibility/select controls unchanged; no website component/layout/copy/price/proof/form/route change. Existing source guards, anchor protections, library UI protection and shared authority are preserved. D-103 ordering PASS is retained, not expanded to whole-editor acceptance.

## Homepage decision — proposal only

[Exact keep/move/hide/remove shortlist](HOMEPAGE-SHORTLIST.md), with measured [length/CTA estimates](composition-estimates.json).

**A, recommended compact:** Hero → Kunderesultater → Pakker og priser → Gratis sjekk → FAQ. Hide only the OWNER-local Top test placement; remove homepage references to calculator, selector, mechanism and fit, retaining their masters. Four sections after Hero, estimated40% shorter at390px. Tradeoff: less interactive explanation/service routing/self-qualification; contact appears later in ordinary scrolling.

**B, calculator retained:** Hero → Konverteringskalkulator → Kunderesultater → Pakker og priser → Gratis sjekk → FAQ. Same actions except keep calculator first, five sections after Hero, estimated29% shorter at390px. Both retain exact price/contact anchors and current CTA text. These estimates subtract measured current section heights; no proposed composition has been rendered, saved or implemented.

## STOP

OWNER reviews actual CMS readability/native label limitation and explicitly chooses a homepage composition. No existing placement was moved/hidden/removed. Whole H024A8E/H024A3 remains OPEN, H024B BLOCKED, H022 PARKED; noindex/intake disabled, no launch/index/domain/other-page authorization. [Review artifact](comparison.html) shows native CMS screenshots and proposal outlines, not a redesigned website.
