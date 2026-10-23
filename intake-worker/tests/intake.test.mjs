import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import worker from '../src/worker.mjs';
import {notifyOne} from '../src/notify.mjs';
import {verifyAccess} from '../src/access.mjs';
const origin='https://optimalisering.oslo.no';
function environment(){
 const sqlite=new DatabaseSync(':memory:');sqlite.exec(readFileSync(new URL('../migrations/0001_init.sql', import.meta.url),'utf-8'));
 const DB={prepare(sql){return {bind(...args){const q=sqlite.prepare(sql);return {async first(){return q.get(...args)??null},async all(){return {results:q.all(...args)}},async run(){const result=q.run(...args);return {meta:{changes:result.changes}}}}}}}};
 const env={DB,SITES_JSON:JSON.stringify({'optimalisering.oslo.no':{origins:[origin]}}),RESEND_API_KEY:'test-placeholder',RESEND_FROM:'no-reply@example.com',LEAD_TO_EMAIL:'medon@example.com'};
 return {env,sqlite};
}
const body={site:'optimalisering.oslo.no',form:'gratis-sjekk',website:'example.com',email:'user@example.org',message:'Hei',model:'',source:{page:'/vurdering/',utm_source:'test'}};
async function submit(env,ctx,detail=body,key='some-repeat-key-123',overrideOrigin=origin){return worker.fetch(new Request('https://intake.example.com/api/leads',{method:'POST',headers:{Origin:overrideOrigin,'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify(detail)}),env,ctx)}
function context(){const promises=[];return {promises,waitUntil(p){promises.push(p);}}}
test('durable record first; idempotent receipt and Resend confirmation',async()=>{
 const {env,sqlite}=environment(),ctx=context();const saved=globalThis.fetch;
 try{
 let called=0;globalThis.fetch=async (url,opt)=>{called++;const before=sqlite.prepare('SELECT email_status FROM leads').get();assert.equal(before.email_status,'sending');assert.equal(url,'https://api.resend.com/emails');assert.ok(opt.headers['Idempotency-Key']);const msg=JSON.parse(opt.body);assert.match(msg.text,/Nettside:/);return new Response(JSON.stringify({id:'re_test'}),{status:200})};
 let result=await submit(env,ctx);assert.equal(result.status,201);const obj=await result.json();assert.equal(obj.receipt_status,'stored');assert.ok(obj.id);await Promise.all(ctx.promises);assert.equal(called,1);
 assert.equal(sqlite.prepare('SELECT email_status FROM leads').get().email_status,'sent');
 result=await submit(env,context());assert.equal(result.status,200);assert.equal((await result.json()).id,obj.id);
 assert.equal(sqlite.prepare('SELECT count(*) AS n FROM leads').get().n,1);
 }finally{globalThis.fetch=saved;sqlite.close();}
});
test('conflicting idempotency and wrong origin rejected with no extra row',async()=>{
 const {env,sqlite}=environment();const ctx=context();const saved=globalThis.fetch;globalThis.fetch=async()=>new Response(JSON.stringify({id:'id'}),{status:200});
 try{
 assert.equal((await submit(env,ctx)).status,201);await Promise.all(ctx.promises);
 assert.equal((await submit(env,context(),{...body,message:'Different'})).status,409);
 assert.equal((await submit(env,context(),body,'different-key-123','https://unrelated.example')).status,403);
 assert.equal(sqlite.prepare('SELECT count(*) AS n FROM leads').get().n,1);
 }finally{globalThis.fetch=saved;sqlite.close()}
});
test('order fields validated and notification does not contain undefined legacy fields',async()=>{
 const {env,sqlite}=environment(),ctx=context(),saved=globalThis.fetch;
 const order={...body,form:'pakke-bestilling',package:'vekst',phone:'+47 999 99 999',intent:'order'};
 try{
 globalThis.fetch=async (_url,o)=>{const data=JSON.parse(o.body);assert.match(data.text,/Pakke: vekst/);assert.match(data.text,/Telefon: \+47/);assert.doesNotMatch(data.text,/undefined/);return new Response(JSON.stringify({id:'order1'}),{status:200});};
 assert.equal((await submit(env,ctx,order)).status,201);await Promise.all(ctx.promises);
 assert.equal(sqlite.prepare('SELECT form FROM leads').get().form,'pakke-bestilling');
 assert.equal((await submit(env,context(),{...order,phone:''},'order-key-4321')).status,422);
 }finally{globalThis.fetch=saved;sqlite.close()}
});
test('Resend failure leaves durable retry and never falsely acknowledges delivery',async()=>{
 const {env,sqlite}=environment(),ctx=context(),saved=globalThis.fetch;
 try{
 globalThis.fetch=async()=>new Response(JSON.stringify({message:'failure'}),{status:503});
 const receipt=await submit(env,ctx);assert.equal(receipt.status,201);assert.equal((await receipt.json()).receipt_status,'stored');await Promise.all(ctx.promises);
 const pending=sqlite.prepare('SELECT id,email_status,email_attempts,email_due_at_ms FROM leads').get();assert.equal(pending.email_status,'retry');assert.equal(pending.email_attempts,1);
 globalThis.fetch=async()=>new Response(JSON.stringify({id:'retry-ok'}),{status:200});
 const ok=await notifyOne(env,pending.id,pending.email_due_at_ms+1);assert.equal(ok,true);
 assert.equal(sqlite.prepare('SELECT email_status FROM leads').get().email_status,'sent');
 }finally{globalThis.fetch=saved;sqlite.close()}
});
test('admin is denied without signed Access JWT',async()=>{
 const {env,sqlite}=environment();try{const r=await worker.fetch(new Request('https://intake.example.com/admin/api/leads?site=optimalisering.oslo.no'),env,context());assert.equal(r.status,403)}finally{sqlite.close()}
});
test('resend reply and retry limited to 23h window',async()=>{
 const {env,sqlite}=environment(),ctx=context(),saved=globalThis.fetch;
 try{globalThis.fetch=async()=>new Response('not json',{status:503});const result=await submit(env,ctx);assert.equal(result.status,201);await Promise.all(ctx.promises);const lead=sqlite.prepare('SELECT id,first_attempt_at_ms FROM leads').get();sqlite.prepare("UPDATE leads SET email_status='retry',email_due_at_ms=0 WHERE id=?").run(lead.id);assert.equal(await notifyOne(env,lead.id,lead.first_attempt_at_ms+24*60*60_000),false);assert.equal(sqlite.prepare('SELECT email_status FROM leads').get().email_status,'manual_review');}finally{globalThis.fetch=saved;sqlite.close()}
});
test('Access verifies JWT signature, audience, issuer, expiry and operator allowlist',async()=>{
 const keys=await crypto.subtle.generateKey({name:'RSASSA-PKCS1-v1_5',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['sign','verify']);
 const publicJwk=await crypto.subtle.exportKey('jwk',keys.publicKey);publicJwk.kid='key1';
 const env={ACCESS_ISSUER:'https://team.cloudflareaccess.com',ACCESS_AUD:'audit-audience',ALLOWED_ADMIN_EMAILS:'admin@example.org'};
 const enc=o=>Buffer.from(JSON.stringify(o)).toString('base64url');
 const h=enc({typ:'JWT',alg:'RS256',kid:'key1'});
 const signed=async p=>{const b=enc(p);const msg=h+'.'+b;const sig=await crypto.subtle.sign({name:'RSASSA-PKCS1-v1_5'},keys.privateKey,new TextEncoder().encode(msg));return msg+'.'+Buffer.from(sig).toString('base64url')};
 const data={iss:env.ACCESS_ISSUER,aud:[env.ACCESS_AUD],email:'admin@example.org',iat:Math.floor(Date.now()/1000)-10,exp:Math.floor(Date.now()/1000)+3600};
 const fetchKeys=async()=>new Response(JSON.stringify({keys:[publicJwk]}),{status:200});
 assert.equal(await verifyAccess(new Request('https://intake.example.com/admin/',{headers:{'Cf-Access-Jwt-Assertion':await signed(data)}}),env,fetchKeys),true);
 assert.equal(await verifyAccess(new Request('https://intake.example.com/admin/',{headers:{'Cf-Access-Jwt-Assertion':await signed({...data,email:'intruder@example.org'})}}),env,fetchKeys),false);
 assert.equal(await verifyAccess(new Request('https://intake.example.com/admin/',{headers:{'Cf-Access-Jwt-Assertion':await signed({...data,aud:['other']})}}),env,fetchKeys),false);
});
