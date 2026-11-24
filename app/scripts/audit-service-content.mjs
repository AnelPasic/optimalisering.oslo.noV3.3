import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pageSchema} from '../src/lib/content-schema.ts';
import {resolvePageHero} from '../src/lib/page-hero.ts';
import {resolveRouteFamily} from '../src/lib/route-family.ts';
import {visibleServiceSections} from '../src/lib/service-sections.ts';
import {getGlobalElement,resolveHomepageContent} from '../src/lib/home-builder.ts';
import {createCommercialTextBinding} from '../src/lib/commercial-text.ts';
import {combineFaqItems} from '../src/lib/faq-items.ts';
import {hasRichMarkdown,renderSafeMarkdown} from '../src/lib/rich-markdown.ts';
import {stripTerminologyLinks} from './terminology-markup.mjs';

const read=path=>JSON.parse(readFileSync(path,'utf8'));
const entities={'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&nbsp;':' '};
const text=value=>stripTerminologyLinks(value).replace(/<[^>]*>/g,' ').replace(/&(amp|lt|gt|quot|apos|nbsp);/g,m=>entities[m]).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/\s+/gu,' ').trim();
const plain=value=>text(hasRichMarkdown(value)?renderSafeMarkdown(value):value);
function sectionHtml(html,id){
 assert.match(id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
 return html.match(new RegExp('<section\\b(?=[^>]*\\bid="'+id+'")[^>]*>([\\s\\S]*?)<\\/section>'))?.[1];
}

export function auditServiceContent(slug){
 const page=pageSchema.parse(read('src/content/pages/'+slug+'.json'));
 const home=pageSchema.parse(read('src/content/pages/home.json'));
 const pricing=pageSchema.parse(read('src/content/pages/priser.json'));
 const route=resolveRouteFamily(page);
 const bind=route.bindCommercialText?createCommercialTextBinding(home,pricing):v=>v;
 const hero=resolvePageHero(page);
 const html=readFileSync('dist/'+slug+'/index.html','utf8');
 assert.ok(html.includes('data-page-family="service"'),slug+': service renderer');
 assert.equal((html.match(/<h1(?:\s|>)/g)??[]).length,1);
 assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]),text(hero.title),slug+': H1 follows CMS');
 const heroHtml=sectionHtml(html,'service-hero');
 assert.ok(heroHtml,slug+': Hero section');
 for(const value of [hero.eyebrow,hero.support,hero.primaryCta?.label,hero.secondaryCta?.label].filter(Boolean)){
  assert.ok(text(heroHtml).includes(plain(value)),slug+': missing CMS Hero copy '+value);
 }
 const sections=visibleServiceSections(page);
 const localFaq=page.faq.map(item=>({...item,answer:bind(item.answer)}));
 const expected=[];
 const bridge=slug==='synlighet'?undefined:route.service.pricingBridge;
 for(const section of sections){
  const faq=section.globalElement==='sporsmal';
  if(!faq||combineFaqItems(getGlobalElement('sporsmal').content.items,localFaq).length)expected.push(section.id);
  if(!section.globalElement&&bridge?.after===section.id)expected.push('service-priser');
  if(section.globalElement||section._block==='pageList'||section._block==='proofList')continue;
  const rendered=sectionHtml(html,section.id);
  assert.ok(rendered,slug+': missing section '+section.id);
  const values=[section.eyebrow,section.heading,...section.body,...(section.afterCards??[]),...(section.items??[]).flatMap(item=>[item.headline||item.title,item.text]),...(section.links??[]).map(link=>link.label)].filter(Boolean);
  for(const value of values)assert.ok(text(rendered).includes(plain(value)),slug+': '+section.id+' missing source copy '+value);
 }
 if(!sections.some(s=>s.globalElement==='sporsmal')&&localFaq.length)expected.push('sporsmal');
 const ids=[...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(match=>match[1]);
 assert.equal(new Set(ids).size,ids.length,slug+': unique section anchors');
 const expectedSet=new Set(expected);
 assert.deepEqual(ids.filter(id=>expectedSet.has(id)),expected,slug+': rendered order follows visible CMS sequence');
 assert.equal(ids[0],'service-hero');
 const faqItems=sections.some(s=>s.globalElement==='sporsmal')?combineFaqItems(getGlobalElement('sporsmal').content.items,localFaq):localFaq;
 for(const item of faqItems){
  const rendered=sectionHtml(html,'sporsmal');
  assert.ok(rendered&&text(rendered).includes(text(item.question))&&text(rendered).includes(plain(item.answer)),slug+': FAQ follows CMS');
 }
 if(bridge){
  const rendered=sectionHtml(html,'service-priser');
  assert.ok(rendered);
  const packages=resolveHomepageContent(home).packages;
  assert.equal((rendered.match(/<article\b/g)??[]).length,2);
  for(const item of packages.items.slice(0,2)){
   for(const value of [item.title,new Intl.NumberFormat('nb-NO').format(item.price),item.priceSuffix,item.vatSuffix])assert.ok(text(rendered).includes(text(value)),slug+': shared price facts');
  }
 }else assert.ok(!ids.includes('service-priser'),slug+': no implicit pricing bridge');
 const forms=[...html.matchAll(/<form\b[^>]*>/g)].map(m=>m[0]);
 const assessment=sections.some(s=>s.globalElement==='sjekk');
 assert.equal(forms.length,assessment?1:0,slug+': only explicitly placed assessment form');
 for(const form of forms){
  assert.match(form,/\bdata-home-assessment\b/);
  assert.match(form,/method="post"/);
  assert.match(form,/onsubmit="return false"/);
 }
 assert.ok(!/Oslo Privatklinikk|Sprint|\d+\s*timer/.test(html),slug+': protected commercial/proof boundaries');
 console.log('Service content parity PASS: '+slug+'; current Hero, sections, FAQ, shared pricing and guarded form.');
}
if(process.argv[1]?.endsWith('/audit-service-content.mjs')||process.argv[1]?.endsWith('\\audit-service-content.mjs')){
 for(const slug of process.argv.slice(2))auditServiceContent(slug);
}
