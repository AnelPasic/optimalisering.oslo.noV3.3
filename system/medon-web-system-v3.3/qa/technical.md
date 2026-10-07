# Technical QA

## Build

- [ ] production build succeeds;
- [ ] no unresolved console/build errors;
- [ ] generated HTML inspected;
- [ ] important content exists in crawlable HTML;
- [ ] only necessary client JavaScript ships.

## URLs

- [ ] HTTPS canonical;
- [ ] canonical tags correct;
- [ ] redirects deliberate;
- [ ] trailing-slash policy consistent;
- [ ] 404 works;
- [ ] no accidental staging/indexable duplicates.

## Crawl

- [ ] robots.txt deliberate;
- [ ] sitemap valid;
- [ ] no important page accidentally noindexed;
- [ ] internal navigation crawlable;
- [ ] canonical URLs in sitemap.

## Performance targets

Aim for:
- LCP < 1.8s on representative fast/static pages where realistic;
- CLS < 0.05;
- INP < 150ms;
- Lighthouse Performance >= 95;
- Accessibility >= 95;
- SEO >= 98;
- Best Practices >= 95.

Treat lab scores as diagnostics, not business KPIs.

## Images

- [ ] responsive sizes;
- [ ] width/height/aspect reserved;
- [ ] modern formats where appropriate;
- [ ] no huge unoptimized originals served unnecessarily;
- [ ] meaningful alt text;
- [ ] decorative images handled appropriately.

## Accessibility

- [ ] keyboard;
- [ ] focus;
- [ ] labels;
- [ ] contrast;
- [ ] semantic headings;
- [ ] reduced-motion considerations;
- [ ] mobile tap targets.

## Security

- [ ] no secrets in client bundle/repo;
- [ ] forms validate server-side;
- [ ] rate/spam protection;
- [ ] dependencies reviewed;
- [ ] headers/caching appropriate.
