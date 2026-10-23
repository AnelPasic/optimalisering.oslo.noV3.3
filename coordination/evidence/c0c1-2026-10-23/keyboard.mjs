import {readFile,writeFile} from 'node:fs/promises';
const base=new URL('./',import.meta.url);
const tabs=await(await fetch('http://127.0.0.1:9333/json')).json();
const target=tabs.find(t=>t.type==='page'&&t.url.startsWith('http://127.0.0.1:4334'));
const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let seq=0;const pending=new Map();ws.onmessage=({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}};
function cdp(method,params={}){return new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
async function ev(expression){const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function key(key){const v={Enter:13,Escape:27,Tab:9,' ':32}[key];const code={' ':'Space'}[key]??key;await cdp('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:v,nativeVirtualKeyCode:v,...(key==='Enter'?{text:'\r'}:{})});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:v,nativeVirtualKeyCode:v});}
async function shot(name){await new Promise(r=>setTimeout(r,120));const s=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(new URL(name+'.png',base),Buffer.from(s.data,'base64'));}
async function state(){return ev(`({expanded:document.querySelector('[data-home-menu]').getAttribute('aria-expanded'),hidden:document.querySelector('#mobile-menu').hidden,focus:document.activeElement?.outerHTML,focusToggle:document.activeElement===document.querySelector('[data-home-menu]'),outline:getComputedStyle(document.activeElement).outline,menuTargets:[...document.querySelectorAll('#mobile-menu a')].map(e=>{const r=e.getBoundingClientRect();return {text:e.textContent.trim(),width:r.width,height:r.height}})})`);}
await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:false});
await cdp('Page.navigate',{url:'http://127.0.0.1:4334/'});await new Promise(r=>setTimeout(r,1000));await ev('document.fonts.ready.then(()=>true)');
const before=await ev(`document.querySelector('header').outerHTML`);
await ev(`document.querySelector('[data-home-menu]').focus()`);await key('Enter');
const enter=await state();await shot('mobile-open-390');await key('Tab');const tab=await state();await shot('mobile-focus-390');await key('Escape');const escape=await state();
await key(' ');const space=await state();await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});await new Promise(r=>setTimeout(r,120));const resize=await state();
await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:false});await ev(`document.querySelector('[data-home-menu]').focus()`);await key('Enter');await key('Tab');await key('Enter');await new Promise(r=>setTimeout(r,1000));const followed=await ev(`({url:location.href,hidden:document.querySelector('#mobile-menu').hidden,active:[...document.querySelectorAll('header [aria-current]')].length})`);
await cdp('Page.navigate',{url:'http://127.0.0.1:4334/priser/?pakke=vekst#bestill'});await new Promise(r=>setTimeout(r,1800));
const deepLink=await ev(`({url:location.href,open:[...document.querySelectorAll('[data-package-order][open]')].map(e=>({key:e.dataset.packageKey,top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom})),anchor:!!document.getElementById('bestill')})`);await shot('order-deeplink-390');
const result={before,enter,tab,escape,space,resize,followed};const obs=JSON.parse(await readFile(new URL('observations.json',base)));obs.keyboard=result;obs.deepLink=deepLink;await writeFile(new URL('observations.json',base),JSON.stringify(obs,null,2));console.log(JSON.stringify({enter:enter.expanded,tab:tab.focus.slice(0,60),escape:escape.focusToggle,space:space.expanded,resize:resize.hidden,followed,deepLink},null,2));ws.close();
