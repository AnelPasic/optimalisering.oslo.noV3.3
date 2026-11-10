import test from 'node:test';
import assert from 'node:assert/strict';
import {copyFileSync,readFileSync,mkdirSync,mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import YAML from 'yaml';
import {pageFilePaths} from './helpers/page-sources.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {readSharedContent,resolveSharedContentPlacement,sharedContentSchema} from '../src/lib/shared-content.ts';
import {cmsJsonSave,entryForFile,resolveField} from './helpers/pages-cms-json.ts';
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const globalCollection=cms.content.find((x:any)=>x.name==='globalElements').items.find((x:any)=>x.name==='sharedContent');
const specimen={_block:'content',uid:randomUUID(),id:'demo-felles',name:'Global demonstrasjon',eyebrow:'Felles',heading:'Samme tekst på flere sider',body:['Avsnitt en','Avsnitt to'],headingAlign:'left',layout:'two-columns',surface:'base-200',items:[{title:'Eksempel',text:'Kortet følger med',surface:'default',boxVariant:'card'}],links:[{label:'Les mer',href:'/om/'}]};
const reference={_block:'sharedContent',entry:'demo-felles'};
test('native JSON editor and reference on all seventeen pages, no promotion',()=>{
 assert.equal(globalCollection.type,'collection');
 assert.equal(globalCollection.operations.create,true);
 assert.equal(globalCollection.operations.rename,false);
 assert.equal(globalCollection.operations.delete,false);
 assert.deepEqual(globalCollection.exclude,['README.md']);
 assert.equal(globalCollection.filename,'{fields.id}.json');
 assert.deepEqual(globalCollection.fields.map((f:any)=>f.name),['_block','uid','id','name','eyebrow','heading','headingAlign','layout','surface','buttonStyle','boxButtonStyle','body','items','links']);
 const files=pageFilePaths();
 assert.equal(files.length,17);
 for(const file of files){
  const editor=entryForFile(cms,'app/src/content/pages/'+file);
  const sections=editor.fields.find((f:any)=>f.name==='sections');
  const block=sections.blocks.find((b:any)=>b.name==='sharedContent');
  assert.ok(block,file);
  const fields=resolveField(block,cms.components).fields;
  const field=fields.find((f:any)=>f.name==='entry');
  assert.equal(field.type,'reference',file);
  assert.equal(field.options.collection,'sharedContent',file);
  assert.equal(field.options.value,'{fields.id}',file);
  const raw=JSON.parse(readFileSync('src/content/pages/'+file,'utf8'));
  const modified=structuredClone(raw);modified.sections.push(reference);
  const saved=JSON.parse(cmsJsonSave(raw,modified,editor,cms));
  assert.deepEqual(saved.sections.at(-1),reference,file);
  assert.deepEqual(saved.hero,raw.hero,file);
  assert.deepEqual(saved.faq,raw.faq,file);
 }
});
test('global section content keeps identity and rejects unsafe or forged IDs',()=>{
 assert.ok(sharedContentSchema.safeParse(specimen).success);
 for(const id of ['sjekk','priser','sporsmal','main','term-seo','../bad']){
  assert.equal(sharedContentSchema.safeParse({...specimen,id}).success,false,id);
 }
});
test('one source can resolve unchanged on two pages; no hidden fallback or duplicate reference',()=>{
 const dir=mkdtempSync(join(tmpdir(),'medon-global-'));
 try{
  writeFileSync(join(dir,'demo-felles.json'),JSON.stringify(specimen));
  const first=resolveSharedContentPlacement(reference,dir);
  const second=resolveSharedContentPlacement(reference,dir);
  assert.deepEqual(first,second);
  assert.equal(first.id,'demo-felles');
  assert.equal(resolveSharedContentPlacement({...reference,visibility:'hidden'},dir).visibility,'hidden');
  writeFileSync(join(dir,'demo-felles.json'),JSON.stringify({...specimen,body:['Oppdatert på ett sted']}));
  assert.deepEqual(resolveSharedContentPlacement(reference,dir).body,['Oppdatert på ett sted']);
  assert.throws(()=>resolveSharedContentPlacement({_block:'sharedContent',entry:'../../secret'},dir));
  assert.throws(()=>readSharedContent('not-found',dir));
  writeFileSync(join(dir,'wrong-file.json'),JSON.stringify(specimen));
  assert.throws(()=>readSharedContent('wrong-file',dir),/filnavn/);
 }finally{rmSync(dir,{recursive:true,force:true});}
});

test('real page schema resolves one shared source on Home and Om, rejects collisions and hidden copies',()=>{
 const cwd=process.cwd();
 const root=mkdtempSync(join(tmpdir(),'medon-pages-'));
 const dir=join(root,'src/content/global-content');
 mkdirSync(dir,{recursive:true});
 writeFileSync(join(dir,'demo-felles.json'),JSON.stringify(specimen));
 const home=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
 const om=JSON.parse(readFileSync('src/content/pages/om.json','utf8'));
 try{
  for (const section of [...home.sections,...om.sections]) {
   if (section._block === 'sharedContent') {
    const file = section.entry + '.json';
    copyFileSync(join('src/content/global-content',file),join(dir,file));
   }
  }
  process.chdir(root);
  const a=pageSchema.parse({...home,sections:[...home.sections,reference]});
  const b=pageSchema.parse({...om,sections:[...om.sections,reference]});
  assert.equal(a.sections.at(-1)?.id,'demo-felles');
  assert.equal(b.sections.at(-1)?.id,'demo-felles');
  assert.deepEqual(a.sections.at(-1)?.body,b.sections.at(-1)?.body);
  writeFileSync(join(dir,'demo-felles.json'),JSON.stringify({...specimen,heading:'Oppdatert fra global editor'}));
  assert.equal(pageSchema.parse({...om,sections:[...om.sections,reference]}).sections.at(-1)?.heading,'Oppdatert fra global editor');
  assert.deepEqual(pageSchema.parse({...om,sections:[...om.sections,{...reference,visibility:'hidden'}]}).sections,b.sections.slice(0,-1));
  assert.equal(pageSchema.safeParse({...om,sections:[...om.sections,reference,reference]}).success,false);
  assert.equal(pageSchema.safeParse({...home,sections:[...home.sections,reference,reference]}).success,false);
  const local={_block:'content',id:'demo-felles',heading:'Colliding local',body:['Too similar']};
  assert.equal(pageSchema.safeParse({...om,sections:[...om.sections,local,reference]}).success,false);
 }finally{process.chdir(cwd);rmSync(root,{recursive:true,force:true});}
});

test('organiske valgkort lagres under Global Innhold og kan redigeres uten dobbel kilde',()=>{
  const filename='app/src/content/global-content/kanaler.json';
  const original=JSON.parse(readFileSync('src/content/global-content/kanaler.json','utf8'));
  assert.deepEqual(original.items.map((item:any)=>item.icon),['seo','local-seo','ai-search']);
  const entry=entryForFile(cms,filename);
  assert.ok(entry,'Globalt innhold must expose the organic card editor');
  const fields=entry.fields.find((f:any)=>f.name==='items');
  const itemEditor=resolveField(fields,cms.components);
  assert.ok(itemEditor.fields.some((f:any)=>f.name==='headline'),'Cards must expose headline in CMS');
  const saved=JSON.parse(cmsJsonSave(original,original,entry,cms));
  assert.deepEqual(saved,original,'CMS round trip must keep all three cards and current content');
  const modified=structuredClone(original);
  modified.items[1].headline='Nytt lokalt budskap';
  modified.items[1].badge='Ny badge fra CMS';
  modified.items[1].icon='seo';
  modified.items[1].text='Ny CMS-beskrivelse';
  assert.ok(itemEditor.fields.some((f:any)=>f.name==='badge'),'Globalt innhold must expose editable DaisyUI badge');
  assert.ok(itemEditor.fields.some((f:any)=>f.name==='icon'),'Globalt innhold must expose service icons');
  const updated=JSON.parse(cmsJsonSave(original,modified,entry,cms));
  assert.deepEqual(updated,modified);
  assert.equal(sharedContentSchema.safeParse(updated).success,true);
  const page=JSON.parse(readFileSync('src/content/pages/synlighet.json','utf8'));
  assert.deepEqual(page.sections[0],{_block:'sharedContent',entry:'kanaler'});
  const parsed=pageSchema.parse(page);
  assert.equal(parsed.sections.find((s:any)=>s.id==='kanaler')?.items?.[1]?.headline,original.items[1].headline);
  assert.equal(page.sections.some((s:any)=>s.id==='kanaler'||s.items?.some((i:any)=>i.headline==='Bli med i svaret')),false);
});

test('Betalt synlighet uses one globally editable CMS source directly after Organic',()=>{
  const original=JSON.parse(readFileSync('src/content/global-content/betalt-synlighet.json','utf8'));
  const source=JSON.parse(readFileSync('src/content/pages/synlighet.json','utf8'));
  const entry=entryForFile(cms,'app/src/content/global-content/betalt-synlighet.json');
  assert.ok(entry,'Paid card section must be editable in Globalt innhold');
  assert.deepEqual(source.sections.slice(0,2),[
    {_block:'sharedContent',entry:'kanaler'},
    {_block:'sharedContent',entry:'betalt-synlighet'}
  ]);
  assert.equal(original.items.length,3);
  assert.deepEqual(original.items.map((item:any)=>item.icon),['google-ads','chatgpt-ads','meta-ads']);
  assert.deepEqual(original.items.map((item:any)=>item.title),['Google Ads','ChatGPT Ads','Meta Ads']);
  assert.ok(original.items.every((item:any)=>item.badge&&item.headline&&item.label));
  assert.ok(original.items.every((item:any)=>item.href===undefined),'No dead links to unavailable paid service pages');
  assert.deepEqual(JSON.parse(cmsJsonSave(original,original,entry,cms)),original);
  const changed=structuredClone(original);
  changed.items[0].headline='Ny annonseringsoverskrift';
  changed.items[1].badge='Oppdatert badgetekst';
  changed.items[1].icon='meta-ads';
  changed.items[2].text='CMS-redigert beskrivelse';
  assert.deepEqual(JSON.parse(cmsJsonSave(original,changed,entry,cms)),changed);
  assert.equal(sharedContentSchema.safeParse(changed).success,true);
  const resolved=pageSchema.parse(source);
  assert.deepEqual(resolved.sections.slice(0,2).map((section:any)=>section.id),['kanaler','betalt-synlighet']);
  assert.equal(resolved.sections[1].items?.[1].headline,original.items[1].headline);
  assert.equal(source.sections.some((section:any)=>section.id==='betalt-synlighet'),false,'No local copy');
});
