const decoder=new TextDecoder();
function decodeBase64Url(value){const normalized=value.replace(/-/g,'+').replace(/_/g,'/');return Uint8Array.from(atob(normalized.padEnd(Math.ceil(normalized.length/4)*4,'=')),x=>x.charCodeAt(0));}
function parseSegment(value){return JSON.parse(decoder.decode(decodeBase64Url(value)));}

export async function verifyAccess(request,env,network=fetch,now=Date.now()) {
  // Validating the signature is mandatory even behind Access: workers.dev may remain reachable.
  if(!env.ACCESS_ISSUER || !env.ACCESS_AUD || !env.ALLOWED_ADMIN_EMAILS) return false;
  let issuer;
  try {
    issuer=new URL(env.ACCESS_ISSUER);
    if(issuer.protocol!=='https:'||issuer.pathname!=='/'||issuer.search||issuer.hash)return false;
  }catch{return false;}
  const jwt=request.headers.get('Cf-Access-Jwt-Assertion');
  if(!jwt)return false;
  const parts=jwt.split('.');if(parts.length!==3)return false;
  try{
    const header=parseSegment(parts[0]);const payload=parseSegment(parts[1]);
    if(header.alg!=='RS256'||typeof header.kid!=='string'||payload.iss!==issuer.origin||!([].concat(payload.aud||[]).includes(env.ACCESS_AUD)))return false;
    const seconds=Math.floor(now/1000);
    if(!Number.isInteger(payload.exp)||payload.exp<=seconds||!Number.isInteger(payload.iat)||payload.iat>seconds+60|| (payload.nbf && payload.nbf>seconds))return false;
    const allowed=new Set(env.ALLOWED_ADMIN_EMAILS.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean));
    if(!allowed.has(String(payload.email||'').toLowerCase()))return false;
    const response=await network(`${issuer.origin}/cdn-cgi/access/certs`,{signal:AbortSignal.timeout(4000)});
    if(!response.ok)return false;
    const certs=await response.json();const jwk=certs.keys?.find(x=>x.kid===header.kid&&x.kty==='RSA');if(!jwk)return false;
    const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
    return crypto.subtle.verify({name:'RSASSA-PKCS1-v1_5'},key,decodeBase64Url(parts[2]),new TextEncoder().encode(parts[0]+'.'+parts[1]));
  }catch{return false;}
}
