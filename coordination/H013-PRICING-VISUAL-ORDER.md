# H-013 pricing visual architecture + direct ordering

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT
Status: LOCKED FOR H-013 IMPLEMENTATION REVIEW

## Why H-013 exists

H-012 passes on:
- package logic;
- exact public copy;
- shared source of truth;
- sequential vs parallel distinction;
- Partner complexity model;
- price ladder.

H-012 does **not** pass visually.

The current CSS/SVG curve treatment is too weak and the full pricing cards feel more like an admin/pricing table than a strong commercial decision surface.

Do not reopen the package strategy. Improve how it is presented.

## Visual reference principle

Target the clarity/impact of the approved mockup direction:
- three clearly differentiated packages;
- Vekst visually dominant but credible;
- a meaningful visual area in each card;
- recognizable situations;
- recognizable work/focus areas using icons;
- enough white space that cards do not become walls of text;
- full /priser/ can be detailed, but it must still scan quickly.

Do not copy Mementor artwork/mascot/branding.

## 1. Three independent package visual fields

Each package gets its own CMS-editable visual asset.

Suggested data:
- visualAsset.src
- visualAsset.alt
- optional visualAsset.positionX / positionY only if raster crops are supported

Dedicated media path:
- /images/pricing/

Accepted file types:
- SVG preferred for conceptual package visuals;
- WebP/PNG allowed if ChatGPT supplies raster artwork.

The current inline PackageVisual curve component becomes fallback/development-only. It must not constrain the final composition.

ChatGPT will supply/approve the final three visual assets separately.

### Visual semantics remain locked

Optimalisering:
- one controlled moderate upward movement;
- one lever / one problem;
- not exponential;
- no percentage.

Vekst:
- one clearly stronger exponential-style movement;
- communicates compound effect from two reinforcing levers;
- one dominant curve, not two persistent parallel arrows;
- no percentage.

Partner:
- several distinct upward tracks;
- represents multiple customer journeys;
- slightly stronger overall movement than current;
- controlled, not “moonshot”.

## 2. Structured icon items

Each package needs structured icon items rather than a flat text list.

Suggested schema:
- icon: enum/key
- label
- optional short description

Use the existing project icon system or professional local SVG/Lucide/Phosphor-style icons.

Do not use emojis.

Example icon keys needed:
- search / SEO
- conversion / funnel
- local / location
- Google Ads / paid search
- Meta Ads / social paid
- analytics / measurement
- landing page / page
- customer journey / route

Do not use third-party brand logos unless already permitted/available in-project; generic professional icons are acceptable.

The icon items should make “what we work with” understandable at a glance.

## 3. Card information hierarchy

### Homepage compact cards

Keep these concise:
1. package name + price
2. descriptor
3. package visual
4. one short “Passer for” sentence
5. primary direct-order CTA
6. secondary “Se pakken” link

Do not show all situation bullets or icon items on homepage.

### /priser/ full cards

Recommended visible hierarchy:
1. package name + price
2. descriptor
3. large package visual
4. Passer for
5. Typiske situasjoner — max 3 concise bullets
6. Fokus / populære kombinasjoner / arbeidsområder — structured icon items
7. selection rule / important distinction
8. direct-order CTA
9. secondary free-check path where useful

Do not force equal card heights by shrinking type or cramming content.

Vekst should remain the visually favored center card.

## 4. Direct ordering is required

The free check must **not** be the only or primary CTA on pricing/package cards.

A buyer who already knows what they need must be able to go straight to ordering.

### Primary CTA per package

Homepage:
- Bestill Optimalisering
- Bestill Vekst
- Bestill Partner

/priser/:
- Bestill Optimalisering
- Bestill Vekst
- Bestill Partner

The package CTA must take the buyer directly to a single order section/form on /priser/ with the chosen package preselected.

Preferred URL pattern:
- /priser/?pakke=optimalisering#bestill
- /priser/?pakke=vekst#bestill
- /priser/?pakke=partner#bestill

A clean equivalent is acceptable if routing/form logic is safer.

### Secondary CTA

Keep free check as the uncertainty path, not the main buying path:

> Usikker? Ta en gratis sjekk

On homepage compact cards, the existing “Se pakken” secondary path may remain alongside direct order.

## 5. Order section/form

Add one compact order section to /priser/ after the package decision area and before broad FAQ/footer material.

Heading:
> Bestill pakken som passer

Support:
> Velg pakken og send bestillingen. Vi bekrefter oppstart og det avtalte omfanget før arbeidet starter.

For Partner add contextual note when selected:
> Partner starter fra 14 900 kr/mnd. Omfang og fast månedspris bekreftes før oppstart.

Minimum fields:
- Pakke — select, preselected from CTA/query
- Bedrift
- Nettside / nettbutikk
- Kontaktperson
- E-post
- Telefon — optional
- Kort kommentar — optional

Submit label:
> Send bestilling

Secondary path below/next to form:
> Usikker på pakken? Ta en gratis sjekk

This is not a payment checkout.

Do not invent:
- binding period;
- cancellation terms;
- setup fee;
- payment timing;
- start date;
- SLA.

The order flow may state only that scope/start is confirmed before work begins.

## 6. Intake safety / preview behavior

Current production intake is intentionally disabled/unproven.

H-013 must build and test the order UX without silently enabling real production submissions.

Requirements:
- reuse the existing lead/intake architecture where safe;
- include package/order intent in the payload/data model;
- no real production lead processing enabled by this handoff;
- preview may visibly show the form and selected package;
- if submit must remain disabled in preview, the UI should still allow OWNER to review the complete buying flow;
- document exactly what must be enabled/configured before real order submissions go live.

Do not create a fake success state that implies a real order was sent.

## 7. Package visual assets are CMS content

Pages CMS should expose:
- visual asset per package;
- icon items per package;
- order CTA label/path only if safe to edit;
- existing package content.

Use validation so a missing final package visual falls back cleanly and never produces a broken image.

Do not make package price/ordering split into separate duplicated CMS sources.

## 8. Layout / design target

The H-012 full cards are too text-heavy.

H-013 should:
- increase breathing room around visual and sections;
- visually group “Typiske situasjoner”;
- use icon grid/row for work areas;
- keep card borders/background restrained;
- let Vekst read first without making Optimalisering/Partner look disabled;
- preserve Storebrand-like airiness;
- preserve current colors/fonts;
- avoid dashboard aesthetics.

Do not redesign the whole pricing page.

## 9. Decision + multiplier blocks

Keep H-012 decision logic and multiplier explanation.

You may visually refine them to match the improved package cards.

Do not change the approved copy/logic without explicit reason.

## 10. Acceptance criteria

1. H-012 public package copy/logic is preserved.
2. Each package has an independent CMS-editable visual asset slot.
3. Each package supports structured icon items.
4. Homepage package cards are materially cleaner and more visual than H-012.
5. /priser/ full cards can be scanned quickly despite full detail.
6. Current weak inline curves are not the final primary visual when supplied package assets exist.
7. Primary CTA on every package is direct ordering, not free check.
8. Selected package reaches a single order form preselected correctly.
9. Free check remains available as the uncertainty path.
10. Partner “fra 14 900” and confirmation-before-start logic remain clear.
11. No invented contract/payment terms.
12. Order submission remains safely non-production unless separately enabled.
13. Shared package source remains authoritative across home, /priser/, Synlighet and Konvertering.
14. 1440 / 390 / 320 QA passes.
15. Other accepted pages remain protected.

## Evidence

Capture:
- homepage package section 1440 + 390
- /priser/ full package cards 1440 + 390
- each package visual area at desktop
- icon/focus area treatment
- direct-order CTA state
- order section with each of the three package selections
- mobile order form

Run:
- existing full verify/browser suite
- package single-source regression
- direct-order preselection regression for all 3 packages
- no-live-submit safety test
- missing-visual fallback test
- CMS schema test for visual + icon fields

Stop for OWNER + STRATEGY_CONTENT review and ChatGPT-supplied final visual assets.
