import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { execFileSync } from 'node:child_process';
import { createAppServer } from '../server/http.mjs';

const phase = process.env.QA_PHASE || 'after';
const output = resolve(`../coordination/evidence/h019/${phase}`);
mkdirSync(output, { recursive: true });
const properties = ['color','backgroundColor','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','textAlign','padding','margin','borderRadius','borderWidth','borderColor','boxShadow','display','gridTemplateColumns','gap','maxWidth','objectFit','objectPosition'];
const fixture = 'src/pages/h019-qa-temp.astro';
const variants = ['default','base-100','base-200','info','lavender','secondary'];
const build = () => execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], { stdio: 'pipe' });
if (phase === 'after') {
  assert.equal(existsSync(fixture), false, 'Do not overwrite an existing route');
  writeFileSync(fixture, `---\nimport Layout from '../layouts/SiteLayout.astro';\nimport HomeSection from '../components/HomeSection.astro';\nimport ContentSection from '../components/ContentSection.astro';\nimport home from '../content/pages/home.json';\nimport service from '../content/pages/synlighet.json';\nconst variants = ${JSON.stringify(variants)};\nconst normal = home.sections[0];\nconst item = { ...normal.items[0], href: home.cta.href, label: home.cta.label };\n---\n<Layout title="H-019 local QA" description="Local QA" noindex homeVisual serviceVisual homeChrome={home.homepage.chrome}><main><div class="invite-home invite-service">{variants.map(surface => <HomeSection section={{ ...normal, id: 'matrix-home-' + surface, surface, items: variants.map(surface => ({ ...item, surface })) }} visualId="behov" />)}{variants.map(surface => <HomeSection section={{ ...service.sections[0], id: 'matrix-auto-' + surface, surface }} visualId="behov" />)}<HomeSection section={{ ...service.sections.at(-1), _block: 'protected', surface: 'secondary' }} /></div><div class="invite-home">{variants.map(surface => <div data-fixture={"matrix-flat-" + surface}><HomeSection section={{ ...normal, surface }} /></div>)}</div><div>{variants.map(surface => <div data-fixture={"matrix-process-" + surface}><ContentSection section={{ ...normal, id: "sjekk", surface }} /></div>)}{variants.map(surface => <ContentSection section={{ ...normal, id: 'matrix-legacy-' + surface, surface, items: variants.map(surface => ({ ...item, surface })) }} />)}{variants.map(surface => <ContentSection section={{ ...normal, id: 'matrix-legacy-auto-' + surface, surface }} />)}</div></main></Layout>`);
  build();
}
const server = process.env.QA_BASE_URL ? null : createAppServer({ config: { enabled: false }, staticRoot: resolve('dist') });
if (server) { server.listen(0, '127.0.0.1'); await once(server, 'listening'); }
const base = process.env.QA_BASE_URL || `http://127.0.0.1:${server.address().port}`;
const routes = ['/', ...readdirSync('src/content/pages').filter(f => f.endsWith('.json')).map(f => JSON.parse(readFileSync(`src/content/pages/${f}`, 'utf8')).slug).filter(s => s !== 'home').map(s => `/${s}/`), '/begreper/'];
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const records = [], matrix = [], errors = [], posts = [];
// The unchanged chart animates two non-text endpoint circles during hydration.
// Preserve raw evidence; compare their x/size/style but not transient cy.
const stable = snapshot => snapshot.map(node => node.tag === 'circle' && node.rect[2] === 6 && node.rect[3] === 6 ? { ...node, rect: [node.rect[0], null, node.rect[2], node.rect[3]] } : node);
try {
  for (const width of [1440,900,390,320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (r.method() === 'POST') posts.push(r.url()); });
    for (const route of routes) {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const snapshot = await page.evaluate(properties => [...document.querySelectorAll('main,main *,.site-header,.site-header *,.site-footer,.site-footer *')].map(e => {
        const s=getComputedStyle(e), r=e.getBoundingClientRect();
        return { tag:e.tagName, id:e.id, classes:typeof e.className==='string'?e.className:'', text:[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join(''), src:e.getAttribute('src'), alt:e.getAttribute('alt'), rect:[r.x,r.y,r.width,r.height], style:Object.fromEntries(properties.map(p=>[p,s[p]])), surface:e.getAttribute('data-surface') };
      }), properties);
      if (phase !== 'before') {
        const previous = JSON.parse(readFileSync('../coordination/evidence/h019/before/checks.json','utf8')).records.find(r=>r.route===route&&r.width===width);
        assert.deepEqual(stable(snapshot), stable(previous.snapshot), `${route} ${width}: exact default rendering`);
      }
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      if (['/','/synlighet/'].includes(route)) await page.screenshot({path:`${output}/${route==='/'?'home':'synlighet'}-${width}.png`,fullPage:true});
      records.push({route,width,snapshot});
    }
    if (phase === 'after') {
      assert.equal((await page.goto(base + '/h019-qa-temp/')).status(), 200);
      await page.evaluate(()=>document.fonts.ready);
      const rows = await page.evaluate(properties => [...document.querySelectorAll('.content-section')].map(section => {
        const inspect = e => { const s=getComputedStyle(e),r=e.getBoundingClientRect();return { text:e.textContent, style:Object.fromEntries(properties.map(p=>[p,s[p]])), width:r.width,height:r.height, surface:e.getAttribute('data-surface') }; };
        const contrast = e => {
          const rgb = c => c.match(/[\d.]+/g)?.map(Number) ?? [];
          const luminance = c => rgb(c).slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
          const fg=getComputedStyle(e).color;
          let p=e,bg;while(p){bg=getComputedStyle(p).backgroundColor;if((rgb(bg)[3]??1)>0)break;p=p.parentElement;}
          const a=luminance(fg),b=luminance(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
        };
        const text=[...section.querySelectorAll('*')].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&e.getBoundingClientRect().width>0).map(e=>({text:e.textContent,selector:e.tagName+'.'+e.className,card:e.closest('.info-item')?.getAttribute('data-surface'),color:getComputedStyle(e).color,ratio:contrast(e)}));
        return {id:section.closest("[data-fixture]")?.getAttribute("data-fixture") || section.id,section:inspect(section),cards:[...section.querySelectorAll('.info-item')].map(inspect),text};
      }), properties);
      writeFileSync(`${output}/matrix-${width}.json`,JSON.stringify(rows,null,2));
      for (const row of rows) {
        for (const t of row.text) assert.ok(t.ratio>=4.5, `${row.id}: ${t.text} contrast ${t.ratio}`);
        const family=row.id.replace(/-(default|base-100|base-200|info|lavender|secondary)$/,'');
        const standard=rows.find(r=>r.id===family+'-default');
        if (standard) {
          const frozen=o=>Object.fromEntries(Object.entries(o.style).filter(([p])=>!['color','backgroundColor','borderColor'].includes(p)));
          assert.deepEqual(frozen(row.section),frozen(standard.section),row.id+' section geometry/type');
          assert.equal(row.section.width,standard.section.width);assert.equal(row.section.height,standard.section.height);
          assert.equal(row.section.text,standard.section.text);
          row.cards.forEach((c,i)=>{assert.deepEqual(frozen(c),frozen(standard.cards[i]),row.id+' card geometry/type');assert.equal(c.width,standard.cards[i].width);assert.equal(c.height,standard.cards[i].height);assert.equal(c.text,standard.cards[i].text);});
        }
      }
      assert.equal(await page.locator('.invite-service #sjekk').getAttribute('data-surface'),null,'Protected CTA ignores override');
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      for(const value of ['default','info','lavender','secondary']) await page.locator(`#matrix-home-${value}`).screenshot({path:`${output}/matrix-${value}-${width}.png`});
      matrix.push({width,rows});
    }
    await page.close();
  }
  assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
  writeFileSync(`${output}/checks.json`,JSON.stringify({phase,base,records,matrix,errors,posts},null,2));
  console.log(`H-019 ${phase} PASS: ${records.length} exact default route/width groups; ${matrix.length} four-width section/card color/contrast matrices; zero overflow/errors/POST.`);
} finally { await browser.close();if(server)await new Promise(r=>server.close(r));if(phase==='after'){unlinkSync(fixture);build();} }
