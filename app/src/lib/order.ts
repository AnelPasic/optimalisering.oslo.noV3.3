import { createLeadPayload, type LeadPayload } from './lead.ts';

export const needFocusLabels = {
  synlighet: 'Synlighet',
  konvertering: 'Konvertering',
  'synlighet-konvertering': 'Synlighet og konvertering',
} as const;

type NeedFocus = keyof typeof needFocusLabels;

export function isNeedFocus(packageKey: string, focus: string): focus is NeedFocus {
  return (packageKey === 'optimalisering' && (focus === 'synlighet' || focus === 'konvertering')) ||
    (packageKey === 'vekst' && focus === 'synlighet-konvertering');
}

export type OrderPayload = LeadPayload & {
  intent: 'order';
  package: string;
  focus?: NeedFocus;
  company?: string;
  contact?: string;
};

export function createOrderPayload(fields: Record<string, string>, source: Record<string, string>): OrderPayload {
  const packageKey = fields.package;
  if (fields.form !== 'pakke-bestilling' || !['optimalisering', 'vekst', 'partner'].includes(packageKey)) {
    throw new Error('Velg en gyldig pakke.');
  }
  const focus = fields.focus ?? '';
  if (focus && !isNeedFocus(packageKey, focus)) throw new Error('Velg et gyldig fokusområde for pakken.');
  const company = (fields.company ?? '').trim();
  const contact = (fields.contact ?? '').trim();
  if (company.length > 200) throw new Error('Bedriftsnavnet kan ha maksimalt 200 tegn.');
  if (contact.length > 200) throw new Error('Kontaktpersonen kan ha maksimalt 200 tegn.');
  const { phone, ...validated } = createLeadPayload({
    website: fields.website, email: fields.email, message: fields.message, phone: fields.phone,
  }, source);
  return {
    ...validated, form: 'pakke-bestilling', intent: 'order', package: packageKey,
    ...(phone ? { phone } : {}), ...(company ? { company } : {}), ...(contact ? { contact } : {}),
    ...(focus && isNeedFocus(packageKey, focus) ? { focus } : {}),
  };
}
