import { z } from 'astro/zod';

const nullableText = z.string().nullable();
export const proofCaseSchema = z.object({
  id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  clientName: z.string(), anonymizedLabel: nullableText, relationship: nullableText,
  dominantMetric: z.string(), before: nullableText, after: nullableText, delta: nullableText,
  period: z.object({ before: nullableText, after: nullableText, comparable: z.boolean() }).strict(),
  intervention: nullableText, source: z.string(), limitations: nullableText,
  namingPermission: z.enum(['NEEDS_PERMISSION', 'GRANTED', 'NAME_APPROVED', 'ANONYMIZED_APPROVED']),
  permissionEvidence: nullableText,
  strategyReviewStatus: z.enum(['READY_FOR_STRATEGY_REVIEW', 'CONTENT_LOCKED']),
  strategyReviewEvidence: nullableText,
  artifactStatus: z.enum(['NOT_IMPORTED', 'IMPORTED', 'VERIFIED']), artifactReferences: z.array(z.string()),
  evidenceMetrics: z.array(z.object({ metric: z.string(), before: nullableText, after: nullableText, delta: nullableText, nextPeriod: nullableText, timeframe: nullableText }).strict()),
  publicationStatus: z.enum(['EVIDENCE_ONLY', 'REVIEW_REQUIRED', 'PUBLISHABLE', 'WITHDRAWN']),
  publicationApproved: z.boolean(),
}).strict();

export type ProofCase = z.infer<typeof proofCaseSchema>;
export interface PublicProof {
  displayName: string;
  dominantMetric: string;
  before: string;
  after: string;
  delta: string | null;
  period: { before: string; after: string };
  intervention: string;
  limitations: string;
}

const slotSchema = z.object({ publicationApproved: z.literal(true), caseIds: z.array(z.string()).min(1) });
const nonempty = (value: string | null): value is string => typeof value === 'string' && value.trim().length > 0;
export const normalizeProofText = (value: string): string => value.normalize('NFKC').replace(/[\u00ad\u200b\u200c\u200d\u2060\ufeff]/gu, '').replace(/\s+/gu, ' ').trim().toLocaleLowerCase('nb-NO');

// The renderer receives only an explicitly permitted public projection. No env,
// fixture flag or default can turn an incomplete evidence record into public proof.
export function getPublishableCases(slot: unknown, records: readonly unknown[]): PublicProof[] {
  const selection = slotSchema.safeParse(slot);
  if (!selection.success) return [];
  return [...new Set(selection.data.caseIds)].flatMap(id => {
    const matches = records.filter(record => record && typeof record === 'object' && 'id' in record && record.id === id);
    if (matches.length !== 1) return [];
    const parsed = proofCaseSchema.safeParse(matches[0]);
    if (!parsed.success) return [];
    const proof = parsed.data;
    if (proof.publicationStatus !== 'PUBLISHABLE' || proof.publicationApproved !== true || proof.namingPermission === 'NEEDS_PERMISSION' || proof.period.comparable !== true || proof.strategyReviewStatus !== 'CONTENT_LOCKED') return [];
    if (![proof.clientName, proof.dominantMetric, proof.before, proof.after, proof.period.before, proof.period.after, proof.intervention, proof.source, proof.limitations, proof.permissionEvidence, proof.strategyReviewEvidence].every(nonempty)) return [];
    const displayName = proof.namingPermission === 'ANONYMIZED_APPROVED' ? proof.anonymizedLabel : proof.clientName;
    if (!nonempty(displayName)) return [];
    const publicProof: PublicProof = {
      displayName, dominantMetric: proof.dominantMetric, before: proof.before!, after: proof.after!, delta: proof.delta,
      period: { before: proof.period.before!, after: proof.period.after! }, intervention: proof.intervention!, limitations: proof.limitations!,
    };
    const publicText = [publicProof.displayName, publicProof.dominantMetric, publicProof.before, publicProof.after, publicProof.delta, publicProof.period.before, publicProof.period.after, publicProof.intervention, publicProof.limitations].filter(nonempty).map(normalizeProofText).join(' ');
    if (proof.namingPermission === 'ANONYMIZED_APPROVED' && publicText.includes(normalizeProofText(proof.clientName))) return [];
    return [publicProof];
  });
}
