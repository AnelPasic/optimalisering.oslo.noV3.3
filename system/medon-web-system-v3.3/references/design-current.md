# DESIGN.md — openaiads.no

## 1. Purpose

This file defines the visual and conversion design system for `openaiads.no`.

The goal is **not** to reproduce the inspiration screens literally.

The site should borrow the strongest visual principles:

- floating rounded navigation
- premium editorial typography
- large, confident headlines
- restrained monochrome foundation
- soft pastel utility panels
- occasional high-contrast dark sections
- modular card layouts
- generous whitespace
- minimal UI chrome
- strong visual hierarchy
- calm, modern B2B technology feel

But every design decision must serve one of four commercial jobs:

1. Explain what ChatGPT/OpenAI advertising is.
2. Make the opportunity feel relevant and timely.
3. Build trust without fabricated proof.
4. Move qualified Norwegian businesses toward a lead or assessment request.

If a visual element does not improve clarity, trust, comprehension, or conversion, remove it.

---

# 2. Brand Position

`openaiads.no` is an independent specialist website focused on advertising opportunities around ChatGPT/OpenAI advertising products.

It must **never** appear to be:

- owned by OpenAI
- an official OpenAI property
- an official ChatGPT advertising portal
- endorsed or certified by OpenAI unless such status actually exists
- visually dependent on OpenAI branding

The site should look like a sharp Norwegian specialist consultancy that understands the category early.

The desired impression is:

> "These people understand this new channel before most Norwegian agencies do."

Not:

> "This is pretending to be OpenAI."

---

# 3. Core Design Personality

Use these attributes as the design filter.

## 3.1 Desired

- premium
- minimal
- confident
- analytical
- specialist
- early-market
- commercially sharp
- trustworthy
- calm
- technical without looking developer-only
- Scandinavian without becoming sterile

## 3.2 Avoid

- generic SaaS template look
- neon "AI" gradients
- purple-blue cyberpunk clichés
- robots
- floating brains
- fake holograms
- glowing ChatGPT-style symbols
- excessive glassmorphism
- dashboard screenshots that communicate nothing
- huge decorative animations
- stock-photo business meetings
- fake client logos
- fake testimonials
- fake usage statistics
- giant walls of text
- vague "future of AI" copy

---

# 4. Conversion Principle

The site is a lead-generation site first and a design portfolio second.

Use this rule:

> One section = one question answered or one objection removed.

The primary conversion target is:

**Få en vurdering av ChatGPT Ads for din bedrift**

Alternative short CTA labels:

- Få en vurdering
- Sjekk muligheten
- Vurder ChatGPT Ads
- Be om en vurdering
- Se om dette passer

Do not rotate through ten unrelated CTAs.

The same primary action should repeat naturally throughout the page.

A secondary low-friction CTA may be:

**Se hvordan ChatGPT Ads fungerer**

or:

**Les guiden**

Use secondary CTAs mainly for visitors who are not ready to contact us.

---

# 5. Page Width and Grid

The visual references use a centered, controlled content width rather than edge-to-edge layouts.

Use:

```css
--page-max: 1180px;
--content-max: 760px;
--text-max: 680px;
```

Desktop container:

```css
width: min(calc(100% - 48px), 1180px);
margin-inline: auto;
```

Mobile:

```css
width: min(calc(100% - 32px), 1180px);
```

Use a 12-column desktop grid where useful.

Recommended desktop splits:

- Hero: 6 / 6
- Problem/answer sections: 5 / 7
- Feature cards: 4 / 4 / 4
- Two-card blocks: 6 / 6
- CTA sections: 7 / 5
- Article layouts: 8 / 4 or centered 760px content

Avoid cramming text into full-width sections.

---

# 6. Spacing System

Whitespace is part of the visual identity.

Use an 8px base system.

```text
4
8
12
16
24
32
40
48
64
80
96
120
144
```

Desktop section spacing:

```text
Standard: 96px–120px vertical
Large hero/feature: 120px–160px
Compact utility section: 64px–80px
```

Mobile:

```text
Standard: 64px–80px
Large: 80px–96px
Compact: 48px–64px
```

Do not solve visual hierarchy by adding random margins.

---

# 7. Color System

The foundation should be neutral.

## 7.1 Core colors

```css
--ink: #101522;
--ink-soft: #263044;
--text-muted: #657188;

--paper: #ffffff;
--surface: #f6f8fa;
--surface-alt: #f0f3f6;
--border: #dfe5eb;

--dark: #0d0e10;
--dark-soft: #17191d;
```

## 7.2 Soft accent surfaces

Use pastel accents as **section backgrounds**, not primary brand colors.

```css
--mint: #e3f8f2;
--lilac: #f0eafd;
--peach: #fff0e3;
--yellow: #f5f6d8;
--blue-soft: #e9f2fb;
```

These should feel subtle.

Avoid saturated startup gradients.

## 7.3 Accent usage

Accent surfaces can classify information:

- mint = opportunity / growth
- lilac = AI/search ecosystem
- peach = implementation / activation
- yellow = comparison / insight
- dark = decision / conversion / authority

Do not rely on color alone for meaning.

---

# 8. Background Treatment

The main site background should mostly be:

```text
white / very light cool gray
```

The hero may use an extremely subtle multi-tone atmospheric background.

Example:

```css
background:
  radial-gradient(circle at 15% 10%, rgba(255,225,215,.55), transparent 34%),
  radial-gradient(circle at 90% 15%, rgba(225,220,255,.55), transparent 35%),
  radial-gradient(circle at 50% 95%, rgba(215,247,240,.45), transparent 38%),
  #f8fafb;
```

This effect must remain understated.

The page should still look premium if all gradients are removed.

---

# 9. Typography

Typography should carry much of the design.

Preferred:

- Geist
- Inter
- Manrope

Use one family only unless there is a strong reason otherwise.

Self-host where practical.

## 9.1 Headings

Desktop hero:

```text
56–72px
line-height 0.98–1.08
font-weight 650–750
letter-spacing -0.035em
```

H2:

```text
38–52px
line-height 1.05–1.12
font-weight 650–750
letter-spacing -0.025em
```

H3:

```text
24–32px
line-height 1.15
font-weight 650–700
```

Body:

```text
17–19px
line-height 1.55–1.7
```

Utility text:

```text
14–16px
```

Mobile hero:

```text
42–52px
```

Avoid ultra-thin font weights.

Avoid all-caps headings except tiny labels.

---

# 10. Header / Navigation

Use a floating pill-style header inspired by the supplied reference.

Desktop:

```text
max-width: 1180px
height: 64–72px
border-radius: 999px
background: rgba(255,255,255,.88)
backdrop-filter: blur(...)
subtle border
subtle shadow
```

Suggested structure:

```text
[openaiads.no]

ChatGPT Ads
Tjenester
Guider
Om

                         [Få en vurdering]
```

Do not overload navigation.

Maximum:

- 4–5 main links
- 1 primary CTA

The CTA button should always be visible on desktop.

## Sticky behavior

Header may become sticky after initial scroll.

Avoid an intrusive header that occupies too much vertical space.

On mobile:

- compact logo
- CTA if space permits
- menu button
- no giant full-screen animation

---

# 11. Buttons

Primary button:

```text
dark background
white text
rounded/full pill
height 48–54px
horizontal padding 22–30px
font-weight 650
```

Secondary:

```text
transparent or white
dark text
1px border
```

Text link:

```text
label + small arrow
```

Use arrows sparingly.

Buttons should describe an action.

Good:

- Få en vurdering
- Se hvordan det fungerer
- Sammenlign kanalene

Weak:

- Les mer
- Klikk her
- Kom i gang

---

# 12. Hero Section

The hero has one job:

> Make a relevant Norwegian decision-maker understand what the site does within five seconds.

Use a two-column layout.

## 12.1 Left column

Recommended structure:

### Eyebrow

Example:

`CHATGPT ADS I NORGE`

or:

`NY ANNONSEKANAL · TIDLIG FASE`

### H1

Use a clear commercial headline.

Possible direction:

> ChatGPT Ads kommer til Norge. Vær klar før konkurrentene.

Alternative:

> Annonsering i ChatGPT åpner en ny kanal for norske bedrifter.

Do not make unsupported promises such as:

> Dominer ChatGPT Ads.

unless there is evidence behind it.

### Supporting copy

2–3 short lines.

Explain:

- what we help with
- who it is for
- why acting early matters

### CTA row

Primary:

`Få en vurdering`

Secondary:

`Se hvordan ChatGPT Ads fungerer →`

### Micro-trust line

Use honest friction reduction.

Example:

`Kort vurdering · Ingen binding · For norske bedrifter`

Only state things that are true.

---

# 13. Hero Visual

Do not use a random AI illustration.

Create a custom visual representing the advertising ecosystem.

Good options:

### Option A — Search/Conversation mockup

A neutral, clearly fictional interface showing:

```text
customer question
↓
organic answers
↓
clearly marked sponsored result
↓
business offer
```

It should communicate the mechanism without copying ChatGPT UI.

### Option B — Channel map

```text
Google
Meta
ChatGPT
↓
Landing page
↓
Lead
```

### Option C — Opportunity card

Show:

```text
Ny kanal
↓
Tidlig konkurranse
↓
Mindre historisk data
↓
Behov for testing
```

Make the graphic useful enough that a visitor could understand something even without reading the paragraph beside it.

---

# 14. Hero Height

Do not make the hero absurdly tall.

Desktop:

```text
minimum around 720px including header
```

The user should see:

- H1
- explanation
- CTA
- part of the next section

without scrolling excessively.

Avoid the common agency mistake of using 100vh purely for drama.

---

# 15. Immediate Trust / Context Strip

Directly after the hero, add a short proof/context strip.

Because the project may initially lack customer cases, use **verifiable context**, not invented social proof.

Example cards:

```text
Ny kanal
ChatGPT advertising is entering new markets.

Norge
The site is built specifically for Norwegian advertisers.

Testing først
Early campaigns require structured experimentation.
```

Once real proof exists, this can become:

- number of campaigns managed
- spend managed
- relevant cases
- actual client outcomes

Do not invent these before they exist.

---

# 16. "Why Now" Section

This is one of the most important conversion sections.

Use a clean split layout:

```text
LEFT:
large statement

RIGHT:
3–4 factual decision points
```

Possible heading:

> Det interessante er ikke at ChatGPT får annonser. Det interessante er å lære kanalen før markedet blir fullt.

Then explain:

1. new inventory
2. new buyer behavior
3. limited historical benchmarks
4. early learning advantage

The section should create urgency without fake scarcity.

---

# 17. Bento / Service Grid

Use the pastel modular visual language from the reference.

One large card + two smaller cards works well.

Example:

```text
┌───────────────────────────────┐
│ ChatGPT Ads strategi          │
│                               │
│ Hva bør dere teste først?     │
│ Hvor passer kanalen inn?      │
│ Hvordan måler vi lønnsomhet?  │
└───────────────────────────────┘

┌───────────────┐ ┌───────────────┐
│ Implementering│ │ Måling        │
│ og kampanjer  │ │ og optimal.   │
└───────────────┘ └───────────────┘
```

Use different soft backgrounds.

Each card needs:

- outcome-focused title
- 1–2 sentence explanation
- optional small visual
- clear destination/action

Do not fill these cards with generic marketing language.

---

# 18. Offer Section

The site needs an obvious first commercial offer.

Recommended initial offer:

## ChatGPT Ads-vurdering

This should be visually prominent.

Explain what the visitor gets.

Example:

```text
Vi ser på:

✓ om ChatGPT Ads passer deres marked
✓ hvilke produkter/tjenester som er mest aktuelle
✓ hvordan det bør spille sammen med Google og Meta
✓ hvilke land/målgrupper som bør testes
✓ hvilken måling som bør være på plass
```

Primary CTA:

`Be om vurdering`

Optional damaging admission:

> ChatGPT Ads vil ikke være riktig for alle bedrifter. Det er nettopp derfor vi starter med en vurdering.

That is considerably more credible than pretending every company needs the channel.

---

# 19. Dark Authority Section

Use one high-contrast black/dark section similar to the inspiration.

This section should feel important.

Do not use dark sections everywhere.

Recommended purpose:

**Positioning / strategic statement**

Example:

> Ikke flytt budsjett fra Google eller Meta bare fordi ChatGPT Ads er nytt.

Then:

> Vi vurderer kanalen ut fra kundereise, marginer, målgruppe og måling. Hvis den ikke fortjener budsjett, skal den heller ikke få det.

This is a strong trust-building moment.

CTA:

`Få en kanalvurdering`

The visual may include a simplified channel allocation diagram.

---

# 20. Comparison Section

Visitors will naturally ask how this compares with existing channels.

Use a practical comparison:

| | ChatGPT Ads | Google Ads | Meta Ads |
|---|---|---|---|
| Intent | ... | ... | ... |
| Discovery | ... | ... | ... |
| Historical data | ... | ... | ... |
| Creative dependency | ... | ... | ... |
| Best use case | ... | ... | ... |

Make this easy to scan.

Do not turn the table into false certainty.

Use phrases such as:

- likely
- currently
- depends on format
- needs testing

where uncertainty is real.

This section is both SEO/AIO content and conversion content.

---

# 21. Process Section

A new advertising channel feels risky.

Reduce perceived complexity.

Use 3 or 4 steps.

Example:

```text
01
Vurdering
Vi avgjør om kanalen faktisk fortjener å bli testet.

02
Oppsett
Måling, struktur, land, budskap og destinasjoner.

03
Test
Små kontrollerte eksperimenter før vi skalerer.

04
Optimalisering
Vi sammenligner resultatene mot alternative kanaler.
```

Keep steps specific.

Avoid agency filler such as:

> Analyse → Strategi → Resultater

That says nothing.

---

# 22. Proof Section

Never fabricate testimonials.

Until real OpenAI/ChatGPT Ads cases exist, proof can come from:

- Medon's actual years of experience
- real Google Ads experience
- real Meta Ads experience
- real SEO/AIO experience
- named methodology
- actual screenshots where permissible
- public data and cited sources
- transparent process
- founder/team identity

Possible heading:

> Ny kanal. Ikke ny disiplin.

Then explain that the advertising surface may be new, while the fundamentals remain:

- offer
- intent
- targeting
- landing page
- measurement
- CAC
- iteration

When real cases become available, replace abstract proof with numbers and concrete results.

---

# 23. Content / Guides Section

Do not hide SEO content in a generic blog grid.

Use a section such as:

> Lær ChatGPT Ads før du bruker penger på det.

Feature 3–4 high-intent guides.

Example cards:

```text
Hva er ChatGPT Ads?
Guide

ChatGPT Ads vs Google Ads
Sammenligning

Hva koster ChatGPT Ads?
Prisguide

ChatGPT Ads i Norge
Status
```

Use editorial cards rather than visual-heavy blog tiles.

Each card should show:

- category
- title
- 1 short summary
- updated date where relevant

This supports freshness and AIO trust.

---

# 24. FAQ

FAQ is a conversion section, not filler.

Answer objections such as:

- Kan norske bedrifter annonsere i ChatGPT nå?
- Hva vil ChatGPT Ads koste?
- Er dette en erstatning for Google Ads?
- Hvilke bedrifter bør teste kanalen først?
- Hvordan måles resultatene?
- Må vi bruke et byrå?
- Hvor mye budsjett bør vi starte med?
- Hva skjer hvis kanalen ikke passer oss?

Answers should be direct.

Usually 50–100 words.

Do not write five paragraphs when two sentences answer the question.

---

# 25. Final CTA

Use a large dark or soft-colored conversion panel.

Recommended structure:

### Headline

> Finn ut om ChatGPT Ads faktisk er verdt å teste.

### Copy

> Send oss nettstedet og litt informasjon om dagens markedsføring. Vi vurderer hvor kanalen kan passe inn og hva vi ville testet først.

### CTA

`Få en vurdering`

### Friction reducer

Use only true claims, for example:

`Uforpliktende første vurdering`

No fake timers.

No fake "3 plasser igjen".

---

# 26. Footer

Keep footer clean.

Suggested:

```text
openaiads.no

Tjenester
- ChatGPT Ads
- Rådgivning
- Måling og optimalisering

Ressurser
- Guider
- Sammenligninger
- Nyheter

Selskap
- Om
- Kontakt

Juridisk
- Personvern
- Cookies
```

Also include a clear independent-site disclaimer if appropriate:

> openaiads.no er en uavhengig tjeneste og er ikke tilknyttet eller godkjent av OpenAI.

Use wording consistent with actual legal/brand requirements.

---

# 27. Homepage Conversion Order

Default homepage order:

```text
1. Floating navigation
2. Hero
3. Context / trust strip
4. Why now?
5. Service / opportunity bento grid
6. ChatGPT Ads assessment offer
7. Dark strategic authority section
8. ChatGPT Ads vs Google / Meta
9. Process
10. Proof / methodology
11. Guides
12. FAQ
13. Final CTA
14. Footer
```

Do not reorder sections purely for visual variety.

This order follows buyer psychology:

```text
What is this?
↓
Why should I care?
↓
What can you do?
↓
What do I get?
↓
Can I trust your judgment?
↓
How does this compare?
↓
What happens next?
↓
Why should I trust you?
↓
Let me investigate
↓
Answer my objections
↓
Ask me to act
```

---

# 28. Landing Page Layout

Commercial landing pages should be tighter than the homepage.

Recommended:

```text
Hero
↓
Direct answer
↓
Who this is for / not for
↓
What the service includes
↓
Why now / business impact
↓
Proof / methodology
↓
Process
↓
FAQ
↓
CTA
```

Do not include every homepage section on every service page.

---

# 29. Article / SEO Page Layout

Content pages must remain visually related to the main site.

Recommended:

```text
Breadcrumb
Category + updated date
H1
Direct answer / summary
Main content
Decision table / comparison / answer blocks
Relevant CTA
FAQ if useful
Related guides
Author/reviewer
Sources where applicable
```

Use a reading width of roughly 680–760px.

Do not make articles look like generic CMS output.

---

# 30. Direct Answer Blocks

For AIO-oriented answers, use a visually distinct but subtle component.

Example:

```text
┌───────────────────────────────────────┐
│ Kort svar                            │
│                                       │
│ ChatGPT Ads ...                       │
│                                       │
│ Praktisk regel: ...                   │
└───────────────────────────────────────┘
```

Style:

- soft surface
- small label
- strong first paragraph
- no giant icons
- no decorative gradients

These blocks should be easy for both humans and AI systems to parse.

---

# 31. Cards

Card radius:

```text
20–28px
```

Hero-level panels:

```text
28–40px
```

Use:

```text
1px subtle border
very restrained shadow
```

Do not make every paragraph a card.

Cards should group information that belongs together.

---

# 32. Borders and Shadows

Borders:

```css
border: 1px solid rgba(16, 21, 34, 0.08);
```

Typical shadow:

```css
box-shadow:
  0 18px 50px rgba(16, 21, 34, 0.06);
```

Navigation shadow may be slightly stronger.

Do not use heavy floating-card shadows everywhere.

---

# 33. Iconography

Use a simple line icon set.

Good options:

- Lucide
- custom minimal SVG icons

Avoid:

- emoji as UI icons
- 3D icons
- multicolor icon packs
- giant decorative symbols

Icons should support comprehension.

They should not carry the design.

---

# 34. Custom Graphics

Where possible, create simple diagrams using HTML/CSS/SVG rather than image assets.

Useful graphics:

- ad placement anatomy
- channel comparison
- customer journey
- test → learn → scale loop
- budget allocation
- measurement funnel
- query → sponsored answer → landing page → lead

These become both design assets and educational content.

---

# 35. Motion

Motion should communicate state.

Allowed:

- small hover transitions
- card lift of 1–2px
- opacity transitions
- subtle arrow movement
- restrained reveal transitions
- menu animation

Avoid:

- scroll-jacking
- parallax backgrounds
- endless floating shapes
- animated gradients
- cursor effects
- giant GSAP sequences
- auto-playing decorative videos

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 36. Sticky CTA

On mobile, test a small sticky conversion bar after the visitor has scrolled past the hero.

Example:

```text
[Få en vurdering]
```

Do not show it immediately on page load.

Do not obscure content.

Desktop does not need a permanent bottom bar if the sticky header already contains the CTA.

---

# 37. Forms

Forms must feel simple.

Avoid a 10-field wall on first contact.

Recommended first-step form:

```text
Nettside *
Navn *
E-post *
Bedrift
Månedlig annonsebudsjett
Hva vil dere finne ut?
```

Optional phone.

Use sensible conditional fields if implemented.

Submit CTA:

`Få vurderingen`

Below button:

`Vi bruker informasjonen kun for å vurdere henvendelsen.`

No account creation.

No password.

No unnecessary qualification theatre.

---

# 38. Form Conversion Pattern

Consider two-step forms.

Step 1:

```text
Hva er nettstedet deres?
[URL]

[Fortsätt]
```

Step 2:

```text
Name
Email
Company
Current channels
Approximate spend
```

This may lower perceived initial friction.

Measure it rather than assuming it wins.

---

# 39. CRO Measurement

Every major CTA should support analytics.

Suggested events:

```text
hero_cta_click
nav_cta_click
assessment_cta_click
guide_click
comparison_interaction
faq_open
form_start
form_step_complete
form_submit
email_click
phone_click
```

Preserve one event naming convention.

Do not track meaningless micro-events just because they can be tracked.

---

# 40. Above-the-Fold CRO Requirements

At 1440px desktop, the first viewport should ideally contain:

- brand/navigation
- category context
- strong H1
- explanation
- primary CTA
- secondary CTA
- trust/friction reducer
- useful visual
- beginning of next section

At mobile:

- H1 should appear quickly
- CTA should not require scrolling through a huge illustration
- visual can follow the CTA

---

# 41. CTA Frequency

Primary CTA should normally appear:

1. header
2. hero
3. after offer/service explanation
4. after proof/process
5. final section

Do not place a button after every paragraph.

That looks desperate.

---

# 42. Conversion Copy Rules

Prefer:

> Vi vurderer om kanalen er verdt å teste.

over:

> Vi hjelper din bedrift å utnytte fremtidens AI-drevne annonsemuligheter.

Prefer:

> Start med et kontrollert testbudsjett.

over:

> Skaler virksomheten til nye høyder.

Prefer:

> ChatGPT Ads er ikke nødvendigvis riktig for alle.

over:

> Alle bedrifter må være på ChatGPT Ads.

Clarity beats hype.

---

# 43. Trust Placement

Trust signals belong close to decisions.

Near CTA:

- what happens after submission
- who reviews it
- no obligation if true

Near commercial claims:

- source
- proof
- methodology
- actual result

Near new-market claims:

- date
- current status
- official source

Do not isolate all trust information into one distant "About us" section.

---

# 44. Mobile Design

Mobile is not desktop stacked vertically without thought.

Rules:

- header height ~60px
- hero H1 42–52px
- body 17–18px
- 16px minimum horizontal content margin
- buttons at least 48px tall
- stack bento cards
- tables should become cards or horizontally scroll cleanly
- no text smaller than 14px for meaningful information
- secondary visuals should never push CTA below unnecessary content

---

# 45. Accessibility

Minimum requirements:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient color contrast
- descriptive form labels
- error messages linked to fields
- ARIA only where semantic HTML cannot solve the problem
- reduced motion support
- meaningful alt text
- decorative graphics hidden from assistive tech
- no color-only status communication

Target WCAG 2.2 AA where practical.

---

# 46. Performance

This visual system must remain extremely light.

Do not sacrifice speed for visual polish.

Rules:

- static Astro HTML
- minimal JS
- optimized SVG
- AVIF/WebP for raster assets
- no video background in hero
- no huge JS animation library
- lazy load below-fold imagery
- preload only truly critical assets
- self-host fonts
- limit font weights

Target:

```text
LCP < 1.8s
CLS < 0.05
INP < 150ms

Lighthouse Performance >= 95
Accessibility >= 95
SEO >= 98
Best Practices >= 95
```

---

# 47. Design Tokens

Create central tokens rather than one-off values.

Example:

```css
:root {
  --color-ink: #101522;
  --color-ink-soft: #263044;
  --color-muted: #657188;
  --color-paper: #ffffff;
  --color-surface: #f6f8fa;
  --color-border: #dfe5eb;
  --color-dark: #0d0e10;

  --color-mint: #e3f8f2;
  --color-lilac: #f0eafd;
  --color-peach: #fff0e3;
  --color-yellow: #f5f6d8;

  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 28px;
  --radius-xl: 38px;
  --radius-pill: 999px;

  --container: 1180px;
  --reading: 720px;
}
```

---

# 48. Component Library

Build reusable Astro components for at least:

```text
Header
Footer
Container
Section
Button
Badge
Hero
TrustStrip
BentoGrid
FeatureCard
DarkFeature
OfferPanel
ProcessSteps
ComparisonTable
DirectAnswer
FAQ
CTASection
ArticleCard
ArticleMeta
LeadForm
Breadcrumbs
```

Avoid over-componentizing trivial one-line markup.

---

# 49. Visual Quality Test

Before accepting a section, ask:

### Clarity
Can the visitor understand the point without reading every sentence?

### Hierarchy
Is the most important thing visibly dominant?

### Commercial value
Does the section help move the visitor toward a decision?

### Credibility
Does anything look exaggerated, fake, or generic?

### Distinctiveness
Could the same section be pasted onto 50 AI agency websites?

If yes, redesign or rewrite it.

---

# 50. CRO Quality Test

Every commercial page should answer:

```text
What is this?
Why should I care?
Is it relevant to my business?
Why now?
Why should I trust you?
What exactly do you do?
What will happen if I contact you?
What does it require from me?
What are the alternatives?
What are the risks?
What do I do next?
```

If one of these is obviously missing, fix the page before polishing decorative details.

---

# 51. Anti-Patterns

Do not implement:

```text
Hero:
"Unlock the Future of AI Advertising"

Subheadline:
"Revolutionize your business with cutting-edge AI-powered solutions."

CTA:
"Get Started"
```

That is generic AI sludge.

Also avoid:

```text
Trusted by 500+ companies
99% satisfaction
2M impressions
#1 AI Ads Agency
```

unless those claims are verifiable.

---

# 52. Preferred Homepage Feel

The finished homepage should visually move through this rhythm:

```text
SOFT / AIRY
Hero

WHITE
Context and explanation

PASTEL
Services and opportunities

WHITE
Offer

BLACK
Strong strategic viewpoint

WHITE
Comparison and process

SOFT
Guides / learning

WHITE
FAQ

BLACK OR PASTEL
Final CTA
```

This creates visual pacing without turning the site into a rainbow.

---

# 53. Inspiration Translation

From the supplied visual references, retain:

- rounded floating top navigation
- large bold type
- spacious centered layout
- strong dark/light contrast
- pastel feature blocks
- asymmetrical bento cards
- restrained UI visuals
- generous section separation
- minimal border system
- high-end fintech/SaaS cleanliness

Do **not** retain:

- financial product metaphors
- credit cards
- banking UI
- decorative elements unrelated to advertising
- exact layouts
- exact colors
- exact branding
- identical proportions

The references are a design-language source, not a template to clone.

---

# 54. Final Rule

The site should be attractive enough to signal competence, but it should never make the visitor work to understand the offer.

The priority order is:

```text
1. Message clarity
2. Conversion path
3. Trust
4. SEO/AIO content structure
5. Mobile usability
6. Performance
7. Visual polish
8. Animation
```

Never reverse that list.

A beautiful page with weak conversion logic is decoration.

A fast page with generic copy is fast decoration.

The goal is a site that makes the right visitor think:

> "I should talk to these people before I spend money testing this channel."
