import { realpathSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';

export interface ServiceVisual {
  kind: 'photo' | 'illustration'; src: string; alt: string;
  positionX: number; positionY: number;
}

export function resolveServiceVisual(visual: ServiceVisual | undefined, publicDirectory = 'public'): ServiceVisual | undefined {
  if (!visual || !/^\/images\/services\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g|avif|svg)$/.test(visual.src) || !visual.alt.trim()) return undefined;
  try {
    const directory = realpathSync(resolve(publicDirectory, 'images/services'));
    const file = realpathSync(resolve(publicDirectory, visual.src.slice(1)));
    if (!file.startsWith(directory + sep) || !statSync(file).isFile()) return undefined;
    return visual;
  } catch { return undefined; }
}
