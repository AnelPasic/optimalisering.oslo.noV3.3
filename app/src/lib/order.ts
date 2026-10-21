import { createLeadPayload, type LeadPayload } from './lead.ts';
export type OrderPayload = LeadPayload & { intent:'order'; package:string; phone:string; company?:string; contact?:string };
export function createOrderPayload(fields:Record<string,string>, source:Record<string,string>):OrderPayload {
  if (fields.form !== 'pakke-bestilling' || !['optimalisering','vekst','partner'].includes(fields.package)) throw new Error('Velg en gyldig pakke.');
  const company = (fields.company ?? '').trim(), contact=(fields.contact ?? '').trim(), phone=(fields.phone ?? '').trim();
  if (company.length>200) throw new Error('Bedriftsnavnet kan ha maksimalt 200 tegn.');
  if (contact.length>200) throw new Error('Kontaktpersonen kan ha maksimalt 200 tegn.');
  if (!/^[+()\d .-]{5,40}$/.test(phone) || !/\d/.test(phone)) throw new Error('Skriv inn et gyldig telefonnummer.');
  const validated = createLeadPayload({website:fields.website,email:fields.email,message:fields.message},source);
  return {...validated,form:'pakke-bestilling',intent:'order',package:fields.package,phone,...(company?{company}:{}),...(contact?{contact}:{})};
}
