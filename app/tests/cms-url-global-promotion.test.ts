import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {projectSelectedLinks,safeCmsHref} from '../src/lib/cms-link-choice.ts';
import {planPilotPromotion} from '../scripts/promote-local-section.mjs';
import {validatePilotPromotionPayload} from '../scripts/dispatch-pilot-promotion.mjs';
import {pageSchema} from '../src/lib/content-schema.ts';
import {resolvePageList} from '../src/lib/page-list.ts';
const root=resolve(new URL('../',import.meta.url).pathname);
const readPage=id=>JSON.parse(readFileSync(join(root,'src/content/pages/'+id+'.json'),'utf8'));

test('all 17 CMS page JSON sources remain build-compatible without editing their source',()=>{
 const files=readdirSync(join(root,'src/content/pages')).filter(x=>x.endsWith('.json'));
 assert.equal(files.length,17);
 for(const file of files){
  const page=readPage(file.slice(0,-5)),before=structuredClone(page);
  assert.equal(pageSchema.safeParse(page).success,true,file);
  assert.deepEqual(page,before,file);
 }
});
test('native URL selection is safe, honors selected value and leaves source object unchanged',()=>{
 const example={label:'Les mer',href:'/om/',suggestedHref:'https://example.org/path'};
 const copy=structuredClone(example);
 assert.deepEqual(projectSelectedLinks(example),{label:'Les mer',href:'https://example.org/path'});
 assert.deepEqual(example,copy);
 assert.deepEqual(projectSelectedLinks({label:'Les',href:'/om/'}),{label:'Les',href:'/om/'});
 assert.deepEqual(projectSelectedLinks({label:'Les',href:'/om/',suggestedHref:''}),{label:'Les',href:'/om/'});
 for(const bad of ['javascript:alert(1)','data:text/html,a','//another.example','https://user:password@example.org','/a\\b']){
  assert.equal(safeCmsHref(bad),false,bad);
  assert.throws(()=>projectSelectedLinks({suggestedHref:bad}),/Invalid selected CMS URL/);
 }
});
test('selected URLs pass through existing Pages CMS page schema and PageList',()=>{
 const page=readPage('om'),first=page.sections[0];
 const changed={...page,sections:[{...first,links:[{label:'Ny',href:'/om/',suggestedHref:'https://example.org'}]},...page.sections.slice(1)]};
 const out=pageSchema.parse(changed);
 assert.equal(out.sections[0].links[0].href,'https://example.org');
 assert.equal(first.links[0].href,'/synlighet/');
 const pl=resolvePageList({source:'pages',mode:'manual',sort:'editorial',limit:3,layout:'links',selected:[],excluded:[],entries:[
 {_block:'url',title:'Valgt',href:'/om/'},{_block:'url',title:'Ekstern',href:'https://example.org'}
 ]},[]);
 assert.deepEqual(pl.map(x=>x.href),['/om/','https://example.org']);
});
test('promotion copy keeps original text, paragraphs, links, options and styling intact',()=>{
 const page=readPage('om'),original=structuredClone(page);
 const x=planPilotPromotion(page,'oppgave','ny-introduksjon','Ny introduksjon','copy');
 assert.deepEqual(x.page,page);
 assert.deepEqual(page,original);
 assert.equal(x.global._block,'content');
 assert.equal(x.global.id,'ny-introduksjon');
 assert.deepEqual(x.global.body,page.sections[0].body);
 assert.deepEqual(x.global.links,page.sections[0].links);
 assert.notEqual(x.global.uid,page.sections[0].uid);
});
test('promotion replace changes exactly one placement at the same index and anchor',()=>{
 const page=readPage('om'),before=structuredClone(page);
 const x=planPilotPromotion(page,'oppgave','ny-introduksjon','Ny introduksjon','replace');
 assert.deepEqual(x.page.sections[0],{_block:'global',element:'ny-introduksjon',id:'oppgave'});
 assert.deepEqual(x.page.sections.slice(1),page.sections.slice(1));
 assert.deepEqual(page,before);
});
test('promotion rejects protected or unsupported blocks, malformed URLs and invalid IDs',()=>{
 const page=readPage('om');
 assert.throws(()=>planPilotPromotion(page,'missing','ny','Ny','copy'),/Select one/);
 assert.throws(()=>planPilotPromotion(page,'oppgave','sjekk','Sjekk','copy'),/protected/);
 assert.throws(()=>planPilotPromotion({...page,sections:[{...page.sections[0],unknown:'must-not-disappear'}]},'oppgave','ny','Ny','copy'),/Unsupported field/);
 assert.throws(()=>planPilotPromotion({...page,sections:[{...page.sections[0],links:[{label:'Oops',href:'javascript:alert(1)'}]}]},'oppgave','ny','Ny','copy'),/Unsafe link/);
});
test('action context is verified before any file creation or Git commit',()=>{
 const req={source:'pages-cms',action:{name:'promote-content-section'},repository:{owner:'AnelPasic',repo:'optimalisering.oslo.noV3.3',ref:'main',sha:'abc'},context:{type:'file',path:'app/src/content/pages/om.json'},inputs:{section_id:'oppgave',global_id:'ny-introduksjon',global_name:'Ny introduksjon',mode:'copy'}};
 assert.equal(validatePilotPromotionPayload(req,'AnelPasic/optimalisering.oslo.noV3.3','main','abc').page,'om.json');
 assert.throws(()=>validatePilotPromotionPayload(req,'AnelPasic/optimalisering.oslo.noV3.3','main','newsha'),/latest saved/);
 assert.throws(()=>validatePilotPromotionPayload({...req,context:{type:'file',path:'app/.env'}},'AnelPasic/optimalisering.oslo.noV3.3','main','abc'),/page JSON/);
});
test('generated URL and global dropdowns match source files and CMS actions exist',()=>{
 for(const name of ['sync-cms-url-options.mjs','sync-pilot-promoted.mjs']){
  const child=spawnSync(process.execPath,['scripts/'+name,'--check'],{cwd:root,encoding:'utf8'});
  assert.equal(child.status,0,child.stdout+child.stderr);
 }
 const yaml=readFileSync(join(root,'../.pages.yml'),'utf8');
 assert.match(yaml,/cmsSuggestedHref:/);
 assert.match(yaml,/promotedGlobalContent/);
 assert.match(yaml,/actions:\s*\n\s*- name: promote-content-section/);
 assert.match(yaml,/PILOT_PROMOTED_CHOICES_3_BEGIN/);
});
