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

/** A page may feature only a case already selected in the approved global proof master. */
export function getSelectedHeroProof(caseId:unknown, master:unknown, records:readonly unknown[]){
 if(typeof caseId!=='string'||!master||typeof master!=='object')return undefined;
 const slot=master as {publicationApproved?:unknown;caseIds?:unknown};
 if(slot.publicationApproved!==true||!Array.isArray(slot.caseIds)||!slot.caseIds.includes(caseId))return undefined;
 return getHeroProof({...slot,caseIds:[caseId]},records);
}
