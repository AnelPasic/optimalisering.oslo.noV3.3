# Implementation Profile — Nuxt 4

## Use when

The project is primarily an application, not simply a content site.

Signals:
- auth;
- user/account dashboards;
- persistent application state;
- complex data workflows;
- app-level search/filter;
- portals;
- permissions;
- account-specific content;
- multi-step operational flows.

## Principles

- prerender public/static routes where appropriate;
- keep JS/runtime behavior proportional to actual app needs;
- share Medon commercial/content/SEO rules with Astro projects;
- reuse design tokens and lead/analytics conventions where practical.

## Do not choose Nuxt because

- the site has a contact form;
- one calculator exists;
- the developer likes Vue;
- “we may build a portal someday”.

Future hypothetical features do not justify current complexity.
