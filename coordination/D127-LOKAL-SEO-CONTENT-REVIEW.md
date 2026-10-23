# Lokal SEO – sidebrief, research og upublisert CMS-utkast

2026-10-23. D-127 N2; **DRAFT / NON-AUTHORITATIVE**, Lane C etter MWS-031. Ingen ny offentlig rute eller publiseringsgodkjenning.

## Formål og faktisk innhold

Kjøper: en bedrift som møter kunder på et sted eller leverer tjenester i et faktisk område. Siden skal hjelpe kunden å skille feil i Google bedriftsprofil fra manglende tjenesteinformasjon og friksjon i kontaktveien. Neste handling er den eksisterende avgrensede sjekken eller prisoversikten, ikke en ny lokal SEO-pakke.

Søkeintensjon er undersøkt kvalitativt med `lokal seo Google Maps bedriftsprofil`, `lokal seo hjelp bedrift Oslo` og spørsmål om profiloppsett/lokal rangering. Treffbildet blander forklaringer, profilveiledning og kjøp av hjelp. **Dette er en tolkning av et lite, datert søkeutvalg, ikke søkevolum, GSC-data eller dokumentasjon av Medons etterspørsel.** Tekniske/faglige påstander bygger på primærkildene under, ikke konkurrentpriser eller rangeringstips i byråartikler.

| Rolle | Eksisterende innhold / avgrensning |
| --- | --- |
| Synlighet | Kommersiell hub. OWNERs `kanaler` skiller SEO/lokal/AI; `lokal-synlighet` forklarer profil, områder og henvendelse. Bevares eksakt. |
| SEO | Organiske tjeneste-/innholdssider og relevant trafikk. Eksisterende kilde bevares. |
| AI-synlighet | Omtale, kilder, besøk og kundeverdi i AI-svar; egen usikkerhet og ingen anbefalingsgaranti. URL `/ai-synlighet/` beholdes. |
| Lokal SEO-utkast | Lokale kjøpssituasjoner, profil kontra nettside, kvalifisering/adresse/tjenesteområde, prioriteringsmatrise, rangeringsbegrensninger og måling. Ingen bynavnkopierte sider. |
| Innsikt | Støtteguide om måling lenkes fra utkastet. Mulig senere separat veiledning om profilvedlikehold krever reelt behov og eget brief. |

## Kilder og påstandsgrenser

- [Google: lokal rangering](https://support.google.com/business/answer/7091?hl=no): relevans, avstand og hvor kjent bedriften er; korrekt profilinformasjon; ingen kjøpt/garantert lokal rangering. Utkastet bruker dette som forklaring på begrensninger, ikke som resultatløfte.
- [Google: representasjon og profilregler](https://support.google.com/business/answer/3038177?hl=no): reelle navn, beliggenheter og tjenesteområder. Utkastet skiller besøkssted fra bedrift som reiser til kunden; ingen påstand om at enhver virksomhet kvalifiserer.
- [Google: legg til/gjør krav på profil](https://support.google.com/business/answer/2911778/): undersøk eksisterende profil og eierskap før ny profil opprettes.
- [Google: LocalBusiness-data](https://developers.google.com/search/docs/appearance/structured-data/local-business): synlige fakta og kvalifisert markup; ingen garanti for bestemt søkeresultat. Ingen nye adresser, vurderinger eller schema er oppfunnet eller lagt inn i nettstedet.
- [Google: nyttig innhold](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) og [SEO-grunnveiledning](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): oppgaveorientert innhold og forståelige lenker, ikke ekstra URL-er som mål i seg selv.

## Redaksjonell kontroll før lagring

**Sidefil:** `app/src/content/drafts/lokal-seo.json`. Én H1, spesifikk title/meta, sju seksjoner og fire FAQ. H2-historien går fra lokal relevans til profil, nettside, prioritert diagnose, begrensninger, måling og neste handling. Nyttig egen syntese er matrisen «vanskelig å kjenne igjen / vet ikke om dere kan hjelpe / kontaktfriksjon» og skillet mellom profilhandling og faktisk kunde. Rørlegger i Ski og lokal butikk er uttrykkelige forklaringseksempler, ikke Medon-caser, nye leveringssteder eller resultater.

**Sannhet/tilbud:** ingen ny pris, leveransekvote, frist, plassering, kunde-/resultatbevis eller oppfunnet Medon-sertifisering. Aktuelle tiltak må avtales; gjeldende priser er lenket til felles kilde. Eksisterende Synlighet-kilde støtter at profil/nettside/leveringsområder inngår i vurderingen; spesifikk operativ leveranse må fortsatt avklares før publisering.

**SEO/AIO:** distinkt lokalt behov og profil/nettside-skillet gir grunn for egen side. Definisjon, begrensninger og konkrete beslutningsregler kan forstås uten AI-/SEO-fagspråk. Internlenker går til SEO, Synlighet, Konvertering, måleguide, priser og eksisterende sjekk. Ingen synonym-rute `/aio/`. Siden skal etter separat godkjenning få én direkte lenke fra huben og menypunktet; dagens hub er ikke omskrevet.

**KRO:** kunden kan vurdere relevans, forstå hva som bør undersøkes og velge neste steg uten lovet rangering. Pakkevalg holdes på dagens prisflate. Sjekken omtales avgrenset, uten å innføre nytt svartidsløfte. Personvern-/driftsgodkjenning og de eksisterende motstridende svartidstekstene løses ikke av dette utkastet.

**Stemme:** dagens `medon` for tjenestetekst og forklarende presisjon der Spiss+ er valgt. Ingen tvungen vits per avsnitt; nøkterne begrensninger og fakta. `COPY-STYLE.md` fulgt. Fullført kildeutkast er ikke en påstand om uavhengig STRATEGY_CONTENT/OWNER PASS.

## CMS og publiseringsvern

Pages CMS → Tjenester → **Lokal SEO - upublisert utkast** gjenbruker eksisterende servicefelt/ankre. `status` og `authority` er read-only; `settings.content.merge: true` er bevart. Ny fil ligger utenfor loaderens `src/content/pages`, så CMS-lagring kan ikke alene publisere siden. Schema + faktisk CMS-projeksjon er testet i minnet. Ingen autentisert hosted CMS-save er utført eller påstått.

**Midlertidig navigasjon:** Lokal SEO peker til den allerede synlige og relevante `/synlighet/#lokal-synlighet`, med D-127s korte forklaring. Dermed har alle tre fagområder en fungerende destinasjon uten å publisere utkastet. Dette er et bevisst midlertidig valg; den planlagte `/lokal-seo/` er ikke opprettet som offentlig rute. Når komplett side er innholdsgodkjent, kan filen flyttes kontrollert til sidekolleksjonen, CMS-destinasjonen oppdateres og den ene menylenken byttes. Publisering/indeksering er separate gater.

**OWNER + STRATEGY_CONTENT må vurdere:** hele utkastets faglige dekning, om den foreslåtte vurderings-/oppfølgingsbeskrivelsen matcher faktisk Medon-leveranse, og om siden tilfører nok verdi utover huben. Visuelle aktiva og case er ikke forutsetning; ingen nye bilder eller bevis er fabrikkert. Ved godkjenning kreves render-/mobilkontroll av den nye siden og kontroll av faktiske lenker/canonical; denne runden verifiserer publisert navigasjon og upublisert redigeringsmodell.
