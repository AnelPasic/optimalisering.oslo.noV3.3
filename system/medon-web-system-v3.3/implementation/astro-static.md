# Implementation Profile — Astro Static

## Use when

- mostly static marketing/content site;
- Medon edits content;
- CMS provides no meaningful business value.

## Principles

- pre-render normal public pages;
- minimal client JavaScript;
- Astro Content Collections for editorial content where useful;
- shared data only where truly shared;
- page-specific commercial copy may stay close to page markup if that improves maintainability;
- forms submit to secure backend/Medon Lead Engine;
- deploy static `/dist` to Cloudflare or cPanel/static hosting.

## Do not add

- database;
- SSR;
- client framework site-wide;
- CMS;
- auth;
- runtime API fetching for content that can be built.

## Upgrade path

Move to Pages CMS or Sanity only when a real editorial requirement appears.
