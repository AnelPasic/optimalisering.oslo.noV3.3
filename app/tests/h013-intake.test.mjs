import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';
import { openLeadStore } from '../server/store.mjs';
import { notifyLead } from '../server/resend.mjs';
const origin='http://127.0.0.1:4321';
const payload={site:'optimalisering.oslo.no',form:'pakke-bestilling',package:'vekst',company:'Synthetic AS',contact:'Synthetic Buyer',phone:'',website:'example.test',email:'synthetic@example.test',message:'Synthetic only',source:{page:'/priser/'}};
async function run(ordersEnabled,callback) {
  const store=openLeadStore(':memory:');
  const server=createAppServer({store,config:{enabled:true,ordersEnabled,origins:new Set([origin]),site:payload.site,sourceCapture:false,email:{}}});
  server.listen(0,'127.0.0.1'); await once(server,'listening');
  const send=(body=payload)=>fetch(`http://127.0.0.1:${server.address().port}/api/leads`,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','Idempotency-Key':'synthetic-h013-order'},body:JSON.stringify(body)});
  try {await callback(send,store);} finally {await new Promise(done=>server.close(done));store.close();}
}
test('orders stay independently disabled when assessment intake is enabled',()=>run(false,async(send,store)=>{
  assert.equal((await send()).status,503); assert.deepEqual(store.counts(),{leads:0,conversions:0});
}));
test('isolated enabled order stores intent once and sends distinct synthetic notification',()=>run(true,async(send,store)=>{
  const first=await send(); assert.equal(first.status,201); const {id}=await first.json();
  assert.equal((await (await send()).json()).id,id);
  assert.equal(store.get(id).payload.package,'vekst');
  assert.equal(store.get(id).payload.company,payload.company);
  assert.deepEqual(store.counts(),{leads:1,conversions:1});
  let email;
  await notifyLead(store,id,{apiKey:'synthetic',from:'noreply@example.test',to:'ops@example.test',transport:async(_url,options)=>{email=JSON.parse(options.body);return new Response('{"id":"synthetic-h013"}');}});
  assert.match(email.subject,/Bestilling/); assert.match(email.text,/vekst/); assert.match(email.text,/Synthetic AS/);
  assert.ok(!email.text.includes('gratis sjekk'));
}));
