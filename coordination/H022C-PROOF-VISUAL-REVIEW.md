# H-022C — Kunderesultater: direkte oppdatering av review (D-107)

**Gjeldende OWNER-beslutning 2026-10-19:** Den tidligere prototypgrenen, mange skjermbilder og ekstra OWNER-godkjenning før review-deploy er OPPHEVET for denne oppgaven. Gjør KUN etterspurt endring, commit/push til main, publiser via eksisterende native Cloudflare review Worker og la OWNER vurdere resultatet visuelt der. Ikke endre offentlig lansering, indeksering eller aktivere innsending. Kontroller fersk main og ucommittede OWNER-endringer først.

## Oppgave
Redesign bare forsidens «Kunderesultater»:
- Eurotents: ett samlet og tydelig kundecase i stedet for løse fliser. Bruk et reelt skjermbilde av kundens offentlige NETTSIDE fra https://eurotents.com/, ikke et bilde av teltet. Lag optimalisert lokal media, oppgi opprinnelig URL, dato og ærlig alt-tekst. Gjenbruk eksisterende featuredVisual-felt og sikker fallback; endre ikke proof-evidence. Hvis ekte nettsideskjermbilde ikke kan skaffes, rapporter dette — ikke fabrikkér.
- Vis eksisterende godkjente Google Ads ROAS 4,3x → 17,2x (april 2025/april 2026) som hovedresultat, og «20 % lavere annonseforbruk» som integrert sekundær informasjon. Ingen store tomme tallflater eller løs lilla stripe.
- Lag to visuelt samordnede kort for Nysta (fullført checkout 7,1 % → 43,6 % blant checkout-startere) og Helt Opplagt (organiske klikk 2 162 → 4 181, +93 %). Behold nåværende godkjente kunde-/måle-/periode-/kildebetegnelser. Ikke påstå salg/leads som ikke er dokumentert.
- Behold overskrift, godkjente typografi-/farge-/radius-tokens. Sørg for lesbar desktop/mobil, resultat tydelig uten at høyt screenshot skyver det langt ned.

## Hard scope
Kun nødvendig homepage proof-komponent/styling og presentasjonsbildet + tilhørende CMS-mediefelt. Ikke endre caseverdier, publiseringsrett, datakilder, forbehold, andre ruter, service proof primary-variant, Hero, kalkulator, priser, CTA, form, FAQ, Pages CMS-modell eller forside B-seksjonsrekkefølge. Ikke refaktor unrelated code. Behold alle åtte globale mastere; bare featuredVisual i resultater kan oppdateres.

## Effektiv QA og levering
1. Før-etter Git-diff: kun forespurt område og mediefelt; bevar alle eksisterende tall/labels/perioder og øvrig CMS-innhold.
2. Kjør app-build og de få relevante proof-/presentasjonstestene. Rask desktop- og mobilkontroll for synlige tall, bildelasting og overflow. Ikke omfattende firebredde-skjermbildearkiv, full 158/196 testkampanje eller ny autentisert CMS Save/revert for et isolert visuelt grep. Utvid kun tester dersom en konkret feil eller større avhengighet avdekkes.
3. Commit/push til main og bekreft ekte native Cloudflare build/deploy på https://optimalisering-oslo-v33.anel.workers.dev/. Lokal build alene er ikke deploybevis.
4. Kort kvittering i CODEX-TO-CHATGPT.md og oppdatert status: hva ble endret, hvilke få tester ble kjørt, SHA, Worker URL og eventuelle avvik. Ingen unødvendige evidence-mapper.
5. OWNER vurderer visuelt direkte på Worker etterpå. Ingen ekstra design-gate før denne review-publiseringen.

**H-024A3 CMS-editor fortsatt OPEN, H-024B BLOCKED; ingen public launch/index/intake.** Historiske H-022 og D-106 om tung prototyping er erstattet kun for denne avgrensede review-oppgaven av D-107.
