# H-021C focused delivery evidence

Contract: `../../H021C-PAGELIST-ICON-FALLBACK.md`; incoming `b7c3a0a`.
The only production file changed is `PageList.astro`: explicit visual-kind state
and alternating-only icon geometry. Desktop icon rows use70/30 text/visual
columns, reversed on even results. Icon panels are180–240px desktop and140–180px
mobile. Images retain balanced columns and their existing aspect ratio/crop.
Generic ListingVisual, mediaCards, queries, schema, CMS, content and tokens stay exact.

| Width | H-021B icon height | H-021C icon height |
| --- | --- | --- |
|1440|366.3px|240px|
|900|225px|180px|
|390|196.9px|156px|
|320|162px|140px|

`before/` and `after/`:10 focused no-JS groups each. Current icons and mixed
image/icon/image are checked at1440/900/390/320; mediaCards at1440/390 has exact
before/after content, typography and geometry. Structural1/2/3/4-child checks
exercise alternation on the rendered mixed list, rather than rerunning query
fixtures whose source is unchanged. Icons remain decorative, links focusable,
images decode/use cover, and no overflow/browser errors/POST occurs.
The temporary synthetic article/image/measurement override is restored in finally,
and the default build restored. Four primary screenshots per phase: current and
mixed at1440/390. The test pixel is local only and removed.

`red.log`: density assertion fails against the old icon presentation.
`focused.log`:14/14 existing PageList/visual/CMS tests pass.
`verify.log`: exactly one full verify run,115/115 tests; zero Astro errors/warnings
and one existing intake-script hint. Static/CMS/surface guards and196 typography
groups pass; no new full-site regression campaign. Typography screenshots omitted.
`preservation.json`:403 protected source blobs; all JSON/CMS/resolver/image renderer,
shared styles, safeguards and read-only references remain exact. OWNER images untouched.

Brief independent read-only review reports no findings: icon selectors preserve
even/mobile behavior; image/no-visual/mediaCards are unaffected. No tests/builds
were repeated by the reviewer. This is implementation QA, not OWNER acceptance.

Run from `app/`: `node scripts/qa-h021c.mjs`; `QA_PHASE=before` requires the original
build. `QA_BASE_URL` checks only the four-width current default on the Worker.
Source fixtures run alone; no authenticated CMS save is needed for unchanged fields.

Implementation `e5965c601d6a09d1cd6672ef14ed025b68aed818` is pushed. Exact native
Build `e5a1701b-89f5-4e81-9dc8-a3fdff86444f` succeeds; Worker Version
`f9e9fa27-11de-4fa0-82d6-749465eef52d`. `live-assets.json`:54 assets match the
tested build, with noindex/robots/empty sitemap/disabled APIs/custom404 intact.
`live/`:four current-icon no-JS width checks and1440/390 captures pass, with no
overflow/errors/POST. No new live fixture content or direct deployment.
STOP for OWNER
visual review; no other implementation, content lock, indexing, intake or launch.
