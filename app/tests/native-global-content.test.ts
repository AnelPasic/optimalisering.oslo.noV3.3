import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {readSharedContent,resolveSharedContentPlacement,sharedContentSchema} from '../src/lib/shared-content.ts';
import {cmsJsonSave,entryForFile,resolveField} from './helpers/pages-cms-json.ts';
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const globalCollection=cms.content.find((x:any)=>x.name==='globalElements').items.find((x:any)=>x.name==='sharedContent');
const specimen={_block:'content',uid:randomUUID(),id:'demo-felles',name:'Global demonstrasjon',eyebrow:'Felles',heading:'Samme tekst på flere sider',body:['Avsnitt en','Avsnitt to'],headingAlign:'left',layout:'two-columns',surface:'base-200',items:[{title:'Eksempel',text:'Kortet følger med',surface:'default',boxVariant:'card'}],links:[{label:'Les mer',href:'/om/'}]};
const reference={_block:'sharedContent',entry:'demo-felles'};
test('native JSON editor and reference on all remaining pages, no promotion',()=>{
 assert.equal(globalCollection.type,'collection');
 assert.equal(globalCollection.operations.create,true);
 assert.equal(globalCollection.operations.rename,false);
 assert.equal(globalCollection.operations.delete,false);
 assert.deepEqual(globalCollection.exclude,['README.md']);
 assert.equal(globalCollection.filename,'{fields.id}.json');
 assert.deepEqual(globalCollection.fields.map((f:any)=>f.name),['_block','uid','id','name','eyebrow','heading','headingAlign','layout','surface','body','items','links']);
 const files=readdirSync('src/content/pages').filter(file=>file.endsWith('.json'));
 assert.equal(files.length,16);
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
