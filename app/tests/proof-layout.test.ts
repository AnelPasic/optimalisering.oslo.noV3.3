import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {proofLayoutSchema,proofCaseVisualsSchema,resolveProofCaseVisual} from '../src/lib/proof-presentation.ts';
import {homepageBlockSchema} from '../src/lib/home-builder.ts';
import {getPublishableCases} from '../src/lib/proof.ts';
import {cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';
const master=JSON.parse(readFileSync('src/content/global-elements/resultater.json','utf8'));
const records=readdirSync('src/content/proof').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync('src/content/proof/'+f,'utf8')));
test('proof templates default backwards-compatibly and reject unsupported layouts',()=>{
 for(const value of [undefined,null,'','alternating'])assert.equal(proofLayoutSchema.parse(value),'alternating');
 assert.equal(proofLayoutSchema.parse('mediaCards'),'mediaCards');
 assert.equal(proofLayoutSchema.safeParse('cards').success,false);
 const old=structuredClone(master);delete old.content.layout;
 assert.equal(homepageBlockSchema.options[3].parse(old).content.layout,'alternating');
});
test('fixed optional media bindings cannot duplicate Eurotents or carry other case authority',()=>{
 assert.ok(proofCaseVisualsSchema.safeParse({nysta:{},'helt-opplagt':{positionY:50}}).success);
 for(const input of [{eurotents:{}},{unknown:{}},{nysta:{caseId:'eurotents'}},{nysta:{src:'https://example.org/private.jpg'}},{nysta:{positionY:101}}])assert.equal(proofCaseVisualsSchema.safeParse(input).success,false);
 const slot=master.content,visual=slot.featuredVisual;
 assert.deepEqual(resolveProofCaseVisual('eurotents',slot,{...slot,caseIds:[...slot.caseIds].reverse()},records),visual);
 assert.equal(resolveProofCaseVisual('nysta',slot,slot,records),undefined);
 const {caseId,...fixture}=visual; // Synthetic resolver fixture, never saved/published as Nysta media.
 const withImage={...slot,caseVisuals:{nysta:fixture}};
 assert.equal(resolveProofCaseVisual('nysta',withImage,slot,records)?.caseId,'nysta');
 assert.equal(resolveProofCaseVisual('nysta',withImage,{...slot,publicationApproved:false},records),undefined);
 assert.equal(resolveProofCaseVisual('nysta',withImage,{...slot,caseIds:['eurotents']},records),undefined);
 assert.equal(resolveProofCaseVisual('nysta',withImage,slot,records.map(r=>r.id==='nysta'?{...r,namingPermission:'ANONYMIZED_APPROVED',anonymizedLabel:'Anonym kunde'}:r)),undefined);
 for(const edit of [{},{...fixture,alt:''},{...fixture,src:'/images/proof/missing.jpg'}])assert.equal(resolveProofCaseVisual('nysta',{...slot,caseVisuals:{nysta:edit}},slot,records),undefined);
});
test('CMS select saves both templates and restores without changing OWNER media or proof projection',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8')),entry=entryForFile(cms,'app/src/content/global-elements/resultater.json');
 const content=entry.fields.find((f:any)=>f.name==='content');
 const select=content.fields.find((f:any)=>f.name==='layout');
 assert.equal(select.label,'Visningsmal');
 assert.deepEqual(select.options.values,[{name:'alternating',label:'Vekslende liste'},{name:'mediaCards',label:'Bildekort'}]);
 for(const layout of ['mediaCards','alternating']){
  const form=structuredClone(master);form.content.layout=layout;
  const saved=JSON.parse(cmsJsonSave(master,form,entry,cms));
  assert.deepEqual(saved,form);
  assert.equal(homepageBlockSchema.options[3].parse(saved).content.layout,layout);
  assert.deepEqual(getPublishableCases(saved.content,records),getPublishableCases(master.content,records));
  assert.deepEqual(saved.content.featuredVisual,master.content.featuredVisual);
 }
});
