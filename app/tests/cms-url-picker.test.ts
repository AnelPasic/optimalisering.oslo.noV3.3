import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {projectSelectedLinks,safeCmsHref} from '../src/lib/cms-link-choice.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {pageFilePaths,loadPageFile} from './helpers/page-sources.ts';
const page=(name:string)=>loadPageFile(name+'.json');
test('17 page JSON records stay valid and are never mutated',()=>{
 const files=pageFilePaths();
 assert.equal(files.length,17);
 for(const file of files){const p=loadPageFile(file),before=structuredClone(p);
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
 const hero=parsed.hero;
 assert.ok(hero && 'primaryCta' in hero,'Homepage must have a typed Hero CTA');
 assert.equal(hero.primaryCta.href,'/kontakt/');
 assert.equal(home.hero.primaryCta.href,modified.hero.primaryCta.href);
 assert.equal(Object.hasOwn(hero.primaryCta,'suggestedHref'),false);
});
test('URL suggestions are canonical, generated and in sync',()=>{
 const run=spawnSync(process.execPath,['scripts/sync-cms-url-options.mjs','--check'],{cwd:new URL('..',import.meta.url),encoding:'utf8'});
 assert.equal(run.status,0,run.stderr||run.stdout);
 const yaml=readFileSync(new URL('../../.pages.yml',import.meta.url),'utf8');
 assert.match(yaml,/name: suggestedHref\n\s+label: Velg side eller snarvei\n\s+component: cmsSuggestedHref/);
 assert.match(yaml,/name: href\n\s+label: Manuell URL \(beholdes som reserve\)/);
});

test('CMS keeps manual fallback whenever a suggested link is selected',()=>{
 const om=page('om');
 assert.deepEqual(om.hero.primaryCta,{label:'Ta en gratis sjekk',href:'/vurdering/',suggestedHref:'/#sjekk'});
 const selected=pageSchema.parse(om).hero;
 assert.ok(selected && 'primaryCta' in selected,'Om has a native Hero CTA');
 assert.equal(selected.primaryCta.href,'/#sjekk');
 const cleared=structuredClone(om);
 delete cleared.hero.primaryCta.suggestedHref;
 const restored=pageSchema.parse(cleared).hero;
 assert.ok(restored && 'primaryCta' in restored,'Om Hero CTA remains valid after clearing the choice');
 assert.equal(restored.primaryCta.href,'/vurdering/');
 assert.deepEqual(om.hero.primaryCta,{label:'Ta en gratis sjekk',href:'/vurdering/',suggestedHref:'/#sjekk'});
 for(const manualHref of [undefined,'','javascript:alert(1)']){
  assert.throws(()=>projectSelectedLinks({label:'Demo',href:manualHref,suggestedHref:'/kontakt/'}),/saved manual href fallback/);
 }
 const yaml=readFileSync(new URL('../../.pages.yml',import.meta.url),'utf8');
 assert.match(yaml,/name: href\n\s+label: Manuell URL \(beholdes som reserve\)\n[\s\S]*?type: string\n\s+required: true/);
});
