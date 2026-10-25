# Valgfritt Pagefind-søk — Optimalisering Oslo / Medon

**Status:** Kildeimplementasjon for eksisterende noindex-preview. Ikke verifisert som publisert før Cloudflare-bygget og søkeassetene er kontrollert.

## Hva gjør modulen?

En liten søkeknapp ved NO | EN og «Gratis sjekk» åpner en Pagefind-søkemodal. På mobil finnes den samme funksjonen inne i menyen. Ctrl+K / Cmd+K støttes av Pagefind-komponenten. Søkeresultatene kommer fra de faktiske statiske HTML-sidene i Astro-bygget; ingen database, API, eksternt analytics-system eller besøkslogging.

Alle visninger bruker nettstedets eksisterende fonter og fargevariabler. Pagefind følger <html lang="nb"> og støtter norsk bokmål, inkludert æ/ø/å.

## Bygg og drift

`npm run build` utfører:

1. `astro build` (gjeldende statiske nettside og eksisterende noindex).
2. `npx --yes pagefind@1.5.2 --site dist` — versjonslåst npm CLI uten endring i nettstedets eksisterende package-lock.
3. `node scripts/verify-pagefind.mjs` — fail closed hvis UI- eller indekseringsfilene mangler.

Cloudflare Workers Assets publiserer `app/dist` i henhold til eksisterende `wrangler.jsonc`. Hvis deployment-miljøet ikke får hentet Pagefind-pakken fra npm, skal byggingen feile og gammel fungerende review-versjon bli stående. Ikke publiser UI-knapp uten indeks.

Pagefind indekserer bare hovedområdet markert `data-pagefind-body`, ikke header, meny, footer, skjemafelt eller `noindex`-spesialsider og interne design-system-ruter. Ingen endring i offentlig SEO-/indekseringsbeslutning; previewens robots noindex/nofollow beholdes.

**Utvikling:** Pagefind lager indeksen *etter* byggeprosessen. `npm run dev` alene har derfor ikke Pagefind-assetene. Bygg først og server `dist` / test den faktiske Cloudflare-review-URL-en.

## Hva kontrollere i nettleseren?

Åpne reviewadressen etter bekreftet build. Trykk søkeikonet i headeren, søk etter `søkemotoroptimalisering`, `rørlegger`, `æ`, `ø` eller `å` (bare ord som finnes på de faktiske sidene skal gi treff). Sjekk norske resultater, at et treff går til riktig lokal side, at Escape lukker modalen, at det ikke finnes horisontal scrolling på mobil, og at Ctrl+K/Cmd+K virker. Sjekk `/pagefind/pagefind-entry.json` for generert språkindeks (skal ha nb).

## Gjenbruk / KISS

Dette er en valgfri modul for nye Medon-nettsteder. Uten søk sløyfes trigger, modal, ressurser og postbuild-trinnet. Med søk følger de samme filene og kommandoen med per nettsted — ikke bygg en ny serverbasert søketjeneste. På et senere flerspråklig nettsted må Pagefind først bygges fra faktisk publiserte EN-sider. **NO | EN** på denne piloten er fortsatt kun visuell; ingen engelske sider er opprettet.

Kilder: https://pagefind.app/docs/running-pagefind/ og https://pagefind.app/docs/search-ui/ .
