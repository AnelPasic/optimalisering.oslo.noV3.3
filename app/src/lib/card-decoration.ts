import { z } from 'astro/zod';
import { isPhosphorIconName } from './phosphor-icon-names.ts';

export const badgeClasses = [
  'badge', 'badge-primary', 'badge-secondary', 'badge-accent', 'badge-neutral',
  'badge-info', 'badge-success', 'badge-warning', 'badge-error',
  'badge-outline', 'badge-soft', 'badge-dash', 'badge-ghost',
] as const;
export type BadgeClass = (typeof badgeClasses)[number];

const optionalText = (value: unknown) =>
  value == null || (typeof value === 'string' && !value.trim()) ? undefined : value;
export const phosphorIconSchema = z.preprocess(optionalText,
  z.string().trim().refine(isPhosphorIconName, 'Ukjent Phosphor-ikon. Bruk navnet fra Phosphor Regular.').optional());
export const cardDecorationFields = {
  iconName: phosphorIconSchema,
  badge: z.preprocess(optionalText, z.string().trim().optional()),
  badgeClass: z.preprocess(optionalText, z.enum(badgeClasses).optional()),
};
export const cardDecorationSchema = z.object(cardDecorationFields);
export type CardDecoration = z.infer<typeof cardDecorationSchema>;

export function cardDecoration(value: CardDecoration): CardDecoration {
  return {
    ...(value.iconName ? {iconName:value.iconName} : {}),
    ...(value.badge ? {badge:value.badge} : {}),
    ...(value.badgeClass ? {badgeClass:value.badgeClass} : {}),
  };
}
