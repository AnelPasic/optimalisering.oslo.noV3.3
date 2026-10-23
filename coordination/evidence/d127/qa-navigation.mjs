import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const output=new URL('./',import.meta.url);
const origin=process.env.NAV_QA_ORIGIN||'http://127.0.0.1:4334';
const tag=process.env.NAV_QA_TAG||'local';
const target=(await(await fetch('http://127.0.0.1:9333/json')).json()).find(t=>t.type==='page');
const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let seq=0;const pending=new Map(),posts=[],errors=[];
const cdp=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
ws.onmessage=({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);else if(m.method==='Network.requestWillBeSent'&&m.params.request.method==='POST')posts.push(m.params.request.url);else if(m.method==='Fetch.requestPaused')cdp(m.params.request.method==='POST'?'Fetch.failRequest':'Fetch.continueRequest',m.params.request.method==='POST'?{requestId:m.params.requestId,errorReason:'BlockedByClient'}:{requestId:m.params.requestId});};
async function ev(expression){const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function goto(path){await cdp('Page.navigate',{url:origin+path});for(let i=0;i<100;i++){if(await ev(`document.readyState==='complete'&&!!document.querySelector('.site-header')&&location.pathname===${JSON.stringify(path.split('#')[0])}`))break;await pause(100);}await ev('document.fonts.ready.then(()=>true)');await pause(150);}
async function size(width){await cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});await pause(100);}
async function key(key){const v={Enter:13,Escape:27,Tab:9,ArrowDown:40,' ':32}[key];await cdp('Input.dispatchKeyEvent',{type:'keyDown',key,code:key===' '?'Space':key,windowsVirtualKeyCode:v,nativeVirtualKeyCode:v,...(key==='Enter'?{text:'\r'}:{})});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key,code:key===' '?'Space':key,windowsVirtualKeyCode:v,nativeVirtualKeyCode:v});await pause(30);}
async function click(selector){const rect=await ev(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing target');const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,label:e.textContent,aria:e.getAttribute('aria-label')};})()`);await cdp('Input.dispatchMouseEvent',{type:'mousePressed',x:rect.x,y:rect.y,button:'left',clickCount:1});await cdp('Input.dispatchMouseEvent',{type:'mouseReleased',x:rect.x,y:rect.y,button:'left',clickCount:1});await pause(80);}
async function shot(name){const s=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(new URL(tag+'-'+name+'.png',output),Buffer.from(s.data,'base64'));}
await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Network.enable');await cdp('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
const widths=[];
for(const width of [1440,1000,901,900,390,320]){
 await size(width);await goto('/seo/');
 const mobile=width<=900,scope=mobile?'#mobile-menu':'.desktop-nav',button=scope+' [data-nav-disclosure]';
 if(mobile)await click('[data-home-menu]');
 await ev(`document.querySelector(${JSON.stringify(button)}).focus()`);await key('Enter');
 assert.equal(await ev(`document.querySelector(${JSON.stringify(button)}).getAttribute('aria-expanded')`),'true');
 await key('Tab');assert.equal(await ev(`document.activeElement.getAttribute('href')`),'/seo/',await ev(`document.activeElement.outerHTML.slice(0,400)`));
 const metrics=await ev(`(()=>{const visible=e=>e.getBoundingClientRect().width>0;const rect=e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height,x:r.x,right:r.right}};return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,headerHeight:document.querySelector('header').getBoundingClientRect().height,current:[...document.querySelectorAll('header [aria-current=page]')].filter(visible).map(e=>e.getAttribute('href')),parentContext:document.querySelector(${JSON.stringify(scope+' [data-active-parent]')})!==null,controls:[...document.querySelectorAll('header button')].filter(visible).map(e=>({label:e.getAttribute('aria-label'),...rect(e)})),links:[...document.querySelectorAll(${JSON.stringify(scope+' .header-submenu a')})].map(e=>({text:e.textContent,href:e.getAttribute('href'),font:getComputedStyle(e).fontSize,...rect(e)})),cta:rect(document.querySelector('.header-actions>a')),robots:document.querySelector('meta[name=robots]')?.content};})()`);
 widths.push(metrics);assert.ok(metrics.scrollWidth<=width,'No overflow at '+width);assert.deepEqual(metrics.current,['/seo/']);assert.ok(metrics.parentContext);assert.ok(metrics.controls.every(c=>c.width>=43.9&&c.height>=43.9),'44px controls at '+width);assert.ok(metrics.links.every(l=>l.height>=44));assert.ok(metrics.cta.right<=width);
 if([1440,900,390,320].includes(width))await shot('dropdown-'+width);
 await key('Escape');assert.equal(await ev(`document.activeElement===document.querySelector(${JSON.stringify(button)})`),true);
 await key(' ');assert.equal(await ev(`document.querySelector(${JSON.stringify(button)}).getAttribute('aria-expanded')`),'true');
 await click('main h1');assert.equal(await ev(`document.querySelector(${JSON.stringify(button)}).getAttribute('aria-expanded')`),'false');
 if(mobile){assert.equal(await ev(`document.querySelector('#mobile-menu').hidden`),true);await click('[data-home-menu]');}
 await click(scope+' .header-nav-parent>a');await pause(250);
 assert.equal(await ev('location.pathname'),'/synlighet/','Parent remains a real link');
}
const routes=[];
for(const route of ['/','/synlighet/','/seo/','/ai-synlighet/','/konvertering/','/priser/','/vurdering/','/kontakt/']){
 await size(1440);await goto(route);
 const check=await ev(`({path:location.pathname,current:[...document.querySelectorAll('header [aria-current=page]')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.getAttribute('href')),forms:[...document.forms].map(f=>({enabled:f.dataset.enabled,hardDisabled:!!f.querySelector('[type=submit]')?.disabled})),noindex:document.querySelector('meta[name=robots]')?.content,duplicates:[...new Set([...document.querySelectorAll('[id]')].map(e=>e.id))].filter(id=>document.querySelectorAll('[id="'+id+'"]').length>1)})`);
 assert.equal(check.duplicates.length,0);assert.ok(check.noindex.includes('noindex'));assert.ok(check.current.length<=1);routes.push(check);
}
await size(390);await goto('/');await click('[data-home-menu]');await click('#mobile-menu [data-nav-disclosure]');await size(1440);
assert.equal(await ev(`document.querySelector('#mobile-menu').hidden`),true);assert.equal(await ev(`document.activeElement.closest('[hidden]')===null`),true);
await goto('/synlighet/');assert.equal(await ev(`!!document.getElementById('lokal-synlighet')`),true);
assert.equal(await ev(`[...document.querySelectorAll('main a')].some(a=>a.getAttribute('href')==='/seo/')&&[...document.querySelectorAll('main a')].some(a=>a.getAttribute('href')==='/ai-synlighet/')`),true);
const localResponse=await fetch(origin+'/lokal-seo/');assert.equal(localResponse.status,404,'Unapproved draft has no route');
assert.equal(posts.length,0);assert.equal(errors.length,0);
await writeFile(new URL(tag+'-browser.json',output),JSON.stringify({origin,widths,routes,postCount:posts.length,runtimeExceptions:errors,keyboard:'Enter/Space/Tab/Escape, focus return, parent navigation, outside click, breakpoint close passed',draftRouteStatus:localResponse.status},null,2));
console.log(JSON.stringify({origin,widths:widths.map(w=>({width:w.width,overflow:w.scrollWidth>w.width,controls:w.controls})),routes:routes.length,posts:posts.length,errors,keyboard:'PASS',draftRouteStatus:localResponse.status},null,2));ws.close();
