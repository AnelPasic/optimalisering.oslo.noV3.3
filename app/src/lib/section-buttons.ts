import { z } from 'astro/zod';

const buttonStyles = [
  'default', 'link', 'btn', 'btn-primary', 'btn-secondary', 'btn-accent',
  'btn-neutral', 'btn-info', 'btn-success', 'btn-warning', 'btn-error',
  'btn-outline', 'btn-soft', 'btn-ghost',
] as const;
export const buttonStyleSchema = z.preprocess(
  value => value === '' || value == null ? undefined : value,
  z.enum(buttonStyles).optional(),
);
export type ButtonStyle = Exclude<z.infer<typeof buttonStyleSchema>, undefined>;
type ButtonChoice = Exclude<ButtonStyle, 'default'>;

export function buttonChoice(local?: ButtonStyle, fallback?: ButtonStyle): ButtonChoice | undefined {
  if (local && local !== 'default') return local;
  return fallback && fallback !== 'default' ? fallback : undefined;
}

export function actionClasses(choice: ButtonChoice): string {
  if (choice === 'link') return 'text-link';
  return choice === 'btn' ? 'btn' : 'btn ' + choice;
}
