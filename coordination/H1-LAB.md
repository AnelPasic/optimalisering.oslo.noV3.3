# H1 Lab — relevant, concrete, memorable

**Scope:** Required for a NEW or substantially rewritten Hero on an important commercial/service/landing page. This process ships with the exported Astro site and needs no external knowledge base. A small copy correction does not trigger a headline contest.

**OWNER 2026-11-24 - Rule 04:** For a new or substantially rewritten important commercial page (e.g. Home, core service SEO/CRO or a strategic sales landing page), H1 Lab is required: explore roughly 6–10 distinct research-led angles internally, discard weak candidates, present up to three distinct complete Hero proposals with one recommendation and concise trade-offs, then stop for explicit OWNER selection/approval before writing the full page around the chosen direction or implementing it. No filler candidates. A previously explicitly selected Hero for the same scope satisfies this step; do not reopen it without instruction. For informational articles, independently choose the relevant, compelling title/H1 and introduction, apply editorial quality and evidence checks, and proceed within the authorized task without a mandatory headline approval step. Minor edits do not trigger H1 Lab. No new runtime/CMS approval status.

## Inputs (use the current site, not generic templates)

- Page role, actual offer/service, primary buyer, overarching commercial direction and primary conversion action. Rule 10 allows relevant secondary actions and multiple original perspectives in the full page. The Hero establishes direction, not a limit on content breadth.
- Use Rule 09 strategic research already completed for the important page: buyer/search intent, GSC where available, competing answers, first-party experience and a concrete information advantage. Challenge conventional agency claims, do not seek consensus as approval. Avoid competing with another page on the same intent.
- Concrete customer outcome, relevant proof/process, real constraints and geography where applicable.
- Current `coordination/CONTENT-TONE.json`, `CONTENT-VOICE-PROFILE.md` and approved project facts.
- Relevant BusinessIntelligence research **when accessible and useful**; never require a private repository to export, build or edit a standalone site.

## Per-page Hero tone (Pages CMS)

The `hero.toneOverrides` object may be set on **each page**, independently of global `coordination/CONTENT-TONE.json`. Controls exist for `eyebrowPreset`, `titlePreset` (H1) and `supportPreset`, shown together directly before the Hero's Overtekst. Each field resolves separately:

1. A selected named preset on that Hero part wins.
2. Missing, empty or `inherit` follows the site's `heroPreset`.
3. If site `heroPreset` is `inherit`, use the site's `defaultPreset`.

Read the current CMS-backed page JSON, `coordination/CONTENT-TONE.json`, `CONTENT-VOICE-PROFILE.md` and `COPY-STYLE.md` immediately before writing. Keep H1 Lab's relevance, concrete buyer value, truth and **whole-Hero** readability gates even with an expressive tone. CTA labels use the normal site-wide editorial rules without per-Hero tone controls; proof data and image alt stay factual.

**Editorial preference only:** Changing a dropdown does not regenerate or publish text, change rendered HTML, open a content queue or overwrite OWNER-edited copy. Apply the effective per-part tone when next explicitly asked to write/rewrite that part. When testing alternative SEO Heroes, prefer isolated draft/test fixtures over multiple public same-intent `/seo` variants. New public pages require their own distinct search intent and sitemap decision.

## H1 and full-Hero quality gates (MWS current authority)

Evaluate the **complete Hero**: H1, eyebrow, supporting copy, SEO title and the page itself. A striking H1 may be indirect when the complete Hero immediately makes the service, buyer gain and next action clear. Do not force the keyword into every headline or neutralize an original observation just to make the H1 stand alone.

1. **SEO / relevance:** The page metadata and content answer the search intent; the full Hero makes the service recognizable.
2. **AIO / meaning:** The Hero and page accurately describe what is offered, without claiming paid ads buy AI recommendations or organic rankings.
3. **Commercial relevance:** Express the researched value proposition established in canonical MWS Rule 07; do not run another Commercial Value Gate.
4. **Voice / distinctiveness:** Follow this project's saved tone, including direct, pointed or comic phrasing. Reject interchangeable agency language, not creative headlines.
5. **Truth / clarity:** The combined Hero is understandable in seconds and consistent with approved facts. A FAQ cannot rescue a materially misleading claim.

A failure in complete-Hero clarity, service relevance, buyer value or factual integrity disqualifies the candidate. If the OWNER already chose a Hero, do not restart the headline contest merely to add keywords. An explicitly authorized full rewrite under Rule 12 may replace the prior Hero direction, subject to fresh Rule 04 selection for important commercial pages.

## Workflow by change size

- **A — ordinary copy fix:** preserve existing H1 and page intent unless specifically asked to change them; no research or variants.
- **B — substantial H1/section revision:** make 2–3 meaningfully different candidates if needed, choose one that passes the gates.
- **C — new important page / core service Hero:** use the page's short Page Contract, explore roughly 6–10 genuinely distinct angles internally (straight service, buyer result, problem → solution, useful contrast, clear offer). Discard invalid ones; present **up to three complete Hero finalists** (eyebrow, H1, support and CTA), one recommendation and one-sentence trade-offs. Do not pad the candidate list. Wait for explicit OWNER approval of the chosen Hero direction before full-page drafting and implementation.

For each finalist, assemble eyebrow (category/relevance), subheading (buyer outcome, why hire Medon, credible professional delivery/ownership), proof (believability) and CTA (approved next step). After OWNER approval, develop the full page around the chosen direction. Check the complete Hero and heading story in context; never make the user guess what is being sold. Use the already-established Rule 07 commercial proposition. The existing flagship quality review assesses it on the whole page; H1 Lab does not repeat the Value Equation assessment. No invented performance promises or false zero-effort claims.

## Quick red-team

- **Three-second test:** What is this page about and why should the target visitor care?
- **Full-Hero test:** Can a buyer recognize the service and the gain from H1, eyebrow and support together?
- **Replaceability test:** Can competitors reuse it by swapping a name? If so, improve specificity when genuine differentiation is available; do not force novelty at the expense of clarity.
- **One revision pass:** Fix only the failed dimension. If critical buyer/offer facts are missing, ask for those facts instead of inventing a grander promise.

Do not publish extra pages, run A/B tests or alter existing customer sites from this process alone. Actual performance (queries, qualified leads and outcomes) can improve this single lab over time, without turning every research insight into a compulsory rule.
