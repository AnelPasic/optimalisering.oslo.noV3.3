/**
 * Client-side copy for the existing lead.message field; no new intake contract.
 * Package IDs, not labels, control capacity and backend package attribution.
 */
export function createPackageFocusMessage(key:string, labels:string[], partnerNeeds?:string):string{
 if(!['optimalisering','vekst','partner'].includes(key))throw new Error('Ugyldig pakke.');
 if(key==='partner'){
  const needs=(partnerNeeds??'').trim();
  if(needs.length>650)throw new Error('Beskriv behovet med maksimalt 650 tegn.');
  if(labels.length)throw new Error('Partner avklares individuelt.');
  return needs;
 }
 const max=key==='optimalisering'?1:2;
 if(labels.length>max)throw new Error('Velg maksimalt '+max+' fokusområde'+(max===1?'':'r')+'.');
 const names=labels.map(label=>label.trim());
 if(names.some(label=>!label||label.length>140)||new Set(names).size!==names.length)
  throw new Error('Ugyldige fokusområder.');
 return names.length?'Ønsket fokusområde'+(names.length===1?'':'r')+': '+names.join(' + ')+'. Endelig omfang avklares før oppstart.':'';
}
