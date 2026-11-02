import { z } from 'astro/zod';
import { getPublishableCases } from './proof.ts';

const caseId=z.string().regex(/^[a-z0-9][a-z0-9-]*$/);

/** Only selection/layout belong to each section. Evidence lives in the global registry. */
export const proofListSchema=z.object({
  layout:z.enum(['inherit','mediaCards','alternating']).default('inherit'),
  entries:z.array(z.object({caseId}).strict()).max(12).default([]),
}).strict().superRefine((value,ctx)=>{
  const seen=new Set<string>();
  value.entries.forEach((entry,index)=>{
    if(seen.has(entry.caseId))ctx.addIssue({code:'custom',path:['entries',index,'caseId'],message:'Kundecasen er allerede valgt'});
    seen.add(entry.caseId);
  });
});
export type ProofListConfig=z.infer<typeof proofListSchema>;
export const proofListAnchorSchema=z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).refine(
  id=>!['resultater','behov','regneeksempel','sjekk','priser','mekanisme','passer','sporsmal','skjema','main','mobile-menu','service-hero','service-priser'].includes(id)&&
    !/^(?:package-home-|calc-|scenario-|term-|header-)/.test(id),
  'Velg et unikt proof-anker, for eksempel proof-kunder',
);

export function resolveProofListContent<T extends {
  publicationApproved:boolean;
  caseIds:string[];
  layout?:'mediaCards'|'alternating';
}>(master:T, input:unknown, records:readonly unknown[]):T{
  const config=proofListSchema.parse(input);
  const caseIds=config.entries.length?config.entries.map(x=>x.caseId):master.caseIds;
  // Local choices may restrict evidence, never override the global approval gate.
  if(caseIds.length && (!master.publicationApproved ||
    caseIds.some(id=>getPublishableCases({...master,caseIds:[id]},records).length!==1))){
    throw new Error('ProofList kan bare vise godkjente, publiserbare kundecaser fra global master');
  }
  return {...master,caseIds,layout:config.layout==='inherit'?master.layout:config.layout};
}
