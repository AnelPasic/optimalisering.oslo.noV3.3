/** Phosphor Regular icon slugs bundled locally; no network requests or arbitrary SVG. */
export const PHOSPHOR_ICON_NAMES = ["magnifying-glass","cursor-click","sparkle","map-pin","target","chat-circle-dots","megaphone","shopping-cart","browser","credit-card","wrench","chart-line-up","eye","grid-four","binoculars","toolbox","robot","map-trifold","chat-teardrop-dots","chart-bar"] as const;
export type PhosphorIconName = (typeof PHOSPHOR_ICON_NAMES)[number];
export function isPhosphorIconName(name:string):name is PhosphorIconName {
  return (PHOSPHOR_ICON_NAMES as readonly string[]).includes(name);
}
