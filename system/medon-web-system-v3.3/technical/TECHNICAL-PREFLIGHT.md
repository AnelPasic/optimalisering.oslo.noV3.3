# Technical Preflight / Delivery Contract

Resolve this before production implementation. Research/strategy may begin while a few fields are provisional, but **production code must not begin with unresolved foundation choices that can force a rebuild later**.

## Required fields

```text
PROJECT
Mode: greenfield / existing / migration / microsite / application
Workflow profile: FAST / STANDARD / ADVANCED / EXISTING_SITE
Site ownership: MEDON_OWNED / CLIENT_OWNED

FRONTEND
Astro / Nuxt 4 / existing
Why:

CONTENT
Local/static / Pages CMS / Sanity / existing CMS
Client editing frequency:
Visual editing required? yes/no

REPOSITORY
GitHub owner/org:
Repository:
Visibility:
Default branch:
Existing repo? yes/no

HOSTING
Cloudflare / cPanel / other:

DEPLOYMENT
GitHub integration / Actions / SFTP / rsync / other:
Preview environment:
Production environment:
Rollback method:

RUNTIME
Fully static / hybrid / SSR/application
Runtime reason if non-static:

FORMS / LEADS
Medon Lead Engine / project backend / existing system:
Notification path:
Storage/source of truth:

ANALYTICS
GA4:
Ads:
Meta:
Consent:
Primary conversion event:

DOMAIN / DNS
Owner:
DNS controller:
Existing URL migration? yes/no
Redirect inventory required? yes/no

IMAGES
Astro pipeline / Sanity CDN / other:

SECRETS
Where stored:
Never in client bundle/repository.

OWNERSHIP / OFFBOARDING
Code owner:
Domain owner:
CMS owner:
Analytics owner:
Lead/customer data owner:
Asset owner:
Export/offboarding constraint:
```

## Early Git rule

For a new coded project, initialize/use the intended Git repository from the first meaningful implementation commit. Do not build an untracked production tree and “add Git later”.

## Default recommendations

- content site → Astro;
- simple editing → Pages CMS;
- richer editorial needs → Sanity;
- app-like product → Nuxt 4;
- static production where possible;
- preview separate from production where dynamic preview is needed;
- lead handling independent of CMS.

## What must be owner-confirmed

Ask only unresolved choices with material ownership/cost/operational consequences. If the repository/domain/hosting are already evident, do not ask again.

## What the agent may choose without approval

Minor folder naming, lint config, icon package, internal utilities, exact breakpoint tuning and similar implementation details unless they alter an approved user-facing system or operational contract.
