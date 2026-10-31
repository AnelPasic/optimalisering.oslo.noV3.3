# Optimalisering Oslo - adjustable editorial voice

2026-10-21. **OWNER-selected direction from the earlier Medon Blueprint pilot:** NORSK KLARHET + TØRR OBSERVASJONSHUMOR + KOMMERSIELL LOGIKK + ABSURD KONKRETISERING + LITT FREKKHET + SELF-AWARE HONESTY.

**Scope:** content for Optimalisering Oslo only. This is a brand-specific authoring profile and companion to its native Pages CMS tone editor, **not** a rewrite instruction for existing pages, not a global rule for other customers, and not permission to change offers, proof, prices or approved layouts. Project punctuation/house style in `coordination/COPY-STYLE.md` is binding. Medon-wide gate: `AnelPasic/MedonWebSystem/docs/CONTENT-QUALITY-AND-VOICE.md`.

## Pages CMS controls - source of current selections

**Pages CMS → Språk og tone** edits `coordination/CONTENT-TONE.json` directly. This structured JSON is the **single source of truth for currently selected intensity presets**; this document explains what those selections mean.

- `defaultPreset`: `noktern`, `medon`, `spiss`, `spissplus` or `spisspluskomisk`. The current default remains `medon` (OWNER's saved setting).
- `heroPreset`, `servicePreset`, `explanationPreset`, `faqPreset`: `inherit` means use default; otherwise select the named preset. Existing OWNER-approved selection is `spissplus` for explanations and FAQ. **Unmerged editorial test PR #70** proposes `spisspluskomisk` for explanations only; FAQ stays Spiss+, Hero remains Spiss and service inherits Medon. Do not call the draft selection an accepted production preference.
- `editorNotes`: additional directions for the next editorial pass; never override factual/SEO/KRO quality rules.
- Pricing, order forms, proof and legal copy **remain factual and nøkterne**, regardless of a broad `spiss` preference.

**Operational process for ChatGPT/Codex:** before writing, read *fresh* `coordination/CONTENT-TONE.json` alongside this file, resolve effective preset for the target section, and perform the MWS-031 Content Quality Gate. Show the OWNER an example/diff or make the specifically authorized content edit. The setting alone never edits existing content, starts AI generation, alters route rendering or deploys a website. An authenticated CMS save and real preview require their own verification.

## Fixed priorities (must always pass)

1. Norsk klarhet / ELI10 - a plumber, electrician or shop owner should understand a paragraph on first reading. State service category/outcome before playing with wording.
2. Commercial logic - say what the buyer gains or avoids: qualified enquiries, relevant searches, calls, time wasted, order friction, revenue where supportable.
3. Self-aware honesty - admit uncomfortable limitations, uncertainty and costs. Never use humor to disguise an inaccurate or unproven claim.

## Adjustable flavor (0 none; 1 light; 2 noticeable; 3 sharp)

| Dimension | Suggested default | Owner-adjustable range | Guardrail |
| --- | --- | --- | --- |
| Dry observational humor | 1 | 0-3 | Observations from real buyer/business situations, not jokes for their own sake |
| Absurd concretization | 1 | 0-3 | A surprising but intelligible real-world contrast, not fantasy claims |
| Slight cheekiness | 1 | 0-3 | Tease inefficient systems/metrics/agency nonsense, never insult the buyer |
| Self-aware candor | 2 | 1-3 | Factual honesty always required; intensity changes emphasis, not truth |

**These numbers are starting suggestions, NOT individually OWNER-approved strengths.** The six-part *direction* is OWNER-selected. Clarity and commercial logic are not sliders down to zero. If tone conflicts with correct communication, clarity wins.

### Quick editorial presets

- **Nøktern:** humor 0, absurd 0, cheekiness 0, candor 1. For pricing, forms, factual details, legal, warnings.
- **Medon:** humor 1, absurd 1, cheekiness 1, candor 2. Suggested default for general commercial/service copy.
- **Spiss (nivå 3):** humor 2, absurd 2, cheekiness 2, candor 2. A dry, clear commercial observation that sharpens an answer.
- **Spiss+ (nivå 4, OWNER-selected for FAQ/explanations 2026-10-22):** humor 2, absurd 3, cheekiness 2, candor 3. Stronger contrast with a recognizable and useful analogy, specific business consequences and restrained sting. **Not** extra jokes, longer text or a guaranteed dramatic last line.
- **Spiss+ komisk (nivå 5, draft calibration only):** an intentionally funny, recognizable twist after the relevant answer. Use wordplay, dry surprise or gentle absurdity to make the practical point stick. It should give a reader an actual reason to smile. Never hide facts, manufacture a claim or insert a gag into every paragraph.

Apply a preset per **section/brief**, not by adding CMS runtime classes. OWNER may request "gjør den spissere" or "nøkternt" and the content agent must then rewrite only the requested text, with a before/after diff. No global automatic rewriting. A native Pages CMS profile editor is now configured. Its choices are stored in `coordination/CONTENT-TONE.json`; this Markdown file remains the interpretive guide, not a second editable preset authority.

## Apply by content role

- Hero/H1/subline: **Medon**, with unambiguous category/outcome first; minimal humor.
- Three SEO / lokal SEO / AI visibility choice cards: **Medon leaning nøktern** - distinguish Google organic results, Google Maps/local intent, and AI answers using recognizable real customer situations. Do not promise ranking or ChatGPT recommendation.
- Glossary, CPC/ROAS/attribution and educational explanations: established live preset is **Spiss+**. Draft PR #70 evaluates **Spiss+ komisk** in one local-SEO explanation; it is not a site-wide rewriting mandate. Use deliberate humor only where it improves understanding.
- Packages/pricing and contact/order forms: **Nøktern**; scope/next action, conditions, no winks that hide costs.
- Proof/testimonials: **Nøktern** and source-accurate.
- FAQ: current saved preset is **Spiss+**, with plain answer first, then optionally one sharp observation/analogy that genuinely illuminates the buyer's decision; never a punchline instead of an answer.
- Legal/accessibility/errors: no humor.

## OWNER-approved Spiss+ calibration (nivå 4, 2026-10-22)

FAQ question: **Hva hvis både synlighet og konvertering begrenser resultatet?**

> Da finner vi ut om kundene ikke finner deg, eller om de finner deg og gir opp. Å skaffe mer trafikk til en nettside uten en tydelig vei til kontakt, er som å annonsere for en butikk som har gjemt inngangen. Flere interesserte. Samme problem.

This **tone reference** was explicitly preferred by OWNER over the preceding `Spiss` example. It is **not** approval to replace or publish the existing global FAQ answer, and it must not be repeated as a template on every card or page.

Why it works: starts with a concrete diagnostic fork, uses a real-world analogy for wasted traffic, then lands the commercial cost in a dry final observation. The factual answer remains understandable without the analogy. For highly sensitive, exact, legal or proof-heavy topics, tone is subdued regardless of the selected preset.

The labels `nivå 4` and `nivå 5` refer to **overall editorial presets**, not extra points on the independent 0-3 dimension scales above.

## Historical style calibration - illustrations, not proof of site results

Previous direction used:
- ROAS: "4,30 kr i registrert omsetning per annonsekrone" does not mean profit. "Varekostnad, lønn, frakt, returer og resten av virkeligheten vil også ha sitt."
- CPC: "CPC bryr seg ikke om klikket endte i et kjøp av en gravemaskin eller i at noen lukket fanen etter tre sekunder."
- Attribution: "Rapporten vil likevel gjerne kåre én vinner."
- Checkout: "de siste meterne før pengene skifter eier" - an oddly popular place to introduce unnecessary friction.

These are *educational voice samples*, not automatically suitable headlines, verified client facts or phrases to repeat everywhere.

## Short self-review before every direct edit

1. Would a non-marketer understand what the service does and why it matters?
2. Is there a concrete business consequence (not "vi gjør det tydelig")?
3. Does the humor actually help understanding, and is it sparse enough to remain surprising?
4. Can any phrase imply guaranteed rankings, AI mentions, ROI or sales? If so, qualify/rewrite.
5. Does it match this section's preset and the surrounding page voice?
6. Did only the explicitly requested CMS fields change? Is latest OWNER copy preserved? Was source verified separately from Worker preview?

**Release status:** Pages CMS now has a configured `Språk og tone` editor including the OWNER-selected Spiss+ option. The Git-backed config and focused test are present; authenticated CMS Save, build, and deployed Worker verification must still be observed before end-to-end PASS. These choices govern future authoring; they do not themselves change published copy, design or release permissions.
