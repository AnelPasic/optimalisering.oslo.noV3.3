import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {resolveRouteFamily} from '../src/lib/route-family.ts';

const page=(extra:any={})=>({kind:'service',slug:'unlisted-future-service',sections:[{id:'ordinary',links:[]}],...extra});
test('semantic families cover every supported kind and current pages',()=>{
 for(const kind of ['home','service','index','article','pricing','assessment','utility'])assert.equal(resolveRouteFamily(page({kind})).family,kind);
 for(const file of readdirSync('src/content/pages').filter(n=>n.endsWith('.json'))){
  const p=JSON.parse(readFileSync('src/content/pages/'+file,'utf8'));
  assert.equal(resolveRouteFamily(p).family,p.kind);
 }
 assert.throws(()=>resolveRouteFamily(page({kind:'future-unknown'})));
});
test('service composition carries only visual metadata, not auto-inserted content',()=>{
 const source=page({composition:{commercialText:true,service:{sectionVisuals:[{section:'ordinary',visual:'kanaler'}],sectionSurfaces:[{section:'ordinary',surface:'secondary'}]}}});
 assert.equal(resolveRouteFamily(source).service.sectionVisuals[0].visual,'kanaler');
 for(const key of ['proofAfter','pricingBridge','closingCta']){
  const raw=JSON.parse(JSON.stringify(source));
  raw.composition.service[key]=key==='closingCta'?true:'ordinary';
  assert.throws(()=>resolveRouteFamily(raw),key+' must not auto-insert a hidden section');
 }
 for(const mutation of [
  (p:any)=>p.sections.pop(),
  (p:any)=>p.composition.service.sectionVisuals[0].visual='raw-class',
  (p:any)=>p.composition.service.unknown=true,
  (p:any)=>p.kind='article',
 ]){
  const p=JSON.parse(JSON.stringify(source));mutation(p);assert.throws(()=>resolveRouteFamily(p));
 }
});
test('route/source cannot bind to slug-specific visual-system flags',()=>{
 for(const path of ['src/pages/[...slug].astro','src/layouts/SiteLayout.astro']){
  const source=readFileSync(path,'utf8');
  assert.ok(!/homeVisual|pricingVisual|serviceVisual|\\[['"]synlighet['"],\\s*['"]konvertering/.test(source));
 }
 assert.ok(readFileSync('src/pages/[...slug].astro','utf8').includes('resolveRouteFamily'));
});
