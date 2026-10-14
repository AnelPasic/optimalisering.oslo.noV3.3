import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const baseline='e41154f0ea5624afbe53bb7c3db2cb811fd9f32e';
const git=args=>execFileSync('git',args,{cwd:'..',encoding:'utf8',maxBuffer:16*1024*1024}).trim();
const changed=git(['diff','--name-only',baseline]).split('\n').filter(Boolean);
const allowed=new Set(['.pages.yml','app/src/components/InsightIndexPage.astro','app/src/lib/content-schema.ts','app/src/pages/[...slug].astro','app/tests/h017b-cms.test.ts','app/tests/h019-surfaces.test.ts','app/tests/helpers/pages-cms-json.ts','app/src/content/pages/innsikt.json','app/src/content/pages/hva-bor-optimaliseres-forst.json','app/src/content/pages/male-effekt-av-optimalisering.json']);
assert.deepEqual(changed.filter(path=>!allowed.has(path)&&!path.startsWith('coordination/')),[]);
const json=(name,old=false)=>JSON.parse(old?git(['show',`${baseline}:app/src/content/pages/${name}.json`]):readFileSync(`src/content/pages/${name}.json`,'utf8'));
for(const name of ['hva-bor-optimaliseres-forst','male-effekt-av-optimalisering']){
  const current=json(name);delete current.listing;assert.deepEqual(current,json(name,true));
}
const old=json('innsikt',true),current=json('innsikt');
for(const [i,item] of old.sections[0].items.entries()){
  const article=json(item.href.split('/').filter(Boolean).at(-1));
  assert.deepEqual(article.listing,{title:item.title,summary:item.text,label:item.label,order:(i+1)*10,visible:true});
}
delete old.sections[0].items;old.sections[0]._block='pageList';old.sections[0].pageList=current.sections[0].pageList;
assert.deepEqual(current,old);
const protectedPaths=git(['ls-tree','-r','--name-only',baseline]).split('\n').filter(path=>!allowed.has(path)&&!path.startsWith('coordination/'));
execFileSync('git',['diff','--exit-code',baseline,'--',...protectedPaths],{cwd:'..',stdio:'pipe',maxBuffer:16*1024*1024});
const report={baseline,protectedBlobs:protectedPaths.length,protectedPaths,articleBodyH1SEOAuthorityExact:true,indexOnlyAuthorizedMigration:true,otherTrackedSourceExact:true,readOnlyInputsExact:true};
writeFileSync('../coordination/evidence/h021/preservation.json',JSON.stringify(report,null,2)+'\n');
console.log(`H-021 preservation PASS: ${protectedPaths.length} protected Git blobs; exact article bodies/H1/SEO/authority, index copy/order and unrelated sources.`);
