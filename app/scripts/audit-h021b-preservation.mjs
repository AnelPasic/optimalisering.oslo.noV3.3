import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';
const baseline='fe225de646185eda79596e04800fe0ff57347bdb';
const git=args=>execFileSync('git',args,{cwd:'..',encoding:'utf8',maxBuffer:16*1024*1024}).trim();
const allowed=new Set(['.pages.yml','app/src/components/PageList.astro','app/src/lib/page-list.ts','app/tests/page-list.test.ts','app/src/content/pages/innsikt.json','app/src/content/pages/hva-bor-optimaliseres-forst.json','app/src/content/pages/male-effekt-av-optimalisering.json']);
const changed=git(['diff','--name-only',baseline]).split('\n').filter(Boolean);
assert.deepEqual(changed.filter(path=>!allowed.has(path)&&!path.startsWith('coordination/')),[]);
const json=(name,old=false)=>JSON.parse(old?git(['show',`${baseline}:app/src/content/pages/${name}.json`]):readFileSync(`src/content/pages/${name}.json`,'utf8'));
for(const [name,icon] of [['hva-bor-optimaliseres-forst','route'],['male-effekt-av-optimalisering','analytics']]){
 const current=json(name);assert.deepEqual(current.listing.visual,[{kind:'icon',icon}]);delete current.listing.visual;assert.deepEqual(current,json(name,true));
}
const old=json('innsikt',true),current=json('innsikt');assert.equal(current.sections[0].pageList.layout,'alternating');current.sections[0].pageList.layout=old.sections[0].pageList.layout;assert.deepEqual(current,old);
const before=YAML.parse(git(['show',`${baseline}:.pages.yml`])),after=YAML.parse(readFileSync('../.pages.yml','utf8'));
after.media=after.media.filter(m=>m.name!=='listingImages');delete after.components.listingVisual;
const layout=after.components.sectionPageList.fields.find(f=>f.name==='pageList').fields.find(f=>f.name==='layout');layout.options.values=layout.options.values.filter(v=>!['mediaCards','alternating'].includes(v.name));
after.content.find(e=>e.name==='insight').items.find(e=>e.name==='insightArticles').fields.find(f=>f.name==='listing').fields=after.content.find(e=>e.name==='insight').items.find(e=>e.name==='insightArticles').fields.find(f=>f.name==='listing').fields.filter(f=>f.name!=='visual');
assert.deepEqual(after,before);
const protectedPaths=git(['ls-tree','-r','--name-only',baseline]).split('\n').filter(path=>!allowed.has(path)&&!path.startsWith('coordination/'));
execFileSync('git',['diff','--exit-code',baseline,'--',...protectedPaths],{cwd:'..',stdio:'pipe',maxBuffer:16*1024*1024});
writeFileSync('../coordination/evidence/h021b/preservation.json',JSON.stringify({baseline,protectedBlobs:protectedPaths.length,protectedPaths,articleBodyH1SEOCopyAuthorityExact:true,indexOnlyLayoutChanged:true,ownerTitleSortPreserved:true,existingCMSConfigExact:true,readOnlyInputsExact:true},null,2)+'\n');
console.log(`H-021B preservation PASS: ${protectedPaths.length} protected source blobs; exact article copy/H1/SEO/authority, OWNER title sort and existing CMS models.`);
