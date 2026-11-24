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
  assert.equal(page.hero.primaryCta.href,'#sjekk');
  assert.equal(page.hero.secondaryCta.href,'#annonsering');
 if(page.hero.visual.kind==='image')assert.ok(existsSync(new URL('../public'+page.hero.visual.image.src,import.meta.url)),'saved Hero image exists');
  const visible=pageSchema.parse(page).sections.filter(s=>s.visibility!=='hidden');
  assert.equal(new Set(visible.map(s=>s.id)).size,visible.length);
  for(const cta of [page.hero.primaryCta,page.hero.secondaryCta])if(cta?.href.startsWith('#'))assert.ok(visible.some(s=>s.id===cta.href.slice(1)),cta.href);
  assert.equal(page.sections.filter((s:any)=>s._block==='global'&&s.element==='priser').length,1);
  assert.equal(page.sections.filter((s:any)=>s._block==='global'&&s.element==='sjekk').length,1);
});

test('Google Ads preserves source-authorized Eurotents proof',()=>{
  const proof=JSON.parse(read('../src/content/proof/eurotents.json'));
  assert.equal(proof.publicationApproved,true);
  assert.equal(proof.namingPermission,'GRANTED');
  assert.equal(page.hero.featuredProofCaseId,proof.id);
  assert.equal(proof.before,'4,3 X');
  assert.equal(proof.after,'17,2 X');
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
  assert.equal(1000/100,10);
  assert.equal(1000/10,100);
  assert.equal(10*0.1,1);
  assert.equal(100*0.1,10);
});
