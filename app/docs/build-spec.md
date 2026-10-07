# Optimalisering Oslo website specification

Date: 2026-10-08. Delivery: local, reviewable website. Profile: STANDARD, greenfield, MEDON_OWNED.

## Authority and boundaries

The latest user request authorizes an actual website under `app/`. `system/medon-web-system-v3.3/` and `project/optimalisering-oslo-v3.3-pilot-seed/` are read-only inputs. No older project history is operating authority. The existing repository is AnelPasic/optimalisering.oslo.noV3.3, branch main; this supersedes the seed's proposed repository name.

## Intended outcome

Norwegian business owners understand the two acquisition constraints, find the appropriate service, and request a bounded free manual assessment. Medon AS is visibly the provider. A useful service hub and explanatory arithmetic remain visible. The site must render real semantic content, navigation, and forms rather than a design-only mockup.

## Architecture

Astro static output, TypeScript, JSON content collections, Git as content authority, Pages CMS schema at the repository root (the location required by Pages CMS). Application source, assets, tests, configuration and notes live under `app/`. Use local fonts and minimal client-side scripts. No React/Nuxt/Sanity, no analytics cookies or visitor identifiers. The owner's subsequent instruction authorizes an interim reusable Node API, local server SQLite storage for leads/conversions/source, and Resend notifications until a better shared system is ready.

## Content ownership and publication

The separate STRATEGY_CONTENT role creates complete source-bound drafts from the supplied brief and portfolio. Implementation renders them without rewriting their commercial meaning. All pages start REVIEW_REQUIRED. No client names, testimonials, results, historical price candidates, discount claims, turnaround promises, physical Oslo office, or invented contractual terms.

The review preview is explicitly noindex. Production mode must refuse to build while content approval, privacy confirmation and real lead integration remain incomplete. The preview is a real website for review, not approval to publish draft content.

## Visual direction

Use the supplied Nordic design priors: comfortable rather than empty whitespace; warm cream canvas; forest-green calls to action; apricot and sage section accents; rounded corners used selectively. Instrument Sans headlines and Figtree body. A two-path traffic/conversion graphic is instructional, not simulated performance proof. No AI gradients, generic icon grids, fabricated dashboard, or unapproved client-logo wall. Build and inspect the complete homepage first.

## Page roles

Render only BUILD_NOW roles from PAGE-PORTFOLIO.csv, with distinct service, assessment, pricing decision, identity, utility, and guide templates. No city grids, acronym clones, combination duplicate, speculative case studies, or other BUILD_LATER routes. Preserve trailing slash URLs and meaningful internal links. Prices and scope remain by agreement pending commercial decisions. Privacy/terms pages are review material pending exact operating details.

## Functional path

Assessment form: website, business email, optional business model and message. Native and client validation, accessible field/status errors, duplicate-submit prevention, timeout, reliable failure recovery, no automatic score. A reusable browser adapter sends to the configured same-origin API or HTTPS shared endpoint. Never show success without explicit durable backend acknowledgement. If not configured, show a clear preview-only notice; do not collect or transmit real leads. No browser PII persistence or request-body logging. Local server SQLite persists the enquiry, one primary form-submission conversion, submission source tags and notification state. Resend failures retain the enquiry and a retryable notification. Synthetic request tests use an injected transport, not a live recipient.

## Verification

Node tests cover normalization, payload minimization, acknowledgement/failure/timeout handling and illustrative arithmetic. Astro check and production-format preview build must pass. Static audit verifies expected routes, titles, canonical metadata, one H1, links, crawlable text and deliberate preview indexing. Browser review covers 1440px desktop, 390px and 320px mobile, menu, links, calculator, form validation, error recovery and keyboard use. Independent RED_TEAM review remains separate from implementation. Hash comparison proves all system/project input files remain unchanged.

## Launch dependencies

Complete-content and representative-page owner review; final scope/prices/terms; shared lead endpoint and server-side validation/spam/retention controls; approved privacy details; real notification/inbox test; production first-party measurement and Search Console; Cloudflare account/native Git/DNS/redirect ownership and explicit launch authorization. These block launch, not the local build.
