import {getHomepageBlock,isHomepageSectionVisible,getGlobalElement,resolveHomepageContent} from '../src/lib/home-builder.ts';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {getHeroProof,getSelectedHeroProof} from '../src/lib/hero-proof.ts';
import {resolvePageHero} from '../src/lib/page-hero.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {stripTerminologyLinks} from './terminology-markup.mjs';

const read=file=>JSON.parse(readFileSync(file,'utf8'));
const root=process.env.QA_DIST_ROOT||'dist';
const home=read('src/content/pages/home.json');
const master=getGlobalElement('resultater').content;
const commercial=resolveHomepageContent(home);
const records=readdirSync('src/content/proof').filter(f=>f.endsWith('.json')).map(f=>read('src/content/proof/'+f));
const dirs=['src/content/pages','src/content/pages/managed-services','src/content/pages/managed-articles'];
const text=html=>stripTerminologyLinks(html).replace(/<[^>]*>/g,' ').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
for(const dir of dirs)for(const file of readdirSync(dir).filter(f=>f.endsWith('.json'))){
 const raw=read(dir+'/'+file),page=pageSchema.parse(raw),slug=page.slug;
 const hero=resolvePageHero(page,commercial);
 const selected=hero.featuredProofCaseId?getSelectedHeroProof(hero.featuredProofCaseId,master,records):
   page.kind==='home'&&isHomepageSectionVisible(getHomepageBlock(home,'proof'))?getHeroProof(getHomepageBlock(home,'proof').content,records):undefined;
 const expected=hero.visual.kind==='image'?selected:undefined;
 const html=readFileSync(root+'/'+(slug==='home'?'index.html':slug+'/index.html'),'utf8');
 const panels=[...html.matchAll(/<div\b[^>]*\bclass="[^"]*\bhero-proof\b[^"]*"[^>]*>/g)];
 assert.equal(panels.length,expected?1:0,slug+': explicit guarded Hero proof only');
 if(expected){
  const panel=html.slice(panels[0].index);
  const result=panel.match(/<p class="hero-proof-result"[^>]*>([\s\S]*?)<\/p>/)?.[1];
  const support=panel.match(/<p class="hero-proof-support"[^>]*>([\s\S]*?)<\/p>/)?.[1];
  assert.ok(result&&support,slug+': approved result/source present');
  assert.equal(text(result),text(expected.metric+' '+expected.comparison));
  assert.equal(text(support),text(expected.support));
 }
}
console.log('H-017E static PASS: per-page explicitly selected, guarded public result/source, no automatic proof on other routes.');
