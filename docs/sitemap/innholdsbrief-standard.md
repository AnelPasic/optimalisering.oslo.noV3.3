# Innholdsbrief-standard – Optimalisering Oslo (beslutning 32)

**Status:** Godkjent krav til backlog og produksjon. **Omfang:** Kun optimalisering.oslo.no. **Kilde:** Beslutninger 1–32, spesielt eksplisitt kommentar til punkt 32, der punkt 31 ble brukt som modell.

## Hovedregel

En URL-liste, en generisk SEO-tittel eller en liste med stikkord er **ikke en godkjent sidebrief**. Alle sideissues må bevare **tanken bak tilbudet** og det konkrete produksjonsgrunnlaget, slik at innhold kan produseres med kundens problem og realistiske leveranser som utgangspunkt. Dette er beslutningsgrunnlag/utkast, ikke verifiserte markedsfakta, og må kvalitetssikres før publisering.

### Obligatorisk struktur for hver URL

1. **Beslutning:** Nummer, faktisk brukerbeslutning, URL, overordnet side.
2. **Kundens problem:** Et konkret gjenkjennelig problem og praktisk konsekvens.
3. **Dette kan vi levere:** 4–8 **navngitte leveranser**, hver fulgt av en egen kort forklaring på hva som undersøkes, forbedres eller leveres. Ingen stikkordsliste uten beskrivelser.
4. **Hvorfor egen side:** Hvilket særskilt kundebehov / kjøpsintensjon siden dekker.
5. **Forskjell mot andre tjenester:** Lenker til nærliggende URL-er og hva som ikke skal dupliseres.
6. **Forretningsmodell:** Inngangsprosjekt/audit, implementering og mulighet for månedlig avtale når relevant. **Ikke dikt opp priser/pakkeinkludering.**
7. **Avgrensning og bevis:** Plattformbegrensninger, personvern, garantier, kompetanse, krav til dokumenterbare påstander.
8. **Anbefalt CTA og internlenker:** Etterprøvbart løfte, relevant neste steg og tydelig relasjon til navsiden.

## Godkjent stilreferanse: Punkt 31, Merchant Center

**URL:** `/google-shopping/merchant-center/`

**Kundens problem:** Nettbutikken har produkter som avvises av Google, mangler viktige produktopplysninger eller viser feil pris og lagerstatus. Dette kan begrense synligheten i Shopping og føre til unødvendig dårlig annonseeffekt.

### Dette kan vi levere

**Merchant Center-analyse**  
Gjennomgå konto, produktkilder, diagnostikk, produktstatus og varsler om avvik.

**Produktfeed-optimalisering**  
Forbedre produkttitler, beskrivelser, produktkategorier, bilder og relevante attributter som merke og GTIN.

**Feilretting og produktavvisninger**  
Finne og rette årsaker til feil der vi har nødvendige tilganger og kontroll over produktdataene.

**Automatisk produktsynkronisering**  
Kontrollere at priser, lagerstatus, produktvarianter og tilgjengelighet samsvarer mellom nettbutikk og Google.

**Shopify og WooCommerce**  
Sette opp og forbedre produktintegrasjoner, datakilder og nødvendige feed-tilpasninger.

**Overvåkning og løpende vedlikehold**  
Oppdage nye avvisninger, endringer i produktdata og problemer som kan påvirke synligheten.

**Hvorfor egen side:** Skiller produktdatakvalitet og feedfeil fra `/google-shopping/` (annonsekampanjer) og `/nettbutikkoptimalisering/produktsider/` (produktpresentasjon på selve nettstedet). Merchant Center kan også ha betydning for gratis produktoppføringer.

**Forretningsmodell:** Oppstart/audit, feilretting og oppsett, deretter mulig månedlig oppfølging. Ingen garanti for produktgodkjenning eller rangering.

## Neste fullstendige eksempel: Punkt 32

**URL:** `/google-ads/konverteringssporing/`

**Kundens problem:** Google Ads registrerer feil eller doble konverteringer og kan optimalisere mot uinteressante hendelser fremfor kvalifiserte henvendelser eller salg.

### Dette kan vi levere

**Konverteringsaudit**  
Kontrollere hvilke handlinger som telles som primære konverteringer og hvilke data budgivningen bruker.

**Google tag og Tag Manager**  
Finne feil i hendelser, triggere, tagger og eventuell dobbeltregistrering.

**GA4-import**  
Kontrollere hvilke konverteringer som importeres og hvorfor tall mellom GA4 og Ads kan avvike.

**Enhanced conversions**  
Vurdere forbedret konverteringsmatching der datagrunnlag, integrasjon og personvern tillater det.

**Offline-konverteringer**  
Vurdere å knytte kvalifiserte henvendelser eller avsluttede salg tilbake til Ads når dette er forsvarlig konfigurert.

**Samtykke og kvalitetssikring**  
Verifisere relevant samtykkemodus, personvern og faktisk ende-til-ende registrering før kampanjebudgivningen endres.

**Hvorfor egen side:** Spesifikk teknisk kjøpsintensjon; forskjellig fra bred `/sporing-og-maling/` og kampanjedrift på `/google-ads/`.

**Forretningsmodell:** Betalt feilsøkings- og implementeringsprosjekt; kontroll/vedlikehold som mulig retainer. Ingen garanti for eksakt ROAS eller attribusjon.

## Kriterier for «klar til innholdsproduksjon»

- [ ] Kundeproblem og ønsket utfall er konkrete.
- [ ] Hver leveranse har egen forklaring (ikke bare overskrift).
- [ ] Sideformålet er adskilt fra konkurrerende interne sider.
- [ ] CTA samsvarer med avgrenset leveranse.
- [ ] Ingen udokumenterte løfter, priser, garantier eller referanser.
- [ ] Tekst skiller mellom hva som kan leveres og hva som forutsetter avklaring.
- [ ] Relevant internlenking til hub, tilgrensende spesialiseringer og vurdering/kontakt.

## Pakker, prosess, prioritet

Full pakketildeling utsettes til sitemap er ferdig. **Omfattende A/B-testing ligger foreløpig bare i Partner**, og bare når datagrunnlaget gir mening. Ikke la Codex finne på inkluderte tjenester. Opprett en dedikert utviklingsissue **per URL først når siden skal bygges**, under riktig område-issue. Bevar full brief i versjonerte dokumenter, ikke bare i en ephemeral chat eller løs issue-kommentar.
