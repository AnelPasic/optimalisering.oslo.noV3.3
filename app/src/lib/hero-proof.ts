import { getPublishableCases } from './proof.ts';

// Format only the existing public projection; the registry remains the sole source.
export function getHeroProof(slot: unknown, records: readonly unknown[]) {
  const featured = getPublishableCases(slot, records)[0];
  if (!featured) return undefined;
  const [metric, ...source] = featured.dominantMetric.split(' - ');
  return {
    metric,
    comparison: `${featured.before} -> ${featured.after}`,
    support: [featured.displayName, source.join(' - ')].filter(Boolean).join(' · '),
  };
}
