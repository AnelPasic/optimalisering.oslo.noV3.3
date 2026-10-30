import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,mkdirSync,cpSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,basename} from 'node:path';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {checkManagedPages} from '../scripts/check-managed-pages.mjs';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const child=(group:string,id:string)=>cms.content.find((x:any)=>x.name===group).items.find((x:any)=>x.name===id);
const service=child('serviceGroup','services'),article=child('insight','insightArticles');

test('CONTENT-06: single All services native Create/Delete, fixed pages remain outside it',()=>{
 assert.equal(service.label,'Alle tjenester');
 assert.equal(cms.content.find((x:any)=>x.name==='serviceGroup').items.length,1);
 assert.equal(cms.content.find((x:any)=>x.name==='serviceGroup').items[0].name,'services');
 for(const [entry,folder,kind] of [[service,'','service'],[article,'/managed-articles','article']] as const){
  assert.equal(entry.type,'collection');
  assert.equal(entry.path,'app/src/content/pages'+folder);
  assert.deepEqual(entry.operations,{create:true,rename:false,delete:true});
  assert.equal(entry.filename.template,'{fields.slug}.json');
  assert.equal(entry.filename.field,false);
  assert.equal(entry.fields.find((f:any)=>f.name==='kind').default,kind);
  assert.equal(entry.fields.find((f:any)=>f.name==='kind').hidden,true);
  assert.equal(entry.fields.find((f:any)=>f.name==='slug').required,true);
  assert.ok(entry.fields.find((f:any)=>f.name==='seo'));
  assert.ok(entry.fields.find((f:any)=>f.name==='hero'));
  assert.ok(entry.fields.find((f:any)=>f.name==='sections'));
 }
 const protectedNames=['home','priser','kontakt','personvern','vilkar','om','vurdering','innsikt'];
 for(const n of protectedNames)assert.ok(service.exclude.includes(n+'.json'),n);
 for(const n of ['seo','synlighet','lokal-seo','ai-synlighet','konvertering','nettbutikkoptimalisering'])assert.ok(!service.exclude.includes(n+'.json'),n);
 const all=(entries:any[]):any[]=>entries.flatMap((e:any)=>e.type==='group'?all(e.items):[e]);
 for(const editor of all(cms.content)){
  if(editor.type==='file'&&editor.path?.startsWith('app/src/content/pages/'))assert.equal(editor.operations?.delete,false,editor.path);
  if(editor.name==='insightArticles')assert.deepEqual(editor.operations,{create:true,rename:false,delete:true});
 }
 assert.equal(service.path===article.path,false);
 assert.deepEqual(cms.content.find((x:any)=>x.name==='insight').items.map((x:any)=>x.name),['insightOverview','insightArticles']);
});

test('CONTENT-06: real schema validates a new plain service and article without review statuses',()=>{
 const original=JSON.parse(readFileSync('src/content/pages/seo.json','utf8'));
 for(const [kind,slug] of [['service','demo-service-01'],['article','innsikt/demo-article-01']] as const){
  const data={slug,kind,seo:{title:'Test only '+slug,description:'Synthetic lifecycle verification'},hero:{...original.hero,title:'Synthetic '+slug,support:'This is a synthetic test only.'},sections:[],faq:[]};
  assert.equal(pageSchema.safeParse(data).success,true,kind);
  assert.equal(Object.hasOwn(data,'status'),false);
 }
});

test('CONTENT-06: validate create/read/delete in isolated folder; detect duplicate URLs, filename mismatches and kind',()=>{
 const temp=mkdtempSync(join(tmpdir(),'content06-oslo-'));
 try{
  mkdirSync(join(temp,'managed-services'));mkdirSync(join(temp,'managed-articles'));
  const root=JSON.parse(readFileSync('src/content/pages/seo.json','utf8'));
  writeFileSync(join(temp,'seo.json'),JSON.stringify(root));
  const s={slug:'demo-new-service',kind:'service',seo:{title:'Demo service',description:'Demo description'},hero:{title:'Demo title',support:'Demo text'},sections:[],faq:[]};
  const path=join(temp,'managed-services','demo-new-service.json');
  writeFileSync(path,JSON.stringify(s));assert.equal(checkManagedPages(temp).managedFiles.length,1);
  const a={...s,slug:'innsikt/demo-article',kind:'article'};
  const ap=join(temp,'managed-articles','innsikt-demo-article.json');
  writeFileSync(ap,JSON.stringify(a));assert.equal(checkManagedPages(temp).managedFiles.length,2);
  const duplicate=join(temp,'managed-services','seo.json');
  writeFileSync(duplicate,JSON.stringify({...s,slug:'seo'}));assert.throws(()=>checkManagedPages(temp),/Duplicate canonical slug/);
  rmSync(duplicate);
  writeFileSync(path,JSON.stringify({...s,slug:'other-name'}));assert.throws(()=>checkManagedPages(temp),/Filename\/slug mismatch/);
  writeFileSync(path,JSON.stringify({...s,kind:'article'}));assert.throws(()=>checkManagedPages(temp),/Wrong page kind/);
  writeFileSync(path,JSON.stringify(s));rmSync(path);
  assert.equal(checkManagedPages(temp).managedFiles.length,1);
  rmSync(ap);assert.equal(checkManagedPages(temp).managedFiles.length,0);
 }finally{rmSync(temp,{recursive:true,force:true});}
});

test('CONTENT-06: static CMS URL suggestions remain for fixed pages; dynamic pages use manual URL or automatic PageList',()=>{
 const urlSync=readFileSync('scripts/sync-cms-url-options.mjs','utf8');
 const listSync=readFileSync('scripts/sync-page-list-select.mjs','utf8');
 for(const source of [urlSync,listSync])assert.match(source,/readdirSync\(pagesDir\)|readdirSync\(root\)/);
 // Both legacy picker generators retain pinned suggestions, ignoring new and removed root service slugs; no YAML edit after native Add/Delete.
 const audit=readFileSync('scripts/audit-build.mjs','utf8');
 assert.match(audit,/managed-services/);assert.match(audit,/managed-articles/);
});
