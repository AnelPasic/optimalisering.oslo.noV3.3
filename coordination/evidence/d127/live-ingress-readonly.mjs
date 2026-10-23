// GET only: do not submit leads, trigger mail, read secrets or print personal data.
import {writeFile} from 'node:fs/promises';
const checks=[];
for(const path of ['/','/api/lead','/api/lead/','/api/leads']){
 const r=await fetch('https://optimalisering.oslo.no'+path,{signal:AbortSignal.timeout(15000)});
 const body=await r.text();
 checks.push({path,status:r.status,url:r.url,allow:r.headers.get('allow'),contentType:r.headers.get('content-type'),...(path==='/'?{title:body.match(/<title>(.*?)<\/title>/s)?.[1],referencesLegacyApi:body.includes('/api/lead'),referencesNewApi:body.includes('/api/leads')}:{} )});
}
const evidence={date:'2026-10-23',method:'GET only',checks,cloudflare:{project:'optimalisering-oslo-no',domains:['optimalisering.oslo.no','optimalisering-oslo-no.pages.dev'],deployment:'c696c12c-0d01-4834-9717-f54a2c45a80a',commit:'50576b5a2027b9a7f1bd70191a9029f3dc46a89d',repository:'AnelPasic/optimalisering.oslo.no',status:'success',productionEnvironmentNames:['RESEND_API_KEY'],kvBindingNames:[],d1BindingNames:[],reviewWorkerBindingNames:[],productionWorkerCandidateAbsent:true},source:{path:'src/pages/api/lead.ts',blob:'2100ad478657def85676ff5325f074cda989700c',legacyPayload:['website','email','challenge','phone','source','company_website_hp'],legacyAcknowledgement:'success:boolean; no persisted receipt ID',ignoresSendEmailFailure:true,logsLeadPII:true,hasDurableStore:false,hasOrderIntentOrPackage:false},livePostCount:0,secretValuesRead:false,liveInboxReceiptVerified:false};
await writeFile(new URL('./resend-discovery.json',import.meta.url),JSON.stringify(evidence,null,2));console.log(JSON.stringify({checks,livePostCount:0,liveInboxReceiptVerified:false},null,2));
