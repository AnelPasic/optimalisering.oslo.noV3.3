import { createLeadPayload, type LeadPayload } from './lead.ts';
export type OrderPayload = LeadPayload & { intent: 'order'; package: string; company: string; contact: string; phone: string };
export function createOrderPayload(fields: Record<string, string>, source: Record<string, string>): OrderPayload {
  if (fields.form !== 'pakke-bestilling' || !['optimalisering', 'vekst', 'partner'].includes(fields.package)) throw new Error('Velg en gyldig pakke.');
  const company = (fields.company ?? '').trim(), contact = (fields.contact ?? '').trim(), phone = (fields.phone ?? '').trim();
  if (!company || company.length > 200) throw new Error('Skriv inn bedriftens navn.');
  if (!contact || contact.length > 200) throw new Error('Skriv inn kontaktperson.');
  if (phone.length > 40) throw new Error('Telefonnummeret kan ha maksimalt 40 tegn.');
  const validated = createLeadPayload({ website: fields.website, email: fields.email, message: fields.message }, source);
  return { ...validated, form: 'pakke-bestilling', intent: 'order', package: fields.package, company, contact, phone };
}
