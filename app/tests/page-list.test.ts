import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import * as pageList from '../src/lib/page-list.ts';
import { cmsJsonSave, entryForFile, resolveField, assertPreservedContent } from './helpers/pages-cms-json.ts';

const articleNames=new Set(['google-bedriftsprofil','hva-bor-optimaliseres-forst','male-effekt-av-optimalisering']);
const load=(name:string)=>JSON.parse(readFileSync(articleNames.has(name)?`src/content/pages/managed-articles/innsikt-${name}.json`:`src/content/pages/${name}.json`,'utf8'));
const pages=()=>[...readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(f=>load(f.slice(0,-5))),...readdirSync('src/content/pages/managed-articles').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync('src/content/pages/managed-articles/'+f,'utf8')))];
const first='innsikt/hva-bor-optimaliseres-forst',second='innsikt/male-effekt-av-optimalisering';
// H-021 checks text/query contracts; H-021B separately verifies editable visuals.
const resolveTextList=(config:unknown,records:any[])=>pageList.resolvePageList(config,records).map(({visual,...item})=>item);
const config=(edit:any={})=>({mode:'automatic',sort:'editorial',limit:6,layout:'cards',selected:[],excluded:[],...edit});
const third=(edit:any={})=>({...load('hva-bor-optimaliseres-forst'),slug:'innsikt/tredje',title:'Ærlig tittel',intro:'Tredje ingress',listing:{title:'Åpen guide',summary:'Tredje sammendrag',order:30,visible:true,...edit}});
// Independent source oracle: assert the current CMS listing, not old article copy.
const collator=new Intl.Collator('nb',{usage:'sort',sensitivity:'variant'});
const expected=pages().filter(p=>p.kind==='article'&&p.slug.startsWith('innsikt/')&&p.listing?.visible!==false)
 .sort((a,b)=>(a.listing?.order??Infinity)===(b.listing?.order??Infinity)?collator.compare(a.listing?.title||a.title,b.listing?.title||b.title)||collator.compare(a.slug,b.slug):(a.listing?.order??Infinity)-(b.listing?.order??Infinity))
 .map(p=>({slug:p.slug,title:p.listing?.title||p.title,summary:p.listing?.summary||p.intro,label:p.listing?.label||'Les mer',href:'/'+p.slug+'/'}));
const expectedBySlug=(slug:string)=>expected.find(p=>p.slug===slug)!;

test('automatic collection discovery preserves exact migrated titles, summaries, labels, URLs and order',()=>{
  assert.deepEqual(resolveTextList(config(),pages()),expected.slice(0,6));
  const overview=load('innsikt'),section=overview.sections[0];
  assert.equal(section._block,'pageList');assert.equal(section.id,'guider');assert.equal(section.items,undefined);
  assert.equal(pageList.pageListSchema.safeParse(section.pageList).success,true);
  for(const key of ['title','summary','href','visual','src','icon'])assert.ok(!(key in section.pageList));
});
test('synthetic article is discovered without overview edits; hidden/index/service/utility records are omitted',()=>{
  const fixture=pages().filter(p=>p.slug===first||p.slug===second);
  assert.ok(resolveTextList(config(),[...fixture,third()]).some(p=>p.slug==='innsikt/tredje'));
  assert.equal(resolveTextList(config(),[...fixture,third()]).length,3);
  for(const record of [third({visible:false}),{...third(),kind:'service'},{...third(),kind:'utility'},{...third(),slug:'innsikt'},{...third(),slug:'elsewhere/article'}]){
    assert.deepEqual(resolveTextList(config(),[...fixture,record]),expected.filter(p=>p.slug===first||p.slug===second));
  }
});
test('editorial sort puts unordered last and breaks ties by Norwegian title then slug; title sort is deterministic',()=>{
  const records=[third({order:undefined,title:'Åpen'}),{...third({order:10,title:'Ærlig'}),slug:'innsikt/a'},{...third({order:10,title:'Ærlig'}),slug:'innsikt/b'},third({order:20,title:'Øvelse'})];
  records[0].slug='innsikt/u';records[3].slug='innsikt/o';
  assert.deepEqual(resolveTextList(config(),records).map(p=>p.slug),['innsikt/a','innsikt/b','innsikt/o','innsikt/u']);
  assert.deepEqual(resolveTextList(config({sort:'title'}),records).map(p=>p.title),['Ærlig','Ærlig','Øvelse','Åpen']);
});
test('exclusion precedes automatic limit; manual row order and count are authoritative',()=>{
  assert.equal(resolveTextList(config({excluded:[{slug:first}],limit:1}),[...pages().filter(p=>p.slug===first||p.slug===second),third({order:999})])[0].slug,second);
  const manual=config({mode:'manual',selected:[{slug:second},{slug:first}],excluded:[{slug:second}],limit:1});
  assert.deepEqual(resolveTextList(manual,pages()),[expectedBySlug(second),expectedBySlug(first)]);
  assert.deepEqual(resolveTextList(config({mode:'manual'}),pages()),[]);
  const records=pages().map(p=>p.slug===first?{...p,listing:{...p.listing,visible:false}}:p);
  assert.deepEqual(resolveTextList(manual,records),[expectedBySlug(second)]);
});
test('blank optional metadata defaults safely and href normalizes slashes',()=>{
  const record=third({title:'',summary:' ',label:''});record.slug='/innsikt/tredje/';
  assert.deepEqual(resolveTextList(config(),[record]),[{slug:'innsikt/tredje',title:record.title,summary:record.intro,label:'Les mer',href:'/innsikt/tredje/'}]);
  assert.equal(pageList.listingSchema.parse({}).visible,true);
});
test('schema rejects unknown queries/enums/limits/outside or duplicate references and source duplication',()=>{
  for(const edit of [{mode:'anything'},{sort:'mtime'},{layout:'html'},{query:'*'},{limit:0},{limit:13},{limit:1.5},{selected:[{slug:'synlighet'}]},{selected:[{slug:first},{slug:first}]},{selected:[{slug:first,title:'copy'}]}]){
    assert.equal(pageList.pageListSchema.safeParse(config(edit)).success,false,JSON.stringify(edit));
  }
  for(const edit of [{order:1.5},{visible:'false'}])assert.equal(pageSchema.safeParse(third(edit)).success,false);
  const overview=load('innsikt');overview.sections[0].pageList=config({query:'*'});assert.equal(pageSchema.safeParse(overview).success,false);
  const home=load('home');home.sections[0]={...home.sections[0],_block:'pageList',pageList:config()};assert.equal(pageSchema.safeParse(home).success,false);
});
test('missing or non-article manual references fail build explicitly; invalid configs never produce fake cards',()=>{
  assert.throws(()=>resolveTextList(config({mode:'manual',selected:[{slug:'innsikt/missing'}]}),pages()),/missing|missing.*article/i);
  assert.throws(()=>resolveTextList(config({mode:'manual',selected:[{slug:first}]}),pages().map(p=>p.slug===first?{...p,kind:'service'}:p)),/article/i);
  assert.throws(()=>resolveTextList(config({mode:'manual',selected:[{slug:'synlighet'}]}),pages()));
});
test('CMS editor has unique file ownership and article-only reference rows; save/reorder/restore preserves content',()=>{
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  const overview=load('innsikt'),entry=entryForFile(cms,'app/src/content/pages/innsikt.json');
  assert.equal(entry.type,'file');
  const articles=entryForFile(cms,'app/src/content/pages/managed-articles/innsikt-hva-bor-optimaliseres-forst.json');
  assert.equal(articles.name,'insightArticles');
  const eligible=readdirSync('src/content/pages/managed-articles').filter(f=>f.endsWith('.json'));
  assert.ok(eligible.length>=3);
  for(const file of eligible){const path='app/src/content/pages/managed-articles/'+file;const record=JSON.parse(readFileSync('src/content/pages/managed-articles/'+file,'utf8'));assert.equal(entryForFile(cms,path)?.name,'insightArticles',file);assert.equal(record.kind,'article',file);assert.equal(file,'innsikt-'+record.slug.slice('innsikt/'.length).replaceAll('/','-')+'.json',file);}
  const section=resolveField(entry.fields.find((f:any)=>f.name==='sections').blocks.find((b:any)=>b.name==='pageList'),cms.components);
  const fields=section.fields.find((f:any)=>f.name==='pageList').fields;
  for(const name of ['selected','excluded']){
    const rows=fields.find((f:any)=>f.name===name);assert.ok(rows.list);
    const reference=resolveField(rows.fields[0],cms.components);
    assert.equal(reference.type,'reference');assert.equal(reference.options.collection,'insightArticles');assert.equal(reference.options.value,'{fields.slug}');assert.ok(!reference.options.multiple);
  }
  const form=structuredClone(overview);form.sections[0].pageList=config({mode:'manual',layout:'compact',selected:[{slug:second},{slug:first}]});
  const saved=JSON.parse(cmsJsonSave(overview,form,entry,cms));assertPreservedContent(form,saved);
  assert.deepEqual(resolveTextList(pageSchema.parse(saved).sections[0].pageList!,pages()),[expectedBySlug(second),expectedBySlug(first)]);
  const restored=JSON.parse(cmsJsonSave(saved,structuredClone(overview),entry,cms));assertPreservedContent(overview,restored);
  assert.deepEqual(pageSchema.parse(restored),pageSchema.parse(overview));
  for(const name of ['hva-bor-optimaliseres-forst','male-effekt-av-optimalisering']){
    const original=load(name),edited=structuredClone(original);edited.listing.title+=' test';
    assertPreservedContent(edited,JSON.parse(cmsJsonSave(original,edited,articles,cms)));
  }
});
