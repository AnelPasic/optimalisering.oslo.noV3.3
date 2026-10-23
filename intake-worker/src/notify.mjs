const RETRY_STEPS=[60_000,5*60_000,15*60_000,60*60_000,4*60*60_000];
const MAX_ATTEMPTS=5;
const MAX_IDEMPOTENCY_AGE=23*60*60_000;

export async function notifyOne(env,id,now=Date.now(),transport=fetch) {
  const claim=await env.DB.prepare(`UPDATE leads SET email_status='sending', lease_until_ms=?, email_attempts=email_attempts+1,
    first_attempt_at_ms=COALESCE(first_attempt_at_ms,?)
    WHERE id=? AND email_attempts < ? AND (email_status='pending' OR (email_status='retry' AND email_due_at_ms<=?)
    OR (email_status='sending' AND lease_until_ms<=?))`).bind(now+60_000,now,id,MAX_ATTEMPTS,now,now).run();
  if(claim.meta?.changes!==1)return false;
  const lead=await env.DB.prepare('SELECT * FROM leads WHERE id=?').bind(id).first();
  if(!lead)return false;
  if(now-lead.first_attempt_at_ms>MAX_IDEMPOTENCY_AGE){
    await env.DB.prepare("UPDATE leads SET email_status='manual_review',last_error='idempotency-window-expired',lease_until_ms=0 WHERE id=?").bind(id).run();
    return false;
  }
  let resendId=null,errorCode=null;
  try {
    if(!env.RESEND_API_KEY || !env.RESEND_FROM || !env.LEAD_TO_EMAIL)throw Error('unconfigured');
    const p=JSON.parse(lead.payload_json);const isOrder=p.form==='pakke-bestilling';
    const lines=[`Type: ${isOrder?'Pakkebestilling':'Gratis sjekk'}`,
      ...(isOrder?[`Pakke: ${p.package}`,`Telefon: ${p.phone}`]:[]),`Nettside: ${p.website}`,`E-post: ${p.email}`,
      `Behov: ${p.model||'Ikke oppgitt'}`,`Melding: ${p.message||'Ikke oppgitt'}`,`Side: ${p.site}`,`Referanse: ${lead.id}`,`Kilde: ${JSON.stringify(p.source)}`];
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),8000);
    let response;
    try{response=await transport('https://api.resend.com/emails',{
      method:'POST', headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`intake/${id}`},
      body:JSON.stringify({from:env.RESEND_FROM,to:[env.LEAD_TO_EMAIL],reply_to:p.email,subject:isOrder?'Bestilling – Optimalisering Oslo':'Gratis sjekk – Optimalisering Oslo',text:lines.join('\n\n')}),signal:controller.signal
    });}finally{clearTimeout(timeout);}
    let data;try{data=await response.json();}catch{data={};}
    if(!response.ok || typeof data.id!=='string' || !data.id)throw Error(`resend-${response.status}`);
    resendId=data.id;
  }catch(e){errorCode=String(e?.message||'send-error').slice(0,60);}
  if(resendId){await env.DB.prepare("UPDATE leads SET email_status='sent',resend_message_id=?,last_error=NULL,lease_until_ms=0 WHERE id=? AND email_status='sending'").bind(resendId,id).run();return true;}
  const dead=lead.email_attempts>=MAX_ATTEMPTS;
  const due=now+RETRY_STEPS[Math.min(lead.email_attempts-1,RETRY_STEPS.length-1)];
  await env.DB.prepare("UPDATE leads SET email_status=?,email_due_at_ms=?,last_error=?,lease_until_ms=0 WHERE id=? AND email_status='sending'")
    .bind(dead?'manual_review':'retry',due,errorCode,id).run();
  return false;
}

export async function retryDue(env, now=Date.now(), transport=fetch) {
  // A worker crash on the final claimed attempt must not strand a row in 'sending'.
  await env.DB.prepare("UPDATE leads SET email_status='manual_review',last_error='final-attempt-interrupted',lease_until_ms=0 WHERE email_status='sending' AND email_attempts>=5 AND lease_until_ms<=?").bind(now).run();
  const rows=await env.DB.prepare("SELECT id FROM leads WHERE email_attempts < 5 AND (email_status='pending' OR (email_status='retry' AND email_due_at_ms<=?) OR (email_status='sending' AND lease_until_ms<=?)) ORDER BY created_at_ms ASC LIMIT 25")
    .bind(now,now).all();
  for(const row of rows.results || [])await notifyOne(env,row.id,now,transport);
}
