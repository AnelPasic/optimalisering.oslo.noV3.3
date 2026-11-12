import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {pageSchema} from '../src/lib/content-schema.ts';

const read=(path:string)=>readFileSync(new URL(path,import.meta.url),'utf8');
const page=JSON.parse(read('../src/content/pages/chatgpt-ads.json'));
const content=page.sections.filter((section:any)=>section._block==='content');

test('ChatGPT Ads is an editable CMS service and is reachable from navigation',()=>{
 const parsed=pageSchema.safeParse(page);
 assert.equal(parsed.success,true,parsed.success?'':JSON.stringify(parsed.error.issues));
 assert.equal(page.slug,'chatgpt-ads');
 assert.equal(page.kind,'service');
 assert.match(page.hero.eyebrow,/CHATGPT ADS/);
 assert.equal(page.hero.title,'Glem førsteplassen på Google. Bli den kunden velger i ChatGPT.');
 assert.equal(page.hero.support,'Kundene spør allerede ChatGPT hva de bør kjøpe og hvem de bør velge. Vi gjør tilbudet ditt synlig når de vurderer alternativene, og tar dem fra interesse til bestilling.');
 assert.equal(page.hero.primaryCta.href,'#priser');
 assert.equal(page.hero.secondaryCta.href,'#sjekk');
 assert.ok(existsSync(new URL('../public/images/services/discoveringlocalfavorite-1.png',import.meta.url)));
 const nav=JSON.parse(read('../src/content/site-chrome/header.json'));
 const links=nav.navigation.flatMap((item:any)=>item.mega?.columns?.flatMap((col:any)=>col.links)??[]);
 assert.equal(links.filter((item:any)=>item.href==='/chatgpt-ads/').length,1);
 assert.match(read('../src/pages/sitemap.xml.ts'),/getCollection\('pages'\)/);
});

test('One coherent sales journey with alternating surfaces and existing protected masters',()=>{
 const ids=page.sections.map((s:any)=>s.id??s.element);
 assert.deepEqual(ids,['sporsmalene','eksempel','fra-klikk-til-kunde','kanaler','maaling','priser','oppstart','sjekk']);
 assert.equal(content.length,6);
 assert.ok(content.every((s:any)=>s.surface&&s.layout&&Array.isArray(s.items)&&s.items.length>=2));
 assert.ok(new Set(content.map((s:any)=>s.surface)).size>=4);
 assert.ok(content.every((s:any)=>s.items.every((item:any)=>item.iconName&&item.surface)));
 assert.equal(page.sections.filter((s:any)=>s._block==='global'&&s.element==='priser').length,1);
 assert.equal(page.sections.filter((s:any)=>s._block==='global'&&s.element==='sjekk').length,1);
 assert.ok(!page.hero.featuredProofCaseId,'No falsely transferred paid-media case result');
 assert.ok(!page.sections.some((s:any)=>s.element==='resultater'),'No unapproved ChatGPT Ads case claims');
});

test('Creative, benefit-first copy keeps sponsored placement separate from AI answers',()=>{
 assert.match(page.hero.title,/Bli den kunden velger i ChatGPT/);
 assert.doesNotMatch(page.hero.title,/annonsering|kampanjeoppsett|målretting/);
 assert.match(page.hero.eyebrow,/CHATGPT ADS/);
 assert.match(page.hero.support,/tar dem fra interesse til bestilling/);
 assert.match(content.find((s:any)=>s.id==='maaling').heading,/Bestillinger fyller kalenderen/);
 assert.match(content.find((s:any)=>s.id==='eksempel').eyebrow,/EKSEMPEL/);
 assert.ok(!content.some((s:any)=>s.body.some((p:string)=>/ikke en garanti|ingen garanti|kan ikke love|garanterer ikke|resultater kan variere/i.test(p))));
 const faq=page.faq.map((x:any)=>x.answer).join(' ');
 assert.match(faq,/ikke en del av selve ChatGPT-svaret/);
 assert.match(faq,/ikke det samme som å kjøpe et eksakt søkeord/);
 assert.match(faq,/4 500 kr per måned eks. mva/);
 assert.match(faq,/Annonsebudsjettet kommer i tillegg/);
});

test('Project copy QA for new page and no unrequested technical IDs',()=>{
 const forbidden=/[\u2013\u2014\u2011\u2212\u2026\u2192\u2190\u2197\u2198\u201c\u201d\u2018\u2019\u00ab\u00bb\u00d7\u00b7]/u;
 const cliches=/det handler ikke om|ikke bare|med andre ord|kan bidra til|bidrar til å sikre|gjør det mulig å|\bhelhetlig\b|\bsømløs\b|\bskreddersydd\b|\brobust\b|\bdatadrevet\b/i;
 function inspect(v:unknown):void{
  if(typeof v==='string'){assert.equal(forbidden.test(v),false,v);assert.equal(cliches.test(v),false,v);}
  else if(Array.isArray(v))v.forEach(inspect);
  else if(v&&typeof v==='object')Object.values(v).forEach(inspect);
 }
 inspect(page);
 const mws=read('../../coordination/H1-LAB.md');
 assert.match(mws,/Evaluate the \*\*complete Hero\*\*/);
 assert.doesNotMatch(mws,/Read the H1 \*\*alone\*\*/);
});
