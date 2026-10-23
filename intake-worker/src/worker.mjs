import {json,parseSites,allowedOrigin,readSmallJson,validateLead,hashPayload} from './domain.mjs';
import {notifyOne,retryDue} from './notify.mjs';
import {verifyAccess} from './access.mjs';

function headers(origin){return origin?{'Access-Control-Allow-Origin':origin,'Vary':'Origin'}:{'Vary':'Origin'};}
const health=()=>json({ok:true});
async function intake(request,env,ctx,sites,origin) {
  if(!origin || !allowedOrigin(sites,origin))return json({ok:false},403);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers(origin),'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Idempotency-Key','Access-Control-Max-Age':'300'}});
  if(request.method!=='POST')return json({ok:false},405,headers(origin));
  const key=request.headers.get('Idempotency-Key');if(!key || !/^[a-zA-Z0-9_-]{8,100}$/.test(key))return json({ok:false,error:'idempotency-required'},422,headers(origin));
  let payload;
  try{payload=validateLead(await readSmallJson(request),sites,origin);}catch(e){return json({ok:false,error:'validation'},422,headers(origin));}
  const hash=await hashPayload(payload),id=crypto.randomUUID(),now=Date.now();
  const insert=await env.DB.prepare(`INSERT OR IGNORE INTO leads (id,site_id,submission_id,form,payload_json,payload_hash,created_at_ms,email_due_at_ms)
      VALUES (?,?,?,?,?,?,?,?)`).bind(id,payload.site,key,payload.form,JSON.stringify(payload),hash,now,now).run();
  const created=insert.meta?.changes===1;
  const stored=created ? {id,payload_hash:hash,email_status:'pending'} : await env.DB.prepare('SELECT id,payload_hash,email_status FROM leads WHERE site_id=? AND submission_id=?').bind(payload.site,key).first();
  if(!stored)return json({ok:false},503,headers(origin));
  if(stored.payload_hash!==hash)return json({ok:false,error:'idempotency-conflict'},409,headers(origin));
  if(stored.email_status!=='sent'&&stored.email_status!=='manual_review')ctx.waitUntil(notifyOne(env,stored.id));
  return json({ok:true,id:stored.id,receipt_status:'stored'},created?201:200,headers(origin));
}
function adminHtml(){return `<!doctype html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Henvendelser – Medon</title><style>body{font:16px system-ui;max-width:1100px;margin:40px auto;padding:0 20px;color:#242936}table{border-collapse:collapse;width:100%}td,th{padding:12px;border-bottom:1px solid #ddd;text-align:left}button,a{padding:8px;cursor:pointer}select{font:inherit}pre{white-space:pre-wrap;overflow-wrap:anywhere}caption{text-align:left}</style></head><body><h1>Henvendelser (reservekopi)</h1><p>Visning og eksport. Behandling og oppfølging skal skje i LeadProof når den er klar.</p><label>Nettside <select id="site"></select></label><button id="reload">Oppdater</button> <button id="export">Eksporter alle til JSON</button><table><caption>Nyeste registrerte</caption><thead><tr><th>Dato</th><th>Type</th><th>E-post</th><th>Varsling</th></tr></thead><tbody id="rows"></tbody></table><h2>Valgt henvendelse</h2><pre id="details"></pre><script>const s=document.querySelector('#site'),rows=document.querySelector('#rows'),details=document.querySelector('#details');let data=[];async function load(){rows.replaceChildren();details.textContent='';const r=await fetch('/admin/api/leads?site='+encodeURIComponent(s.value),{cache:'no-store'});if(!r.ok){details.textContent='Kunne ikke hente data';return;}const j=await r.json();data=j.leads;for(const lead of data){const tr=document.createElement('tr');for(const value of [new Date(lead.created_at_ms).toLocaleString('nb-NO'),lead.form,lead.email,lead.email_status]){const td=document.createElement('td');td.textContent=String(value);tr.append(td);}tr.tabIndex=0;tr.addEventListener('click',()=>details.textContent=JSON.stringify(lead,null,2));tr.addEventListener('keydown',e=>{if(e.key==='Enter')tr.click()});rows.append(tr);}};async function exportAll(){const all=[];let offset=0;while(true){const r=await fetch('/admin/api/export?site='+encodeURIComponent(s.value)+'&offset='+offset,{cache:'no-store'});if(!r.ok){alert('Eksport feilet');return;}const page=await r.json();all.push(...page.leads);if(page.next_offset===null)break;offset=page.next_offset;if(offset>100000){alert('For stor eksport; bruk administrativ backup');return;}}const blob=new Blob([JSON.stringify({site:s.value,exported_at:new Date().toISOString(),leads:all},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='leads-'+s.value+'.json';a.click();URL.revokeObjectURL(url);}document.querySelector('#export').addEventListener('click',exportAll);async function start(){const r=await fetch('/admin/api/sites',{cache:'no-store'});if(!r.ok)return;for(const site of (await r.json()).sites){const o=document.createElement('option');o.value=site;o.textContent=site;s.append(o);}if(s.value)await load();}document.querySelector('#reload').addEventListener('click',load);s.addEventListener('change',load);start();</script></body></html>`;}
async function admin(request,env,url,sites){
  if(!await verifyAccess(request,env))return json({ok:false},403);
  const h={'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff'};
  if(url.pathname==='/admin/'&&request.method==='GET')return new Response(adminHtml(),{headers:{...h,'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'"}});
  if(url.pathname==='/admin/api/sites'&&request.method==='GET')return json({sites:[...sites.keys()]},200,h);
  const site=url.searchParams.get('site');if(!site||!sites.has(site))return json({ok:false},422,h);
  if(request.method!=='GET')return json({ok:false},405,h);
  if(['/admin/api/leads','/admin/api/export'].includes(url.pathname)){
    const isExport=url.pathname==='/admin/api/export';
    const offset=isExport?Number(url.searchParams.get('offset')||'0'):0;
    if(!Number.isSafeInteger(offset)||offset<0||offset>100000)return json({ok:false},422,h);
    const limit=isExport?500:100;
    const rows=await env.DB.prepare('SELECT id,site_id,submission_id,form,payload_json,created_at_ms,email_status,email_attempts,last_error,resend_message_id,leadproof_status FROM leads WHERE site_id=? ORDER BY created_at_ms DESC,id DESC LIMIT ? OFFSET ?').bind(site,limit+1,offset).all();
    const more=(rows.results||[]).length>limit;
    const leads=(rows.results||[]).slice(0,limit).map(r=>({id:r.id,site:r.site_id,submission_id:r.submission_id,form:r.form,...JSON.parse(r.payload_json),created_at_ms:r.created_at_ms,email_status:r.email_status,email_attempts:r.email_attempts,last_error:r.last_error,resend_message_id:r.resend_message_id,leadproof_status:r.leadproof_status}));
    if(isExport)return json({site,leads,next_offset:more?offset+limit:null},200,h);
    return json({leads,limit},200,h);
  }
  return json({ok:false},404,h);
}
export default {
  async fetch(request,env,ctx) {
    const url=new URL(request.url);if(url.pathname==='/health')return health();
    if(!env.DB)return json({ok:false,error:'not-configured'},503);
    let sites;try{sites=parseSites(env);}catch{return json({ok:false,error:'not-configured'},503);}
    try{
      if(url.pathname==='/api/leads')return await intake(request,env,ctx,sites,request.headers.get('Origin'));
      if(url.pathname.startsWith('/admin'))return await admin(request,env,url,sites);
      return json({ok:false},404);
    }catch{return json({ok:false,error:'unavailable'},503);}
  },
  async scheduled(_controller,env){if(!env.DB)return;await retryDue(env);}
};
