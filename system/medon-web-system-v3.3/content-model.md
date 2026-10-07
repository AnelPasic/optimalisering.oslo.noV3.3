# Medon Content Model v2 — v3.3

Define content semantics before CMS-specific schemas. Git-backed content should remain understandable without the frontend.

Not every project needs every entity.

## Shared publication fields

Where useful:
- `id`
- `status`: draft | review | locked | published | stale
- `title`
- `slug`
- `updatedAt`
- `owner`
- `reviewedAt`
- `evidenceReferences`

## Core entities

### Organization
name · legalName · description · logo · contact · address · serviceAreas · socialProfiles · verifiedFacts

### Service
id · title · slug · shortDescription · audience · problems · outcomes · differentiators · process · pricing/priceGuidance · proofReferences · faqReferences · relatedServices · locations · CTA · SEO

### Location
name · type (`physical_location` | `service_area`) · address/phone/openingHours when real · serviceAvailability · firstPartyLocalEvidence · operationalNotes · relatedServices

A Location entity does not justify a location page by itself. A service-area page must earn its URL through distinct need, real capability and information gain.

### Offer / Package
name · fit · price/pricing logic · inclusions · exclusions · limits · externalCosts · CTA · proof

### Case Study
customer/anonymous label · problem · startingPoint · intervention · result · evidence · date · relevantServices · publicationPermission

### FAQ
question · answer · source/evidence · relatedEntity

### Person
name · role · expertise · bio · image · verified credentials

### Testimonial
quote · person/company · source · permission/state · relatedService

### Article / Guide
title · intent · author/reviewer · content · citations/sources · relatedEntities · published/updated dates

### Fact / Insight
id · type · statement · context · whyItMatters · source/evidence · checkedAt · recheckAfter · volatility · timeframe/geography/sample · relatedEntities · relatedPages · verificationState

### Page Content
For important commercial pages keep a semantic document or content object with:
- page role/job;
- audience/intent;
- hero content;
- ordered semantic sections;
- proof references;
- CTA references;
- SEO object;
- content state.

Do not encode design component names into commercial content unless the field represents a true reusable content object.

## SEO object
metaTitle · metaDescription · canonical · indexPolicy · ogImage · targetIntent · primaryEntity · structuredDataTypes

## CMS adapters
Map the semantic model into local files/Astro Content Collections, Pages CMS Markdown/YAML, Sanity, or API models.

Frontend components depend on semantic content, not raw CMS quirks. Pages CMS is an editor over Git content, not a second source of truth.
