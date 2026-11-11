/**
 * Bransjereferanser hentet fra samtalen «Konverteringsrater for bransjer» (25.10.2026).
 * Oppdatert Shopify-total fra 1,4 til 1,3 % etter Littledata november 2026.
 *
 * Viktig: typical er publiserte US-benchmarks/medianer (annonser eller Shopify).
 * lowBelow og targetLow/targetHigh er VEILEDENDE interne arbeidsgrenser og
 * målscenarioer fra samtalen, ikke målte persentiler og aldri prognoser.
 * Målet på tjenestesiden er henvendelse fra søkeannonseklikk; nettbutikk er kjøp/økt.
 */
export type RateChannel = 'shopify' | 'search';
export interface ConversionBenchmark {
  id: string;
  name: string;
  channel: RateChannel;
  lowBelow: number;
  typical: number;
  targetLow: number;
  targetHigh: number;
  source: 'littledata' | 'home2025' | 'search2026' | 'health2026';
  proxy?: string;
}

export const conversionRateSources = {
  littledata: {
    label: 'Littledata: Shopify-benchmarks, november 2026',
    url: 'https://www.littledata.io/ecommerce-conversion-rate',
    note: 'Median per butikk, kjøp per GA4-økt. Må ikke sammenlignes direkte med søkeannonser.'
  },
  home2025: {
    label: 'LocaliQ: Home services search advertising, 2025',
    url: 'https://localiq.com/blog/home-services-search-advertising-benchmarks/',
    note: 'USA, konverteringer per søkeannonseklikk. Bransjespesifikke medianer.'
  },
  search2026: {
    label: 'LocaliQ / WordStream: Search advertising benchmarks, 2026',
    url: 'https://www.wordstream.com/blog/2026-google-ads-benchmarks',
    note: 'USA, Google/Microsoft søkeannonser. Bredere bransjekategorier, ikke nødvendigvis kun skjema.'
  },
  health2026: {
    label: 'LocaliQ: Healthcare search advertising benchmarks, januar 2026',
    url: 'https://localiq.com/blog/healthcare-search-advertising-benchmarks/',
    note: 'USA, søkeannonser. Undergrupper for helse- og skjønnhetsbehandlinger.'
  }
} as const;

export const conversionBenchmarks: readonly ConversionBenchmark[] = [
  { id: 'nettbutikk', name: 'Nettbutikk generelt', channel: 'shopify', lowBelow: 0.5, typical: 1.3, targetLow: 2.7, targetHigh: 3.6, source: 'littledata' },
  { id: 'klaer', name: 'Klær og mote', channel: 'shopify', lowBelow: 0.6, typical: 1.1, targetLow: 2.0, targetHigh: 2.6, source: 'littledata' },
  { id: 'rorlegger', name: 'Rørlegger', channel: 'search', lowBelow: 4, typical: 7.6, targetLow: 11, targetHigh: 15, source: 'home2025' },
  { id: 'elektriker', name: 'Elektriker', channel: 'search', lowBelow: 5, typical: 9.1, targetLow: 14, targetHigh: 18, source: 'home2025' },
  { id: 'tannlege', name: 'Tannlege', channel: 'search', lowBelow: 6, typical: 10.7, targetLow: 16, targetHigh: 20, source: 'search2026' },
  { id: 'plastikkirurgi', name: 'Plastikkirurgi', channel: 'search', lowBelow: 5, typical: 8.5, targetLow: 13, targetHigh: 17, source: 'health2026' },
  { id: 'advokat', name: 'Advokat', channel: 'search', lowBelow: 3, typical: 5.6, targetLow: 8, targetHigh: 11, source: 'search2026' },
  { id: 'renhold', name: 'Renhold', channel: 'search', lowBelow: 9, typical: 17.7, targetLow: 25, targetHigh: 30, source: 'home2025', proxy: 'Undersøkelsen gjelder hovedsakelig privat rengjøring, ikke alle former for næringsrenhold.' },
  { id: 'bygg', name: 'Bygg og entreprenør', channel: 'search', lowBelow: 2, typical: 2.6, targetLow: 4, targetHigh: 6, source: 'home2025' },
  { id: 'trafikkskole', name: 'Trafikkskole', channel: 'search', lowBelow: 7, typical: 13.1, targetLow: 19, targetHigh: 24, source: 'search2026', proxy: 'Utdanning og undervisning generelt, ikke et eget trafikkskoleutvalg.' },
  { id: 'kantine', name: 'Kantine og B2B-catering', channel: 'search', lowBelow: 3, typical: 4.9, targetLow: 7, targetHigh: 10, source: 'search2026', proxy: 'Bredere kategori for bedriftstjenester – ikke et eget kantineutvalg.' },
  { id: 'byra', name: 'Web- og markedsføringsbyrå', channel: 'search', lowBelow: 3, typical: 4.9, targetLow: 7, targetHigh: 10, source: 'search2026', proxy: 'Bredere kategori for bedriftstjenester – ikke kun byråer.' }
];

export const rateNumber = (value: number): string => new Intl.NumberFormat('nb-NO', {maximumFractionDigits: 1}).format(value);
export const rateText = (value: number): string => rateNumber(value) + ' %';
export const formatLowRate = (benchmark: ConversionBenchmark): string => '< ' + rateText(benchmark.lowBelow);
export const formatTargetRate = (benchmark: ConversionBenchmark): string => rateNumber(benchmark.targetLow) + '–' + rateText(benchmark.targetHigh);
export const channelName = (channel: RateChannel): string => channel === 'shopify' ? 'Nettbutikk · kjøp per økt' : 'Søkeannonser · henvendelser/konverteringer per klikk';

for (const entry of conversionBenchmarks) {
  if (!entry.id || entry.lowBelow >= entry.typical || entry.typical >= entry.targetLow || entry.targetLow > entry.targetHigh || entry.targetHigh > 100) {
    throw new Error('Ugyldig konverteringsreferanse: ' + entry.id);
  }
}
