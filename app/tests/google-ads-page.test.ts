import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {pageSchema} from '../src/lib/content-schema.ts';

const read=(path:string)=>readFileSync(new URL(path,import.meta.url),'utf8');
const source=read('../src/content/pages/google-ads.json');
const page=JSON.parse(source);

test('Google Ads is a real CMS-backed service page with working anchor references',()=>{
  const parsed=pageSchema.safeParse(page);
  assert.equal(parsed.success,true,parsed.success?'':JSON.stringify(parsed.error.issues));
  assert.equal(page.slug,'google-ads');
  assert.equal(page.kind,'service');
  assert.match(page.hero.title,/Google Ads/);
  const ids=page.sections.map((s:any)=>s.id??s.element);
  assert.deepEqual(ids,['for-du-annonserer','klikkpris','annonsering','seo-og-konvertering','eurotents-case','priser','oppstart','sjekk']);
  assert.equal(page.hero.primaryCta.href,'#sjekk');
  assert.equal(page.hero.secondaryCta.href,'#annonsering');
  assert.ok(existsSync(new URL('../public/images/services/exponentialgrowthblue.png',import.meta.url)));
  assert.equal(page.sections.filter((s:any)=>s._block==='global'&&s.element==='priser').length,1);
  assert.equal(page.sections.filter((s:any)=>s._block==='global'&&s.element==='sjekk').length,1);
});

test('New Google Ads page maintains colored rhythm, icons and source-authorized Eurotents proof',()=>{
  const sections=page.sections.filter((s:any)=>s._block==='content');
  assert.equal(sections.length,6);
  assert.ok(sections.every((s:any)=>s.surface && s.layout && Array.isArray(s.items) && s.items.length>=2));
  assert.ok(new Set(sections.map((s:any)=>s.surface)).size>=4);
  assert.ok(sections.every((s:any)=>s.items.every((i:any)=>i.iconName&&i.surface)));
  const proof=JSON.parse(read('../src/content/proof/eurotents.json'));
  assert.equal(proof.publicationApproved,true);
  assert.equal(proof.namingPermission,'GRANTED');
  assert.equal(page.hero.featuredProofCaseId,proof.id);
  assert.equal(proof.before,'4,3 X');
  assert.equal(proof.after,'17,2 X');
  assert.match(page.sections.find((s:any)=>s.id==='eurotents-case').body.join(' '),/20 % lavere/);
});

test('New content obeys punctuation and preserves Ads vs SEO quality-score explanation',()=>{
  const forbiddenChars=/[\u2013\u2014\u2011\u2212\u2026\u2192\u2190\u2197\u2198\u201c\u201d\u2018\u2019\u00ab\u00bb\u00d7\u00b7]/u;
  const forbiddenPhrases=/det handler ikke om|ikke bare|med andre ord|kan bidra til|bidrar til å sikre|gjør det mulig å|\bhelhetlig\b|\bsømløs\b|\bskreddersydd\b|\brobust\b|\bdatadrevet\b/i;
  function check(value:unknown):void {
    if(typeof value==='string'){assert.equal(forbiddenChars.test(value),false,value);assert.equal(forbiddenPhrases.test(value),false,value);}
    else if(Array.isArray(value))value.forEach(check);
    else if(value&&typeof value==='object')Object.values(value).forEach(check);
  }
  check(page);
  const text=page.sections.map((s:any)=>[...(s.body??[]),...(s.items??[]).map((i:any)=>i.text)].join(' ')).join(' ');
  assert.match(text,/Samme tusenlapp|Ti ganger flere muligheter/);
  assert.match(text,/1 eller 10 henvendelser/);
  const click=page.sections.find((s:any)=>s.id==='klikkpris');
  assert.match(click.eyebrow,/REGNEEKSEMPEL/);
  assert.doesNotMatch(click.body.join(' '),/regneeksempel, ikke|ikke en lovet|automatisk 90|garanti/i);
  assert.doesNotMatch(page.sections.filter((s:any)=>s._block==='content').flatMap((s:any)=>s.body).join(' '),/Dette er et dokumentert kundecase, ikke et løfte|ikke en lovet klikkpris|ingen får automatisk/i);
  const faq=page.faq.map((q:any)=>q.answer).join(' ');
  assert.match(faq,/SEO gir ikke automatisk høyere kvalitetsscore/);
  assert.match(faq,/regneeksempel, ikke faktiske priser/);
  assert.match(faq,/ikke et anslag for din bedrift/);
  assert.equal(1000/100,10);
  assert.equal(1000/10,100);
  assert.equal(10*0.1,1);
  assert.equal(100*0.1,10);
});
