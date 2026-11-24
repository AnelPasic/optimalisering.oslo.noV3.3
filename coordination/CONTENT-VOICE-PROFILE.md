# Optimalisering Oslo - adjustable editorial voice

**OWNER-selected direction:** NORSK KLARHET + TØRR OBSERVASJONSHUMOR + KOMMERSIELL LOGIKK + ABSURD KONKRETISERING + LITT FREKKHET + SELF-AWARE HONESTY.

**OWNER 2026-11-24 - Rule 05:** This profile explains how the brand expresses itself. It is not a second editorial process, a source of currently selected presets, an automatic rewrite instruction or permission to alter approved material. Research, commercial strategy, SEO/AIO/CRO, whole-Hero quality, approval, evidence and QA are governed by the canonical [MWS Content Quality and Voice](https://github.com/AnelPasic/MedonWebSystem/blob/main/docs/CONTENT-QUALITY-AND-VOICE.md) and the active project AGENTS. House style is in `coordination/COPY-STYLE.md`. Approved examples and rejected creative calibration are in `coordination/CREATIVE-DNA.md`.

## Current tone - JSON only

Pages CMS / Språk og tone edits `coordination/CONTENT-TONE.json` directly. Read the actual current file before authoring; no active selection is recorded in this Markdown profile.

- `defaultPreset`: `noktern`, `medon`, `spiss`, `spissplus`, `spisspluskomisk`, `spisspluskomiskplus`, `spissplushysterisk`.
- `heroPreset`, `servicePreset`, `explanationPreset`, `faqPreset`: selected role preset; `inherit` resolves to `defaultPreset`.
- Optional page-level `hero.toneOverrides`: resolve `eyebrowPreset`, `titlePreset` and `supportPreset` individually. Missing/empty/`inherit` uses `heroPreset`, then `defaultPreset`. CTA uses the general site tone; no per-Hero CTA selector.
- `editorNotes`: additional preferences for expression within the editorial standard.

Changing a tone setting does not regenerate or publish existing content, change rendering or authorize changes beyond the requested scope.

## Expression

- Clear Norwegian appropriate to the buyer, concrete situations and commercially meaningful contrasts.
- Dry observation, absurd concretization and a little cheekiness may sharpen the message.
- Self-aware honesty: humor must not hide limits, costs or uncertainty. Tease an inefficient system or industry habit, never the buyer.
- Keep prices, proof, forms, legal, safety, health and transactional details nøktern, including inside mixed sections.

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
- **Spiss+ (nivå 4):** humor 2, absurd 3, cheekiness 2, candor 3. Stronger contrast with a recognizable and useful analogy, specific business consequences and restrained sting. **Not** extra jokes, longer text or a guaranteed dramatic last line.
- **Spiss+ komisk (nivå 5, available option):** an intentionally funny, recognizable twist after the relevant answer. Use wordplay, dry surprise or gentle absurdity to make the practical point stick. It should give a reader an actual reason to smile. Never hide facts, manufacture a claim or insert a gag into every paragraph.
- **Spiss+ komisk+ (nivå 6, optional editorial preset):** a bolder, genuinely funny surprise: one vivid but recognizable absurd business situation, followed by an earned punchline tied directly to the buyer's practical question. More originality and memorable imagery, not more jokes per paragraph. Make the explanation clear first; avoid mocking the buyer, unsupported claims, forced slang or comedy in pricing, proof, legal texts and forms.
- **Spiss+ Hysterisk (nivå 7, opt-in anywhere OWNER explicitly selects it):** genuine high comedy, not slightly cheeky marketing copy. Build a specific comic situation with **setup, escalation and an unexpected last-turn punchline** (or a character exchange/callback of equal strength). Explore different premise types privately; reject one-liner analogies and neat observations that merely provoke a smirk as level 4-6. The punchline should feel like an actual joke someone might retell, not a forced moral after a sensible paragraph. When this page saves Hysterisk for a Hero part, **use it**; do not silently downshift because examples were originally SoMe-first. Humor may lead in H1; follow the canonical complete-Hero rule. Never mock the buyer, real clients or vulnerable people. Use clearly fictional absurdity, never invented marketing results or rankings; no borrowed standup/Chuck Norris jokes. Factual pricing, proof, legal, forms, safety and health remain nøkterne. Subjective laughter requires OWNER/reader feedback, never 'CI green'.

Apply a preset per **section/brief**, not by adding CMS runtime classes. OWNER may request "gjør den spissere" or "nøkternt" and the content agent must then rewrite only the requested text, with a before/after diff. No global automatic rewriting. A native Pages CMS profile editor is now configured. Its choices are stored in `coordination/CONTENT-TONE.json`; this Markdown file remains the interpretive guide, not a second editable preset authority.

## Apply by role

- Hero: honor the actual selected Hero/per-field preset. A sharp or comic opening may lead; do not silently downgrade a selected level. Whole-Hero relevance and OWNER approval are governed by MWS and H1 Lab.
- Service copy: use the selected service preset, with the actual buyer's language.
- Explanations and articles: use the selected explanation preset; make examples and humor improve understanding or memorability.
- FAQ: use the selected FAQ preset; give the answer, then an observation or analogy where useful.
- Legal, accessibility, form errors, pricing and evidence: precise, factual and nøktern.

Read the relevant creative examples in `coordination/CREATIVE-DNA.md` for calibration, not as automatic publishing instructions. The selected tone determines expression, not the underlying research, claims or commercial proposition.
