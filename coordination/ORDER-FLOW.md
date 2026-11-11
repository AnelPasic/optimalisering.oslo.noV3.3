# Optimalisering Oslo – gjeldende bestillings- og oppstartsflyt

**Status per 2026-11-11:** Operativ fasit og restarbeid; kontrollert mot GitHub `main`. Dette dokumentet er ikke bevis på Cloudflare-deploy, reell e-postlevering eller ende-til-ende godkjenning. **Nyeste eksplisitte OWNER-endring går foran de historiske Gate 8.x–10.x-tekstene.**

## Autoritet og kilder

- Godkjent prosess og ferdige meldings-/tilbudsmaler: [LOCKED-CONVERSION-MESSAGES-2026-11-08.md](LOCKED-CONVERSION-MESSAGES-2026-11-08.md). Innholdet der skal ikke omskrives automatisk eller sendes før implementering og kontroll.
- Tidligere beslutning om inline bestilling: [DECISIONS.md, D-122](DECISIONS.md). Endringer etter denne er bindende for faktisk UI.
- Nyeste OWNER-beslutning: [PR #122](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/pull/122) forenkler bestilling til pakke uten fokusvalg; [PR #123](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/pull/123) gjør telefon valgfritt; [PR #124](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/pull/124) innfører `/takk/` etter lagret kvittering.
- Faktisk frontend: `app/src/components/PackageOrder.astro`, `app/src/lib/order.ts`, `app/src/components/HomeAssessment.astro`, `app/src/components/AssessmentForm.astro`.
- Faktisk mottak: `intake-worker/src/worker.mjs`, `store.mjs`, `notify.mjs`, `migrations/0001_receipts.sql`. Kundeinformasjon: `app/src/content/pages/vilkar.json` og `personvern.json`.
- Pågående arbeid: [#107 – frontend](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/issues/107), [#108 – e-post/frist/sletting](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/issues/108). [#105](https://github.com/AnelPasic/optimalisering.oslo.noV3.3/issues/105) er bevisst utsatt kvartalsoppfølging.

## Hva kunden faktisk møter nå

1. Behovskortene «Bli funnet», «Bli valgt», «Begge deler» leder til `/priser/?pakke=optimalisering|vekst#bestill`. De velger **pakke, ikke et teknisk fokusfelt**. Pakker: Optimalisering, Vekst, Enterprise; Enterprise beholder internnøkkel `partner`.
2. «Bestill [pakke]» åpner skjema **i det aktuelle pakkekortet**. Kun nettside og jobb-e-post er påkrevd; telefon valgfritt. Skjult pakkenøkkel valideres. Ikke krev firmanavn, kontaktperson, budsjett, konto eller passord.
3. Frontend sender med gyldig pakkekode, kildeinformasjon og idempotency-key. Workeren validerer origin, idempotens, rate limit, pakke og øvrige felter. **D1-lagring før HTTP 201/200-kvittering**; 409 ved nøkkel-/innholdskonflikt. Internt Resend-varsel har egen retry og påvirker ikke D1-ACK.
4. Kun etter `{ok:true,id}` navigerer frontend til den generiske, `noindex`-merkede `/takk/`. Ved feil beholdes utfylte verdier. Ingen betaling eller bindende avtale oppstår ved innsending.

## Etter mottatt bestilling – låst menneskelig prosess

1. **Medon mottar og kontrollerer bestillingen** i bemannet kanal og/eller operatørbeskyttet D1-oversikt. Bekreft faktisk pakke, nettside, kontakt og relevant behov. Ikke anta at Resend-akspet betyr at mottakers innboks har fått e-posten.
2. **Kunden skal få en trygg bestillingsbekreftelse** i merkevaren Optimalisering Oslo. Gate 8.4 er godkjent tekstutgangspunkt, men inneholder `[Valgt område]`: dette feltet ble fjernet av senere OWNER-beslutning og **må ikke diktes opp ved utsending**. Kundens bekreftelsesmail er per nå ikke implementert.
3. **Kort skriftlig oppstartstilbud** sendes manuelt etter avklaring, med valgt pakke, pris eks. mva., prioritert arbeidsomfang, eventuelle avgrensninger, oppstartsdato, annonsebudsjett og Medon AS som avtalepart. Bruk den godkjente malen i låst dokument; ingen bindingstid eller ekstra oppsigelsesmåned.
4. **Kunden aksepterer skriftlig** ved å svare «Jeg godkjenner tilbudet». Arkiver tilbudsversjon og svaret. Et «Ja» på gratis-funn-e-posten er *ikke* avtaleaksept.
5. **Etter aksept:** be om kun nødvendige tilganger gjennom plattformenes egne invitasjoner. Ikke be om passord eller engangskoder. Bekreft reell oppstartsdato. Månedlig fakturering forskuddsvis fra avtalt oppstart; annonsebudsjett/andre tredjepartskostnader kommer i tillegg dersom avtalt.
6. **Oppsigelse:** kunde kan si opp på e-post når som helst; tjenesten løper ut allerede betalt periode uten ny oppsigelsesmåned. Ved motstrid gjelder konkret godkjent tilbud.

## Gratis sjekk – egen flyt

- Løftet er **tre konkrete prioriterte funn innen to norske virkedager**, levert i kort personlig e-post etter menneskelig kvalitetssikring. Ingen generisk PDF eller automatisk salgsmassasje.
- Begge eksisterende UI-skjema bruker nettside/e-post, men har fremdeles kommentar-/modellfelt og mangler valgfritt telefonfelt. Den godkjente kompakte tre-feltsvarianten er **ikke implementert**; se #107.
- Automatisk kundebekreftelse og beregnet intern leveringsfrist med norsk helgedag-/helligdagslogikk er **ikke implementert**; se #108. Den lovede fristen må ivaretas manuelt inntil dette fungerer.

## Verifisert i kilde / åpne porter

| Del | Status per 11.11.2026 |
| --- | --- |
| Pakkevalg, inline ordreskjema, valgfri telefon, etter-ACK `/takk/` | Implementert. #122 dokumenterer én syntetisk HTTP 201/D1-kvittering på live origin, #123–124 lokal test. Ingen ny reell test sendt i denne gjennomgangen. |
| Internt Resend-varsel | Implementert med én outbox per D1-receipt. Ekte innbokslevering og rett kontaktkanal/Reply-To er ikke uavhengig bekreftet. |
| Automatisk kundekvittering (ordre og gratis sjekk) | **Mangler.** Krever separat durable job/status/retry/idempotens fra intern mail, og verifisert avsender/Reply-To. |
| Konkret norsk leveringsfrist i intern gratis-sjekk-mail | **Mangler.** Definer helger, helligdager, klokkeslett/cutoff og manuell oppfølging. |
| Låst maksimum 12 måneder for henvendelser uten kundeforhold | **Mangler operativ sletting.** D1 har ingen TTL/erasure-flow; personvernteksten sier korrekt at ingen fast automatisk slettedato er satt. Avklar også e-post, eksport, backup og aktive/lovpålagte saker før ny publisert påstand. |
| Konverteringsmåling | D1 registrerer akseptert forespørsel; separat markedsføringsevent med deduplisering er ikke påvist. Ikke send event på åpning av skjema eller ved feil. |
| Skriftlig tilbud/aksept/oppstart | Godkjente maler og manuell arbeidsflyt finnes. Ingen ny CRM eller automatisk faktura/avtaleaksept er vedtatt. |
| Kvartalsrapport | Bevisst utsatt (#105); ikke en lanseringsblokkering. |

## Prioritet / handoff

1. **P0 drift nå:** Kontroller at en faktisk bemannet innboks mottar intern Resend-mail, og at forespørsler om tre funn gis manuelt svar innen lovet frist. Kontroller eventuelt D1 via beskyttet operatørtilgang. Ikke anta at automatisk kundemail allerede går.
2. **P1 #108 B1:** To separate e-postjobber per lagret receipt; kundemalene uten oppdiktet fokus; norsk fristberegning og verifiserbar operatorstatus. Bygg og test uten å sende ekte mail før separat ops-godkjenning.
3. **P1 #108 B2:** Kontrollert 12-måneders maksimum og sletteprosedyre for ikke-kunder, med dokumentasjon og e-post/eksport/backup-ansvar. Endre personvernteksten *etter* at rutinen er reell.
4. **P2 #107:** Kompakt gratis-sjekk-skjema med nettside, jobb-e-post og valgfri telefon på alle aktuelle innganger; gjennomgå konverteringshendelse kun ved faktisk unik D1-ACK. **Ikke gjeninnfør fokusvalg**.
5. **Etter teknisk QA:** Bekreft Cloudflare-versjon, riktig domene/origin, kontrollert syntetisk POST, D1-kvittering, intern e-post og kunde-e-post/Reply-To. Test feilsituasjoner uten å skape ekte kunder. OWNER må godkjenne driftsaktivering.

**Scope:** Ikke bygg om fungerende bestillingsskjema, Worker/D1, CMS, priser, tema eller MedonWebSystem. Ingen ny CRM, LeadProof-integrasjon, automatisk tilbudssending eller blind produksjonsdeploy.
