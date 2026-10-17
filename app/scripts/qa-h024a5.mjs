import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
const phase=process.env.QA_PHASE||'after',out=`../coordination/evidence/h024a5/${phase}`;mkdirSync(out,{recursive:true});
const before=phase==='before'?null:JSON.parse(readFileSync('../coordination/evidence/h024a5/before/checks.json'));
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const records=[],errors=[],posts=[];
try{for(const route of ['/','/design-system/','/synlighet/','/om/','/kontakt/','/priser/','/vurdering/','/innsikt/'])for(const width of [1440,900,390,320]){
 const p=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push({route,width,message:e.message}));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);
 const snapshot=await p.evaluate(()=>{
  const selector='.card-body > p, .info-item p, .listing-copy p, .package-card p, .package-card li, .proof-card p, .proof-comparison dt, .proof-comparison dd span, .assessment-form p, .ds-form p, [data-card-number], .card-title, .card-actions a, .card-actions button, .badge';
  const style=e=>{const s=getComputedStyle(e);return Object.fromEntries(['fontSize','lineHeight','fontFamily','fontWeight','color','backgroundColor','borderRadius','paddingTop','paddingRight','paddingBottom','paddingLeft','gap','borderTopWidth'].map(k=>[k,s[k]]));};
  const contrast=e=>{const ctx=document.createElement('canvas').getContext('2d');const rgb=c=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=c;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data];};let bg=[255,255,255];for(const n of [e,...function*(n){while(n.parentElement){n=n.parentElement;yield n;}}(e)].reverse()){const c=rgb(getComputedStyle(n).backgroundColor),a=c[3]/255;bg=bg.map((v,i)=>v*(1-a)+c[i]*a);}const fg=rgb(getComputedStyle(e).color);const lum=c=>c.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);return (Math.max(lum(fg),lum(bg))+.05)/(Math.min(lum(fg),lum(bg))+.05);};
  const texts=[...document.querySelectorAll(selector)].filter(e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden').map(e=>{
   const explanatory=e.matches('.card-body > p:not(.badge):not(.alert),.info-item p,.listing-copy p,.package-fit,.package-descriptor,.package-detail,.package-situations li,.package-uncertain');
   return {text:e.textContent.trim(),tag:e.tagName,class:e.className,explanatory,sharedBody:e.matches('[data-content-card] > .card-body > p'),imageBody:e.matches('.card.md\\:card-side > .card-body > p'),style:style(e),contrast:contrast(e),clipped:e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1};
  });
  const cards=[...document.querySelectorAll('[data-content-card], .card.md\\:card-side')].map(e=>({text:e.textContent.trim(),root:style(e),body:style(e.querySelector('.card-body')),hierarchy:!!e.querySelector(':scope > .card-body'),links:[...e.querySelectorAll('a')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')}))}));
  return {rootFont:getComputedStyle(document.documentElement).fontSize,bodyFont:getComputedStyle(document.body).fontSize,texts,cards,overflow:document.documentElement.scrollWidth>innerWidth};
 });
 assert.equal(snapshot.overflow,false,route+' overflow');
 if(before){const original=before.records.find(r=>r.route===route&&r.width===width).snapshot;assert.equal(snapshot.rootFont,original.rootFont);assert.equal(snapshot.bodyFont,original.bodyFont);assert.equal(snapshot.texts.length,original.texts.length);
  snapshot.texts.forEach((t,i)=>{const b=original.texts[i];assert.equal(t.text,b.text);assert.equal(t.tag,b.tag);if(t.explanatory){assert.ok(parseFloat(t.style.fontSize)>=16,`${route} ${width} substantive description below1rem: ${t.text}`);assert.ok(parseFloat(t.style.lineHeight)/parseFloat(t.style.fontSize)>=1.5);assert.ok(t.contrast>=4.5,`${route} contrast ${t.contrast}`);assert.equal(t.clipped,false,`${route} text clipping`);if((t.sharedBody||t.imageBody)&&parseFloat(b.style.fontSize)<16)assert.ok(parseFloat(t.style.fontSize)>parseFloat(b.style.fontSize),`${route} ${width} measured improvement ${b.style.fontSize} -> ${t.style.fontSize}: ${t.text}`);else assert.deepEqual(t.style,b.style,'Already readable family unchanged');}else assert.deepEqual(t.style,b.style,'Compact/title/action typography unchanged');assert.equal(t.style.fontFamily,b.style.fontFamily);});
  snapshot.cards.forEach((c,i)=>{const b=original.cards[i];assert.equal(c.hierarchy,true);assert.equal(c.text,b.text);assert.deepEqual(c.links,b.links);for(const part of ['root','body'])assert.deepEqual(c[part],b[part],`${route} ${width} Card ${part} geometry/colors/inherited role preserved`);});
 }
 if(route==='/'){await p.locator('#passer').screenshot({path:`${out}/passer-${width}.png`});await p.locator('#mekanisme').screenshot({path:`${out}/mechanism-${width}.png`});}
 if(route==='/design-system/'){for(const n of [2,3,4])await p.locator('.ds-grid-demo').filter({has:p.getByRole('heading',{name:`${n} kort`,exact:true})}).screenshot({path:`${out}/demo-${n}-${width}.png`});const image=p.locator('article.card').filter({has:p.getByText('Medieeksempel med eksisterende bilde. Ingen ny kundehistorie.',{exact:true})});await image.screenshot({path:`${out}/image-${width}.png`});}
 records.push({route,width,snapshot});await p.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({phase,base,records,errors,posts},null,2)+'\n');console.log(`H-024A5 ${phase}: ${records.length} route/width card inventories${before?'; actual body floor/line-height/contrast, unchanged compact roles/geometry/content PASS':''}; zero browser errors/POSTs.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
