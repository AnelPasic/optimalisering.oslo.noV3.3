# H-011 service landing-page rules

Date: 2026-10-09
Authority: OWNER + STRATEGY_CONTENT

## Core rule

Every commercial service page is a **landing page**, not an informational article.

Its job is to help a relevant business buyer:
1. recognize the problem/outcome;
2. understand what the service changes;
3. picture the desired outcome;
4. understand whether the service fits;
5. see the commercial path/package;
6. take the next step.

SEO/AIO authority must be built into the information architecture and content, but never at the expense of the landing-page job.

## Hero contract

Every commercial service page must support:
- quiet breadcrumb;
- one eyebrow;
- one semantic H1;
- one short support paragraph;
- primary CTA;
- secondary commercial CTA where useful;
- one **dream-outcome visual**.

The visual is not decoration. It must help the buyer picture what improves.

Acceptable visual modes:
- authentic-looking customer/result photo where a human outcome is the strongest signal;
- simple editorial illustration where the outcome/mechanism is abstract or easier to explain visually.

Examples of the desired principle supplied by OWNER from Mementor:
- a person interacting with a simplified outcome/assistant scene;
- a person visibly progressing toward a target/result.

Do not copy Mementor branding, mascot, exact composition or artwork.

Avoid:
- generic stock-business photos;
- fake testimonials/client scenes;
- fake rankings;
- fake AI citations;
- fake analytics numbers;
- cluttered SaaS dashboards;
- abstract decoration with no communication job.

## Visual brief by current service

### Synlighet
Dream outcome:
> Relevant customers find the business before they have already chosen a supplier.

Best starting visual direction:
- editorial illustration;
- customer/search/discovery cue -> relevant business/page -> clear next step;
- outcome should feel like "found in time", not "number 1 on Google".

### Konvertering
Dream outcome:
> More of the relevant people already visiting continue to enquiry or purchase.

Best starting visual direction:
- authentic-ish human/business photo OR editorial illustration;
- clear sense of reduced friction / completed action / relieved business owner;
- no invented conversion uplift.

### SEO
Dream outcome:
> The right search leads to a useful page and then to a relevant customer action.

Prefer illustration over technical dashboard imagery.

### AI-synlighet
Dream outcome:
> The business and its offer are understood correctly when customers investigate using AI.

Prefer illustration. Never depict guaranteed recommendation/placement.

## Provider neutrality

Customer-facing brand is **Optimalisering Oslo**.

Medon must not be used as the service brand in hero copy, titles, normal service copy, nav labels or routine FAQs.

Required provider disclosure:
> Tjenesten drives av Medon AS.

One clear footer disclosure is enough for normal commercial pages.

Medon may still appear where legally/operationally necessary:
- privacy;
- contractual terms;
- company/contact details;
- invoices/agreements;
- explicit provider/legal context.

Architecture must not assume Medon is permanently the only delivery entity; the service may later be delivered by Wizard or a collaboration.

## Homepage qualification

Homepage must explicitly explain that this is for businesses where optimization can actually move an outcome.

Locked principle:
- good fit: real customer competition, capacity for more business, meaningful economic value per enquiry/order;
- poor fit: little/no meaningful competition or no actual visibility/conversion bottleneck.

Concrete examples are useful because they make the boundary understandable.

## Language architecture

Target languages:
- Norwegian Bokmål: default/root URLs
- English: /en/ equivalents

Do not translate unstable draft copy yet.

Implement only the minimum i18n-ready architecture now:
- locale config and URL strategy;
- translation relationship/alternate-page contract;
- header language-switch slot/component;
- CMS/content model readiness where low-risk.

Do **not** show a dead EN switch before an English equivalent exists.

When English content is introduced, the top navigation must expose a simple language switch that takes the user to the equivalent page where possible, falling back to the English homepage only when an explicit equivalent does not exist.

Do not duplicate Norwegian content automatically through machine translation and call it final content.
