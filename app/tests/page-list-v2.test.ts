import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { loadPageFile, pageFilePaths } from './helpers/page-sources.ts';
import { pageListSchema, resolvePageList } from '../src/lib/page-list.ts';
import { pageSchema } from '../src/lib/content-schema.ts';
import { getHomepageBlocks } from '../src/lib/home-builder.ts';
import { cmsJsonSave, entryForFile, resolveField } from './helpers/pages-cms-json.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const names=pageFilePaths();
const raw=names.map(loadPageFile);
const proofs=readdirSync('src/content/proof').filter(name=>name.endsWith('.json')).map(name=>JSON.parse(readFileSync('src/content/proof/'+name,'utf8')));
const config=(edit:any={})=>({mode:'automatic',sort:'editorial',limit:6,layout:'cards',selected:[],excluded:[],...edit});

test('Pinned PageList choices use canonical slugs and current titles; every page editor exposes the selector',()=>{
 assert.ok(names.length>0,'page sources must exist');
 const choices: { name: string; label: string }[] = cms.components.pageListPageReference.options.values;
 assert.ok(choices.length>0,'the fixed selector must offer choices');
 assert.equal(new Set(choices.map(choice=>choice.name)).size,choices.length,'pinned slugs must be unique');
 const pagesBySlug = new Map(raw.map(page=>[page.slug,page]));
 for(const {name, label} of choices){
  assert.equal(pageListSchema.safeParse(config({mode:'manual',entries:[{_block:'page',slug:name}]})).success,true,name);
  assert.ok(label.trim(),name);
  // The fixed list survives native Add/Delete. Existing source pages own their display title.
  const page = pagesBySlug.get(name);
  if(page) assert.equal(label,page.listing?.title||page.seo?.title||page.title||page.slug,name);
 }
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

test('legacy settings discover articles; automatic pages discover current sources independently of the picker',()=>{
 const article={slug:'innsikt/test-artikkel',kind:'article',title:'Artikkel',intro:'Ingress'};
 const newer={slug:'ny-side',kind:'service',title:'Ny side',intro:'Nylig skrevet',listing:{order:0,visible:true}};
 assert.deepEqual(resolvePageList(config(),[newer,article]).map(page=>page.slug),[article.slug]);
 assert.deepEqual(resolvePageList(config({source:'pages',limit:1}),[article,newer]).map(page=>page.slug),[newer.slug]);

 const sources = raw.map(page=>pageSchema.parse(page));
 const title = (page: typeof sources[number]) => page.listing?.title ?? page.title;
 const eligible = sources.filter(page=>page.kind!=='home' && page.listing?.visible!==false);
 eligible.sort((a,b)=>title(a).localeCompare(title(b),'nb')||a.slug.localeCompare(b.slug,'nb'));
 const settings = config({source:'pages',sort:'title',limit:9});
 assert.deepEqual(
  resolvePageList(settings,sources).map(({slug,href})=>({slug,href})),
  eligible.slice(0,settings.limit).map(({slug})=>({slug,href:`/${slug}/`})),
 );
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
 assert.equal(actual[3]?.title,proofs.find(record=>record.id==='nysta')?.clientName,'CMS-edited case name is the source of truth');
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
