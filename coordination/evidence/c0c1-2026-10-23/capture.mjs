// Read-only C0/C1 capture. No form submission, application edits, or deployment.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const out = fileURLToPath(new URL('./', import.meta.url));
await mkdir(out, {recursive:true});
const target = (await (await fetch('http://127.0.0.1:9333/json')).json()).find(t=>t.type==='page' && (t.url==='about:blank' || t.url.startsWith('http://127.0.0.1:433')));
if(!target) throw new Error('Isolated blank audit tab missing');
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
let seq=0;
const pending=new Map(), requests=[], errors=[];
ws.onmessage=({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}}else if(m.method==='Network.requestWillBeSent'){requests.push({method:m.params.request.method,url:m.params.request.url});}else if(m.method==='Runtime.exceptionThrown'){errors.push(m.params.exceptionDetails.text);}};
function cdp(method,params={}) {return new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression) {const r=await cdp('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function snapshot(){return evaluate(`JSON.stringify({url:location.href,title:document.title,header:document.querySelector('header')?.outerHTML,forms:[...document.forms].map(f=>({id:f.id,enabled:f.dataset.enabled,action:f.getAttribute('action'),buttons:[...f.querySelectorAll('button')].map(b=>({text:b.textContent.trim(),disabled:b.disabled}))}))})`);}
async function screenshot(name){const r=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(out+name+'.png',Buffer.from(r.data,'base64'));}
async function navigate(url){await cdp('Page.navigate',{url});for(let i=0;i<100;i++){if(await evaluate(`document.readyState==='complete' && location.href===${JSON.stringify(url)}`))break;await new Promise(r=>setTimeout(r,100));}await evaluate('document.fonts.ready.then(()=>true)');await new Promise(r=>setTimeout(r,120));if(!await evaluate(`!!document.querySelector('header.site-header')`))throw new Error('Rejected unavailable page: '+url);}
async function size(width){await cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});}
async function key(key,code=key){const v={Enter:13,Escape:27,Tab:9}[key];await cdp('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:v,nativeVirtualKeyCode:v,...(key==='Enter'?{text:'\r'}:{})});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:v,nativeVirtualKeyCode:v});}
await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Network.enable');
// Prevent accidental POSTs, including to any external service.
await cdp('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
ws.addEventListener('message',async({data})=>{const m=JSON.parse(data);if(m.method==='Fetch.requestPaused')await cdp(m.params.request.method==='POST'?'Fetch.failRequest':'Fetch.continueRequest',m.params.request.method==='POST'?{requestId:m.params.requestId,errorReason:'BlockedByClient'}:{requestId:m.params.requestId});});
const matrix=[];
for(const width of [1440,900,390,320]){
 await size(width);
 for(const [slug,label] of [['','home'],['synlighet/','synlighet'],['konvertering/','konvertering'],['priser/','priser'],['vurdering/','vurdering'],['kontakt/','kontakt']]){
  await navigate('http://127.0.0.1:4334/'+slug);
  const before=await snapshot();
  await screenshot(`${label}-${width}`);
  const metrics=await evaluate(`(()=>{const rect=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {text:e.textContent.trim(),x:r.x,y:r.y,width:r.width,height:r.height,display:s.display,font:s.fontSize,outline:s.outline,href:e.getAttribute('href'),current:e.getAttribute('aria-current')};};return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,header:rect(document.querySelector('header')),links:[...document.querySelectorAll('header a,header button')].map(rect),robots:document.querySelector('meta[name=robots]')?.content,theme:document.documentElement.dataset.theme,h1:document.querySelector('h1')?.textContent,sections:[...document.querySelectorAll('main section[id]')].map(e=>e.id),forms:[...document.forms].map(f=>({id:f.id,enabled:f.dataset.enabled,action:f.getAttribute('action'),submit:f.querySelector('[type=submit]')?.disabled})),focus:document.activeElement?.outerHTML};})()`);
  matrix.push({route:'/'+slug,width,snapshot:JSON.parse(before),metrics});
 }
}
await size(390);await navigate('http://127.0.0.1:4334/');
const mobileBefore=JSON.parse(await snapshot());
await evaluate(`document.querySelector('[data-home-menu]').focus()`);await key('Enter');
const opened=JSON.parse(await snapshot());await screenshot('mobile-open-390');
await key('Tab');const tabFocus=await evaluate(`({text:document.activeElement?.textContent,href:document.activeElement?.getAttribute('href'),outline:getComputedStyle(document.activeElement).outline})`);await screenshot('mobile-focus-390');
await key('Escape');const escaped=await evaluate(`({expanded:document.querySelector('[data-home-menu]').getAttribute('aria-expanded'),hidden:document.querySelector('#mobile-menu').hidden,focusToggle:document.activeElement===document.querySelector('[data-home-menu]')})`);
await key('Enter');await size(1440);const resized=await evaluate(`({expanded:document.querySelector('[data-home-menu]').getAttribute('aria-expanded'),hidden:document.querySelector('#mobile-menu').hidden})`);
await size(390);await navigate('http://127.0.0.1:4334/');await snapshot();
await evaluate(`document.querySelector('.header-actions a').click()`);await new Promise(r=>setTimeout(r,1300));await snapshot();await screenshot('free-check-390');
const check=await evaluate(`({url:location.href,section:document.querySelector('#sjekk')?.getBoundingClientRect().top,disabled:document.querySelector('[data-home-assessment] [type=submit]').disabled})`);
await navigate('http://127.0.0.1:4334/priser/');await snapshot();
await evaluate(`document.querySelector('[data-package-order] summary').click();document.querySelector('[data-package-order]').scrollIntoView()`);await new Promise(r=>setTimeout(r,1000));await snapshot();await screenshot('order-open-390');
const order=await evaluate(`({open:[...document.querySelectorAll('[data-package-order]')].map(e=>({key:e.dataset.packageKey,open:e.open})),fields:[...document.querySelector('[data-package-order][open] form').elements].map(e=>({name:e.name,required:e.required,disabled:e.disabled}))})`);
await navigate('http://127.0.0.1:4334/priser/?pakke=vekst#bestill');await new Promise(r=>setTimeout(r,1800));await snapshot();await screenshot('order-deeplink-390');
const deepLink=await evaluate(`({url:location.href,open:[...document.querySelectorAll('[data-package-order][open]')].map(e=>e.dataset.packageKey),anchor:!!document.getElementById('bestill')})`);
const hosted=[];
for(const path of ['/','/synlighet/','/priser/','/robots.txt','/sitemap.xml','/api/leads']){try{const r=await fetch('https://optimalisering-oslo-v33.anel.workers.dev'+path);const body=await r.text();hosted.push({path,status:r.status,robots:r.headers.get('x-robots-tag'),noindex:body.includes('noindex'),newOrder:body.includes('package-order-inline'),bodyLength:body.length,...(path==='/robots.txt'||path==='/sitemap.xml'?{body}:{})});if(path==='/')await writeFile(out+'hosted-home.html',body);}catch(e){hosted.push({path,error:e.message});}}
const result={revision:'d0df233',matrix,keyboard:{mobileBefore,opened,tabFocus,escaped,resized},check,order,deepLink,hosted,posts:requests.filter(r=>r.method==='POST'),errors};
await writeFile(out+'observations.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({screenshots:matrix.length+5,checks:matrix.map(x=>({route:x.route,width:x.width,overflow:x.metrics.scrollWidth>x.width,headerHeight:x.metrics.header.height})),keyboard:{tabFocus,escaped,resized},check,order,deepLink,hosted,posts:result.posts,errors},null,2));
ws.close();
