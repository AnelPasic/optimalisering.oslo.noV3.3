import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync,readdirSync } from 'node:fs';
import { resolveRouteFamily } from '../src/lib/route-family.ts';

const page=(extra:any={})=>({kind:'service',slug:'unlisted-future-service',sections:[{id:'ordinary',links:[]}],...extra});
test('semantic families cover every supported kind and all current pages',()=>{
 for(const kind of ['home','service','index','article','pricing','assessment','utility']) assert.equal(resolveRouteFamily(page({kind})).family,kind);
 for(const file of readdirSync('src/content/pages').filter(n=>n.endsWith('.json'))){const p=JSON.parse(readFileSync('src/content/pages/'+file,'utf8'));assert.equal(resolveRouteFamily(p).family,p.kind);}
 assert.equal(resolveRouteFamily(page()).family,'service');
 assert.throws(()=>resolveRouteFamily(page({kind:'future-unknown'})));
});
test('optional service composition validates actual anchors and source links',()=>{
 assert.equal(resolveRouteFamily(page()).service.closingCta,true);
 const source=page({proof:{},sections:[{id:'evidence'},{id:'context',links:[{href:'/priser/',label:'Se priser'}]}],composition:{commercialText:true,service:{closingCta:false,proofAfter:'evidence',pricingBridge:{after:'context',href:'/priser/',serviceName:'Synlighet'},sectionVisuals:[{section:'context',visual:'kanaler'}]}}});
 assert.equal(resolveRouteFamily(source).service.pricingBridge?.link.label,'Se priser');
 assert.equal(resolveRouteFamily(source).service.closingCta,false);
 for(const modify of [
  (p:any)=>p.sections.pop(),
  (p:any)=>p.sections.push({id:'context'}),
  (p:any)=>p.sections[1].links=[],
  (p:any)=>delete p.proof,
  (p:any)=>p.composition.service.sectionVisuals[0].visual='raw-class',
  (p:any)=>p.composition.service.unknown=true,
  (p:any)=>p.kind='article',
 ]){const p=structuredClone(source);modify(p);assert.throws(()=>resolveRouteFamily(p));}
});
test('renderer/style selection has no slug whitelist or visual-system flags',()=>{
 for(const file of ['src/pages/[...slug].astro','src/layouts/SiteLayout.astro']){
  const source=readFileSync(file,'utf8');
  assert.ok(!/homeVisual|pricingVisual|serviceVisual|\[['"]synlighet['"],\s*['"]konvertering/.test(source));
 }
 const route=readFileSync('src/pages/[...slug].astro','utf8');
 assert.ok(route.includes('resolveRouteFamily'));
});
