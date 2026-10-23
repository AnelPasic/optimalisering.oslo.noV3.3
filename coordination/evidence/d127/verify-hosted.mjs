import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const origin='https://optimalisering-oslo-v33.anel.workers.dev';
const root=new URL('../../../app/dist/',import.meta.url);
const html=await readFile(new URL('index.html',root),'utf8');
const assets=[...new Set([...html.matchAll(/(?:src|href)="(\/_astro\/[^"#]+)"/g)].map(m=>m[1]))];
const routes=['/','/seo/','/ai-synlighet/','/synlighet/','/konvertering/','/priser/','/vurdering/','/kontakt/'];
const checks=await Promise.all([...routes,...assets].map(async path=>{
 const r=await fetch(origin+path),body=Buffer.from(await r.arrayBuffer());
 const local=await readFile(new URL(path.startsWith('/_astro/')?path.slice(1):(path==='/'?'index.html':path.slice(1)+'index.html'),root));
 assert.equal(r.status,200,path);assert.equal(r.headers.get('x-robots-tag'),'noindex, nofollow',path);assert.ok(body.equals(local),'Exact local/hosted bytes '+path);
 return {path,status:r.status,sha256:createHash('sha256').update(body).digest('hex'),bytes:body.length,exactLocalMatch:true};
}));
const policies=[];
for(const path of ['/robots.txt','/sitemap.xml','/lokal-seo/','/api/leads']){
 const r=await fetch(origin+path),body=await r.text();
 if(path==='/robots.txt')assert.ok(body.includes('Disallow: /'));
 else if(path==='/sitemap.xml')assert.equal(body.includes('<url>'),false);
 else assert.equal(r.status,404,path);
 policies.push({path,status:r.status,robots:r.headers.get('x-robots-tag'),...(path.endsWith('.txt')||path.endsWith('.xml')?{body}:{})});
}
await writeFile(new URL('./hosted-parity.json',import.meta.url),JSON.stringify({origin,checks,policies,livePostCount:0},null,2));
console.log(JSON.stringify({exactRoutes:routes.length,exactAssets:assets.length,policies,livePostCount:0},null,2));
