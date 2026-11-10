# Build request: Synlighet inclusion badges

Review Worker: `optimalisering-oslo-v33`
Git source: current `main` (verified head at request: `aca1c701e5c31b7edeff57cc9973e8379de7ab6c`)

Deploy the **entire latest main**, preserving all Pages CMS edits. This file has no runtime effect; it only creates a new Git push for the connected Worker build integration.

Verify `/synlighet/` displays the three DaisyUI badges `Inkludert i alle pakker` on SEO, Lokal SEO and AI-synlighet; previous `4 500 kr/mnd` labels must be absent from those three cards. Prices elsewhere, CTA links, contact forms, other routes and robots remain unchanged.

Git merge or green CI alone is not a Cloudflare deploy confirmation.

## Follow-up build request: independent card/detail links

At current main `3f789a077db4d42f6f87eb091416dd658acb0260`, merged PR #115. Trigger a fresh connected Worker build, preserving latest Pages CMS edits.

Validate on `/synlighet/` that each **card surface** opens respectively `/seo/`, `/lokal-seo/`, `/ai-synlighet/`, while each separate **Velg** CTA anchors to the same page's `#bestill` inside the local package section. Do not reintroduce monthly price labels. This note has no runtime effect.
