import assert from 'node:assert/strict';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';

const base='https://optimalisering-oslo-v33.anel.workers.dev';
const root=resolve('dist');
const digest=data=>createHash('sha256').update(data).digest('hex');
function walk(path) { return readdirSync(path,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${path}/${e.name}`):`${path}/${e.name}`); }
const files=walk(root).filter(p=>!['_headers','_redirects'].includes(p.split('/').at(-1)));
const records=[];
// Bounded parallel read-only requests. No intake submissions or external services.
for(let i=0;i<files.length;i+=6) await Promise.all(files.slice(i,i+6).map(async file=>{
  const name=relative(root,file).replaceAll('\\','/');
  const path=name==='index.html'?'/':name.endsWith('/index.html')?'/'+name.slice(0,-10):'/'+name;
  const response=await fetch(base+path,{headers:{'Cache-Control':'no-cache'}});
  assert.equal(response.status,200,path); // Direct /404.html is an asset; unknown URLs are checked below.
  const remote=Buffer.from(await response.arrayBuffer());
  const local=readFileSync(file), byteEqual=remote.equals(local);
  const lineEndingEquivalent=!byteEqual && /\.(css|html|js|json|txt|xml|svg)$/.test(name) && remote.toString().replaceAll('\r\n','\n')===local.toString().replaceAll('\r\n','\n');
  assert.ok(byteEqual||lineEndingEquivalent,`${path}: deployed bytes or text-only CRLF/LF equivalence`);
  if(name.endsWith('.html')) {
    const html=remote.toString();
    assert.match(html,/content="noindex, nofollow"/);
    assert.match(response.headers.get('x-robots-tag')||'',/noindex/);
    assert.equal(html.includes('class="radio theme-controller"'),path==='/design-system/');
  }
  records.push({path,status:response.status,byteEqual,lineEndingEquivalent,sha256:digest(remote),bytes:remote.length});
}));
const robots=await (await fetch(base+'/robots.txt')).text(); assert.match(robots,/Disallow: \//);
const sitemap=await (await fetch(base+'/sitemap.xml')).text(); assert.ok(!sitemap.includes('<loc>'));
for(const path of ['/api/leads','/api/orders','/not-a-real-h023a-page/']) assert.equal((await fetch(base+path)).status,404);
const home=await (await fetch(base+'/')).text();assert.match(home,/<button[^>]+type="submit"[^>]*disabled/);
records.sort((a,b)=>a.path.localeCompare(b.path));
writeFileSync('../coordination/evidence/h023a/live-assets.json',JSON.stringify({base,matchedAssets:records.length,noindex:true,intakeDisabled:true,robotsBlocked:true,sitemapEmpty:true,custom404:true,records},null,2)+'\n');
console.log(`H-023A live: ${records.length} matching assets (${records.filter(r=>r.lineEndingEquivalent).length} text-only line-ending equivalents); noindex, disabled intake, blocked robots, empty sitemap and 404 PASS.`);
