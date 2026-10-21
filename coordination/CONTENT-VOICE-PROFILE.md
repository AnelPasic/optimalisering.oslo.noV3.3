# Optimalisering Oslo - adjustable editorial voice

2026-10-21. **OWNER-selected direction from the earlier Medon Blueprint pilot:** NORSK KLARHET + TØRR OBSERVASJONSHUMOR + KOMMERSIELL LOGIKK + ABSURD KONKRETISERING + LITT FREKKHET + SELF-AWARE HONESTY.

**Scope:** content for Optimalisering Oslo only. This is a brand-specific authoring profile, **not** a rewrite instruction for existing pages, not a new global policy for customer sites, not permission to change offers/proof/prices/approved layouts, and not a claim of new Pages CMS tone controls. Project punctuation/house style in `coordination/COPY-STYLE.md` is binding. Medon-wide gate: `AnelPasic/MedonWebSystem/docs/CONTENT-QUALITY-AND-VOICE.md`.

## Pages CMS controls - source of current selections

**Pages CMS → Språk og tone** edits `coordination/CONTENT-TONE.json` directly. This structured JSON is the **single source of truth for currently selected intensity presets**; this document explains what those selections mean.

- `defaultPreset`: `noktern`, `medon` or `spiss`. The current default is `medon`.
- `heroPreset`, `servicePreset`, `explanationPreset`, `faqPreset`: `inherit` means use default; otherwise select the named preset.
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
- **Spiss:** humor 2, absurd 2, cheekiness 2, candor 2. Occasional sharp hook or educational explanation, only if immediately clear.

Apply a preset per **section/brief**, not by adding CMS runtime classes. OWNER may request "gjør den spissere" or "nøkternt" and the content agent must then rewrite only the requested text, with a before/after diff. No global automatic rewriting. A native Pages CMS profile editor is now configured. Its choices are stored in `coordination/CONTENT-TONE.json`; this Markdown file remains the interpretive guide, not a second editable preset authority.

## Apply by content role

- Hero/H1/subline: **Medon**, with unambiguous category/outcome first; minimal humor.
- Three SEO / lokal SEO / AI visibility choice cards: **Medon leaning nøktern** - distinguish Google organic results, Google Maps/local intent, and AI answers using recognizable real customer situations. Do not promise ranking or ChatGPT recommendation.
- Glossary, CPC/ROAS/attribution and educational explanations: **Spiss** is acceptable when the example clarifies a technical concept.
- Packages/pricing and contact/order forms: **Nøktern**; scope/next action, conditions, no winks that hide costs.
- Proof/testimonials: **Nøktern** and source-accurate.
- FAQ: plain answer first, optionally one dry line when harmless; no punchline instead of an answer.
- Legal/accessibility/errors: no humor.

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

**Release status:** Pages CMS now has a configured `Språk og tone` editor. The Git-backed config and focused test are present; authenticated CMS Save, build, and deployed Worker verification must still be observed before end-to-end PASS. These choices govern future authoring; they do not themselves change published copy, design or release permissions.
