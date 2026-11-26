import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import * as pageList from '../src/lib/page-list.ts';
import { cmsJsonSave, entryForFile, resolveField, assertPreservedContent } from './helpers/pages-cms-json.ts';
import { loadPageFile, pageFilePaths } from './helpers/page-sources.ts';

const names = pageFilePaths();
const first = 'innsikt/fixture-first';
const second = 'innsikt/fixture-second';
const norwegian = new Intl.Collator('nb');
// Visuals and card decoration have separate coverage.
const resolveTextList = (settings: unknown, records: readonly pageList.ListPage[]) =>
  pageList.resolvePageList(settings, records).map(({slug, title, summary, label, href}) => ({slug, title, summary, label, href}));
const config=(edit:any={})=>({mode:'automatic',sort:'editorial',limit:6,layout:'cards',selected:[],excluded:[],...edit});
const article = (slug: string, listing: pageList.ListPage['listing'] = {}): pageList.ListPage => ({
  slug, kind: 'article', title: 'Tittel fra artikkelen', intro: 'Ingress fra artikkelen', listing,
});
const third=(edit: pageList.ListPage['listing']={})=>article('innsikt/tredje',{title:'Åpen guide',summary:'Tredje sammendrag',order:30,visible:true,...edit});
const fixtures = [
  article(first, {title: 'Første guide', summary: 'Første sammendrag', label: 'Åpne første guide', order: 10}),
  article(second, {title: 'Andre guide', summary: 'Andre sammendrag', label: 'Åpne andre guide', order: 20}),
];
const expected = [
  {slug: first, title: 'Første guide', summary: 'Første sammendrag', label: 'Åpne første guide', href: `/${first}/`},
  {slug: second, title: 'Andre guide', summary: 'Andre sammendrag', label: 'Åpne andre guide', href: `/${second}/`},
];
const sourceText = (page: ReturnType<typeof pageSchema.parse>) => ({
  slug: page.slug,
  title: page.listing?.title ?? page.title,
  summary: page.listing?.summary ?? page.intro,
  label: page.listing?.label ?? 'Les mer',
  href: `/${page.slug}/`,
});

test('automatic article discovery uses current CMS visibility, order and card text', () => {
  const overview = loadPageFile('innsikt.json');
  const section = overview.sections.find((row: any) => row.id === 'guider');
  assert.equal(section?._block, 'pageList');
  assert.equal(section.items, undefined);
  const settings = pageList.pageListSchema.parse(section.pageList);
  for (const key of ['title','summary','href','visual','src','icon']) assert.ok(!(key in section.pageList));

  const pages = names.map(name => pageSchema.parse(loadPageFile(name)));
  const excluded = new Set(settings.excluded.map(row => row.slug));
  const articles = pages.filter(page => page.kind === 'article' && page.slug.startsWith('innsikt/') &&
    page.listing?.visible !== false && !excluded.has(page.slug));
  articles.sort((a, b) => {
    if (settings.sort === 'editorial') {
      const byOrder = (a.listing?.order ?? Infinity) - (b.listing?.order ?? Infinity);
      if (byOrder) return byOrder;
    }
    return norwegian.compare(sourceText(a).title, sourceText(b).title) || norwegian.compare(a.slug, b.slug);
  });
  assert.deepEqual(
    resolveTextList({...settings, mode: 'automatic', source: 'articles'}, pages),
    articles.slice(0, settings.limit).map(sourceText),
  );
  assert.deepEqual(resolveTextList(config(), [...fixtures].reverse()), expected);
});
test('synthetic article is discovered without overview edits; hidden/index/service/utility records are omitted',()=>{
  const withThird = resolveTextList(config(), [...fixtures, third()]);
  assert.deepEqual(withThird.map(item => item.slug), [first, second, 'innsikt/tredje']);
  for(const record of [third({visible:false}),{...third(),kind:'service'},{...third(),kind:'utility'},{...third(),slug:'innsikt'},{...third(),slug:'elsewhere/article'}]){
    assert.deepEqual(resolveTextList(config(),[...fixtures,record]),expected);
  }
});
test('editorial sort puts unordered last and breaks ties by Norwegian title then slug; title sort is deterministic',()=>{
  const records=[third({order:undefined,title:'Åpen'}),{...third({order:10,title:'Ærlig'}),slug:'innsikt/a'},{...third({order:10,title:'Ærlig'}),slug:'innsikt/b'},third({order:20,title:'Øvelse'})];
  records[0].slug='innsikt/u';records[3].slug='innsikt/o';
  assert.deepEqual(resolveTextList(config(),records).map(p=>p.slug),['innsikt/a','innsikt/b','innsikt/o','innsikt/u']);
  assert.deepEqual(resolveTextList(config({sort:'title'}),records).map(p=>p.title),['Ærlig','Ærlig','Øvelse','Åpen']);
});
test('exclusion precedes automatic limit; manual row order and count are authoritative',()=>{
  assert.deepEqual(resolveTextList(config({excluded:[{slug:first}],limit:1}),[...fixtures,third()]),[expected[1]]);
  const manual=config({mode:'manual',selected:[{slug:second},{slug:first}],excluded:[{slug:second}],limit:1});
  assert.deepEqual(resolveTextList(manual,fixtures),[expected[1],expected[0]]);
  assert.deepEqual(resolveTextList(config({mode:'manual'}),fixtures),[]);
  const records=fixtures.map(p=>p.slug===first?{...p,listing:{...p.listing,visible:false}}:p);
  assert.deepEqual(resolveTextList(manual,records),[expected[1]]);
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
  const overview=loadPageFile('innsikt.json');
  const exampleArticle = {...overview, slug: first, kind: 'article', sections: [], listing: {}};
  assert.equal(pageSchema.safeParse(exampleArticle).success, true);
  for(const listing of [{order:1.5},{visible:'false'}])assert.equal(pageSchema.safeParse({...exampleArticle, listing}).success,false);
  overview.sections.find((row: any) => row.id === 'guider').pageList=config({query:'*'});assert.equal(pageSchema.safeParse(overview).success,false);
  const home=loadPageFile('home.json');home.sections[0]={...home.sections[0],_block:'pageList',pageList:config()};assert.equal(pageSchema.safeParse(home).success,false);
});
test('missing or non-article manual references fail build explicitly; invalid configs never produce fake cards',()=>{
  assert.throws(()=>resolveTextList(config({mode:'manual',selected:[{slug:'innsikt/missing'}]}),fixtures),/missing|missing.*article/i);
  assert.throws(()=>resolveTextList(config({mode:'manual',selected:[{slug:first}]}),fixtures.map(p=>p.slug===first?{...p,kind:'service'}:p)),/article/i);
  assert.throws(()=>resolveTextList(config({mode:'manual',selected:[{slug:'synlighet'}]}),fixtures));
});
test('CMS editor has unique file ownership and article-only reference rows; save/reorder/restore preserves content',()=>{
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  const overview=loadPageFile('innsikt.json'),entry=entryForFile(cms,'app/src/content/pages/innsikt.json');
  assert.equal(entry.type,'file');
  const articles=cms.content.find((row:any)=>row.name==='insight').items.find((row:any)=>row.name==='insightArticles');
  assert.equal(articles.type,'collection');
  assert.equal(articles.path,'app/src/content/pages/managed-articles');
  const section=resolveField(entry.fields.find((f:any)=>f.name==='sections').blocks.find((b:any)=>b.name==='pageList'),cms.components);
  const fields=section.fields.find((f:any)=>f.name==='pageList').fields;
  for(const name of ['selected','excluded']){
    const rows=fields.find((f:any)=>f.name===name);assert.ok(rows.list);
    const reference=resolveField(rows.fields[0],cms.components);
    assert.equal(reference.type,'reference');assert.equal(reference.options.collection,'insightArticles');assert.equal(reference.options.value,'{fields.slug}');assert.ok(!reference.options.multiple);
  }
  const form=structuredClone(overview);
  form.sections.find((row: any) => row.id === 'guider').pageList=config({mode:'manual',layout:'compact',selected:[{slug:second},{slug:first}]});
  const saved=JSON.parse(cmsJsonSave(overview,form,entry,cms));assertPreservedContent(form,saved);
  const savedSection = pageSchema.parse(saved).sections.find(row => row.id === 'guider');
  assert.deepEqual(resolveTextList(savedSection?.pageList,fixtures),[expected[1],expected[0]]);
  const restored=JSON.parse(cmsJsonSave(saved,structuredClone(overview),entry,cms));assertPreservedContent(overview,restored);
  assert.deepEqual(pageSchema.parse(restored),pageSchema.parse(overview));
  for(const name of names.filter(name => name.startsWith('managed-articles/'))){
    assert.equal(entryForFile(cms, `app/src/content/pages/${name}`), articles, name);
    const original=loadPageFile(name),edited=structuredClone(original);
    assert.equal(original.kind, 'article', name);
    edited.listing = {...edited.listing, title: 'Endret listetittel'};
    assertPreservedContent(edited,JSON.parse(cmsJsonSave(original,edited,articles,cms)));
  }
});
