import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {projectSelectedLinks,safeCmsHref} from '../src/lib/cms-link-choice.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
const page=(name:string)=>JSON.parse(readFileSync(new URL('../src/content/pages/'+name+'.json',import.meta.url),'utf8'));
test('17 existing page JSON records stay valid and are never mutated',()=>{
 const files=readdirSync(new URL('../src/content/pages/',import.meta.url)).filter(n=>n.endsWith('.json'));
 assert.equal(files.length,17);
 for(const file of files){const p=page(file.slice(0,-5)),before=structuredClone(p);
  const parsed=pageSchema.safeParse(p);assert.equal(parsed.success,true,file+': '+(parsed.success?'':JSON.stringify(parsed.error.issues.slice(0,3))));
  assert.deepEqual(p,before,file);
 }
});
test('selected URLs override only runtime href, manual fallback remains untouched',()=>{
 const input={label:'Les mer',href:'/om/',suggestedHref:'/kontakt/'};
 assert.deepEqual(projectSelectedLinks(input),{label:'Les mer',href:'/kontakt/'});
 assert.equal(input.href,'/om/');
 assert.deepEqual(projectSelectedLinks({...input,suggestedHref:''}),{label:'Les mer',href:'/om/'});
 assert.deepEqual(projectSelectedLinks({label:'Les mer',href:'https://example.org/article'}),{label:'Les mer',href:'https://example.org/article'});
 for(const unsafe of ['javascript:alert(1)','data:text/html,x','//evil.test','https://user:pass@example.org','/bad\\path']){
  assert.equal(safeCmsHref(unsafe),false,unsafe);
  assert.throws(()=>projectSelectedLinks({href:'/om/',suggestedHref:unsafe}),/Invalid selected CMS URL/);
 }
 assert.equal(safeCmsHref('/#sjekk'),true);
 assert.equal(safeCmsHref('#sjekk'),true);
 assert.equal(safeCmsHref('https://example.org/'),true);
});
test('Home Hero stored href remains unchanged after selected CMS projection',()=>{
 const home=page('home'),modified=structuredClone(home);
 modified.hero.primaryCta={...modified.hero.primaryCta,suggestedHref:'/kontakt/'};
 const parsed=pageSchema.parse(modified);
 assert.equal(parsed.hero?.primaryCta?.href,'/kontakt/');
 assert.equal(home.hero.primaryCta.href,modified.hero.primaryCta.href);
 assert.equal(Object.hasOwn(parsed.hero.primaryCta,'suggestedHref'),false);
});
test('URL suggestions are canonical, generated and in sync',()=>{
 const run=spawnSync(process.execPath,['scripts/sync-cms-url-options.mjs','--check'],{cwd:new URL('..',import.meta.url),encoding:'utf8'});
 assert.equal(run.status,0,run.stderr||run.stdout);
 const yaml=readFileSync(new URL('../../.pages.yml',import.meta.url),'utf8');
 assert.match(yaml,/name: suggestedHref\n\s+label: Velg side eller snarvei\n\s+component: cmsSuggestedHref/);
 assert.match(yaml,/name: href\n\s+label: Eller skriv URL manuelt/);
});
