# Deployment

## Astro static — preferred pattern

```text
Git
→ CI build
→ test/QA
→ /dist
→ static host
```

Targets may include:
- Cloudflare;
- cPanel/Apache;
- other static hosting.

## cPanel

Use cPanel as a static file server where possible.

Prefer CI build + SFTP/rsync/host-supported deployment instead of installing/maintaining a Node runtime on shared hosting.

## Sanity

Content publish should trigger/reliably result in a rebuild when static output depends on Sanity content.

Keep production functional if Sanity Studio is temporarily unavailable: public HTML should already be built.

## Preview

Preview may use separate runtime infrastructure when required. Do not expand preview complexity into production without need.

## Existing sites

Preserve:
- canonical domain;
- URL paths;
- redirects;
- analytics;
- forms;
- Search Console verification;
- conversion endpoints.

Migration QA is mandatory when URLs/runtime change.
