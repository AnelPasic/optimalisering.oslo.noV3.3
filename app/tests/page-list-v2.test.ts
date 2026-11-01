import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { pageListSchema, resolvePageList } from '../src/lib/page-list.ts';
import { pageSchema } from '../src/lib/content-schema.ts';
import { getHomepageBlocks } from '../src/lib/home-builder.ts';
import { cmsJsonSave, entryForFile, resolveField } from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const names=[...readdirSync('src/content/pages').filter(name=>name.endsWith('.json')),...readdirSync('src/content/pages/managed-articles').filter(name=>name.endsWith('.json')).map(name=>'managed-articles/'+name)].sort();
const raw=names.map(name=>JSON.parse(readFileSync('src/content/pages/'+name,'utf8')));
const proofs=readdirSync('src/content/proof').filter(name=>name.endsWith('.json')).map(name=>JSON.parse(readFileSync('src/content/proof/'+name,'utf8')));
const config=(edit:any={})=>({mode:'automatic',sort:'editorial',limit:6,layout:'cards',selected:[],excluded:[],...edit});
const entry=(slug:string)=>raw.find(page=>page.slug===slug)!;

test('PageList selector uses canonical source page slugs and is available in every page editor',()=>{
 assert.equal(names.length,16);
 const values=cms.components.pageListPageReference.options.values.map((v:any)=>v.name).sort();
 assert.deepEqual(values,raw.map(p=>p.slug).sort());
 for(const name of names) {
  const item=entryForFile(cms,'app/src/content/pages/'+name);
  const sections=item.fields.find((field:any)=>field.name==='sections');
  assert.ok(sections.blocks.some((block:any)=>block.name==='pageList'),name);
  const pageList=resolveField(sections.blocks.find((block:any)=>block.name==='pageList'),cms.components);
  const settings=pageList.fields.find((field:any)=>field.name==='pageList').fields;
  assert.deepEqual(settings.find((f:any)=>f.name==='source').options.values.map((v:any)=>v.name),['articles','pages','cases'],name);
  assert.equal(settings.find((f:any)=>f.name==='source').options.values.find((v:any)=>v.name==='pages').label,'Tjenester og produkter',name);
  const entries=settings.find((f:any)=>f.name==='entries');
  assert.equal(entries.list.max,9,name);
  assert.deepEqual(entries.blocks.map((b:any)=>b.name),['page','case','url'],name);
  assert.ok(entries.blocks.every((b:any)=>b.type==='object'),name);
 }
});

test('existing automatic article PageList stays backward compatible; automatic pages discover the website',()=>{
 const overview=entry('innsikt').sections.find((s:any)=>s._block==='pageList');
 assert.ok(resolvePageList(overview.pageList,raw).some(p=>p.slug==='innsikt/google-bedriftsprofil'));
 assert.ok(resolvePageList(overview.pageList,raw).some(p=>p.slug==='innsikt/hva-bor-optimaliseres-forst'));
 const pages=resolvePageList(config({source:'pages',limit:9}),raw);
 assert.equal(pages.length,9);
 assert.ok(pages.every(p=>p.href?.startsWith('/') && p.slug!=='home'));
 assert.ok(pages.some(p=>p.slug==='priser'||p.slug==='kontakt'));
 const newer={slug:'ny-side',kind:'service',title:'Ny side',intro:'Nylig skrevet',listing:{order:0,visible:true}};
 assert.equal(resolvePageList(config({source:'pages',limit:1}),[...raw,newer])[0].slug,'ny-side');
});

test('manual PageList allows ordered pages, direct root link, external URLs and publishable cases',()=>{
 const rows=[
  {_block:'page',slug:'priser'},
  {_block:'url',href:'https://example.no/tilbud?x=1',title:'Ekstern side',summary:'Nyttig lenke',label:'Besøk'},
  {_block:'page',slug:'home'},
  {_block:'case',caseId:'nysta'},
 ];
 const actual=resolvePageList(config({mode:'manual',entries:rows,source:'pages'}),raw,'public',proofs);
 assert.deepEqual(actual.slice(0,3).map(x=>x.href),['/priser/','https://example.no/tilbud?x=1','/']);
 assert.equal(actual[1].title,'Ekstern side');
 assert.equal(actual[3]?.slug,'case:nysta');
 assert.equal(actual[3]?.href,undefined,'case record has no invented public route');
 assert.equal(actual[3]?.title,'Nysta');
 assert.equal(pageListSchema.safeParse(config({mode:'manual',entries:rows})).success,true);
});

test('automatic case lists filter unpublished, unapproved and unpermitted proof data',()=>{
 const cases=resolvePageList(config({source:'cases'}),raw,'public',proofs);
 assert.ok(cases.length>=1);
 assert.ok(cases.every(x=>x.href===undefined));
 const nameOnly={...proofs.find(x=>x.id==='nysta'),publicationApproved:false};
 assert.ok(!resolvePageList(config({source:'cases'}),raw,'public',[nameOnly]).length);
 const forced=resolvePageList(config({mode:'manual',entries:[{_block:'case',caseId:'nysta'}]}),raw,'public',[nameOnly]);
 assert.deepEqual(forced,[]);
});

test('rejects unsafe URL protocols, duplicates, unknown page slugs and too many manual entries',()=>{
 for(const url of ['javascript:alert(1)','data:text/html,abc','//evil.test','https://user:pass@example.no','/a\\b','mailto:a@b.no','https://example.no/\nfoo']){
  assert.equal(pageListSchema.safeParse(config({mode:'manual',entries:[{_block:'url',href:url,title:'Test'}]})).success,false,url);
 }
 const a={_block:'page',slug:'priser'};
 for(const entries of [[a,a],Array.from({length:10},(_,i)=>({_block:'url',href:'/p'+i+'/',title:'T'+i}))]){
  assert.equal(pageListSchema.safeParse(config({mode:'manual',entries})).success,false);
 }
 assert.throws(()=>resolvePageList(config({mode:'manual',entries:[{_block:'page',slug:'ukjent'}]}),raw),/missing page/);
});

test('PageList can be created, reordered and saved without changing page-owned or global content',()=>{
 for(const name of ['home.json','synlighet.json','priser.json','om.json','managed-articles/innsikt-hva-bor-optimaliseres-forst.json']){
  const original=JSON.parse(readFileSync('src/content/pages/'+name,'utf8'));
  const copy=structuredClone(original);
  const next={_block:'pageList',id:'relatert-'+name.replace('.json','').replaceAll('/','-'),heading:'Se også',pageList:config({mode:'manual',source:'pages',entries:[{_block:'page',slug:'priser'},{_block:'url',href:'/kontakt/',title:'Kontakt oss'}]})};
  copy.sections.splice(1,0,next);
  const editor=entryForFile(cms,'app/src/content/pages/'+name);
  const saved=JSON.parse(cmsJsonSave(original,copy,editor,cms));
  // The CMS intentionally strips empty legacy arrays (selected/excluded),
  // while the schema restores the exact same semantic defaults.
  const expected=pageSchema.parse(copy);
  const actual=pageSchema.parse(saved);
  assert.deepEqual(actual.sections,expected.sections,name);
  assert.deepEqual(saved.hero,original.hero,name);
  assert.deepEqual(saved.seo,original.seo,name);
  assert.ok(pageSchema.safeParse(saved).success,name);
  if(name==='home.json') assert.ok(getHomepageBlocks(pageSchema.parse(saved)).some(b=>b._block==='pageList'));
 }
});
