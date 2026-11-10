/** Full Phosphor Regular icon catalog from the pinned build dependency.
 * No SVG assets or catalog metadata are sent as client JavaScript in this static Astro site.
 */
import { icons } from '@phosphor-icons/core';

export const PHOSPHOR_ICON_NAMES = icons.map(icon => icon.name);
export type PhosphorIconName = (typeof icons)[number]['name'];
const available = new Set<string>(PHOSPHOR_ICON_NAMES);

export function isPhosphorIconName(name: string): name is PhosphorIconName {
  return available.has(name);
}
