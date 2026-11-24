# Customer-facing copy style

Date: 2026-10-09
Authority: OWNER

Write like a competent Norwegian business, not like a generated marketing template.

## Punctuation

Use ordinary keyboard punctuation in customer-facing copy.

Required:
- use `-` for dash punctuation;
- use `->` for textual arrows;
- use `x` instead of the multiplication symbol when it is explanatory text rather than formal mathematics;
- use normal straight quotation marks when quotation marks are needed;
- use `...` only when an ellipsis is genuinely needed, and avoid it in headings.

Avoid:
- en dash `–`;
- em dash `—`;
- Unicode text arrows such as `→`, `↗`, `↘`;
- decorative multiplication sign `×` in ordinary copy;
- smart quotation marks and ornamental punctuation where plain keyboard characters work just as well.

Actual SVG/icon arrows used as interface graphics are not text punctuation and may remain.

**OWNER 2026-11-24 - invisible formatting:** In ordinary Norwegian/English customer-facing prose, prohibit hidden/nonstandard line and paragraph separators (U+000B, U+000C, U+0085, U+2028, U+2029, lone CR) and invisible discretionary break/format characters (U+00AD, U+200B, U+2060, U+FEFF). Use ordinary LF/CRLF, intentional Markdown paragraphs, lists and ordinary spaces. Do not insert invisible characters to force layout or wrapping. Inspect decoded content, including escaped JSON sequences; report exact field and U+ code. Fix only affected prose, not code, URLs, identifiers or approved unrelated content. Ordinary line breaks and meaningful Unicode in other languages are not banned.

## Language patterns to avoid

Do not systematically use these AI-like copy formulas:
- "Det handler ikke om X. Det handler om Y."
- "Ikke bare X, men også Y."
- repeated "Fra X til Y" headlines;
- repeated three-part slogan structures such as "Finn, forstå og forbedre";
- several short dramatic sentence fragments in a row;
- perfectly symmetrical headings across every section;
- generic agency language such as "helhetlig", "sømløs", "skreddersydd", "robust" or "datadrevet" when a concrete description works;
- filler phrases such as "kan bidra til", "bidrar til å sikre" and "gjør det mulig å" when the sentence can state the action directly;
- repeated use of "samtidig som", "på tvers av", "i praksis" and "med andre ord";
- redundant summary sentences that merely repeat the preceding paragraph.

**OWNER 2026-11-24 - Rule 03:** Keep the existing absolute phrase bans enforced by `app/scripts/audit-copy-style.mjs`: det handler ikke om, ikke bare, med andre ord, kan bidra til, bidrar til å sikre, gjør det mulig å, helhetlig, sømløs (including variants), skreddersydd, robust (including variants), datadrevet. The other patterns above remain editorial guidance. Preserve the existing narrowly scoped OWNER-approved exceptions; do not introduce new exceptions or rewrite approved text without authority.

## Preferred writing

Prefer:
- concrete customer situations;
- specific nouns and verbs;
- short SVO sentences where possible;
- varied sentence length;
- one idea per sentence when the subject is already complex;
- honest limits and dependencies;
- wording a Norwegian customer could plausibly say or understand;
- examples tied to an actual service, page, purchase, enquiry, cost or customer journey.

If a sentence could be pasted onto almost any agency website unchanged, rewrite it.

If removing a sentence loses no useful information, remove it.

## Adjustable tone of voice for this website

The site-specific tone rules are documented in `coordination/CONTENT-VOICE-PROFILE.md`, while editable, current preset choices live ONLY in `coordination/CONTENT-TONE.json` (Pages CMS → Språk og tone). OWNER selected: Norsk klarhet + tørr observasjonshumor + kommersiell logikk + absurd konkretisering + litt frekkhet + self-aware honesty. Humor/edge/intensity are adjustable by content role; factual accuracy, audience-appropriate clarity and the approved commercial model are not adjustable. OWNER Rule 06 replaces blanket ELI10: retain necessary domain terminology and professional depth where useful; introduce unfamiliar concepts clearly, without reducing factual precision. See canonical MWS layered communication. Before saving new or revised copy, apply the canonical MedonWebSystem `docs/CONTENT-QUALITY-AND-VOICE.md` quality gate. This does not authorize a wholesale rewrite or automated Pages CMS selector.

## Scope

This applies to:
- headings;
- body copy;
- FAQ;
- package copy;
- CTA support text;
- CMS-editable customer-facing text;
- future Norwegian and English content.

Do not perform blind replacements inside:
- URLs;
- code syntax;
- identifiers;
- SVG path data;
- technical source where a character has a functional purpose.

This is a house-style and readability rule. Do not claim that Google penalizes a specific punctuation mark or phrase unless there is actual evidence for that claim.
