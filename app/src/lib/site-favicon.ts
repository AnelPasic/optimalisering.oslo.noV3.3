import { z } from 'astro/zod';
import { createHash } from 'node:crypto';
import { readFileSync, realpathSync, statSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import sharp from 'sharp';

export const faviconSchema = z.preprocess(
  value => value == null || value === '' ? undefined : value,
  z.string().regex(/^\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:svg|png|ico)$/).optional(),
);
export const faviconSize = 48;
interface FaviconSources {
  favicon?: string;
  mobileLogoLight?: string;
  logoLight?: string;
  mobileLogoDark?: string;
  logoDark?: string;
  brand?: string | { logoSrc?: string };
}
interface Favicon {
  href: string;
  type: string;
  sizes?: string;
  generated?: { name: string; source: string };
}

function readPublicAsset(source: string, publicDirectory: string): Buffer | undefined {
  if (!source.startsWith('/') || source.startsWith('//')) return undefined;
  try {
    const directory = realpathSync(resolve(publicDirectory));
    const file = realpathSync(resolve(directory, source.slice(1)));
    if (!file.startsWith(directory + sep) || !statSync(file).isFile()) return undefined;
    const bytes = readFileSync(file);
    return bytes.length ? bytes : undefined;
  } catch { return undefined; }
}

export function resolveSiteFavicon(config: FaviconSources, publicDirectory = 'public', fallbackHref?: string): Favicon | undefined {
  if (config.favicon) {
    const source = faviconSchema.parse(config.favicon)!;
    const bytes = readPublicAsset(source, publicDirectory);
    if (!bytes) throw new Error('The selected favicon file is missing: ' + source);
    const version = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
    const types: Record<string, string> = { '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
    return {
      href: source + '?v=' + version,
      type: types[extname(source)],
      ...(source.endsWith('.svg') ? { sizes: 'any' } : {}),
    };
  }
  const legacyLogo = typeof config.brand === 'object' ? config.brand.logoSrc : undefined;
  for (const source of [config.mobileLogoLight, config.mobileLogoDark, config.logoLight, config.logoDark, legacyLogo]) {
    if (!source) continue;
    const bytes = readPublicAsset(source, publicDirectory);
    if (!bytes) continue;
    const version = createHash('sha256').update('favicon-' + faviconSize).update(bytes).digest('hex').slice(0, 16);
    const name = 'favicon-' + version;
    return {
      href: '/favicons/' + name + '.png',
      type: 'image/png',
      sizes: faviconSize + 'x' + faviconSize,
      generated: { name, source },
    };
  }
  return fallbackHref ? { href: fallbackHref, type: 'image/svg+xml', sizes: 'any' } : undefined;
}

export async function renderSiteFavicon(source: string, publicDirectory = 'public'): Promise<Buffer> {
  const bytes = readPublicAsset(source, publicDirectory);
  if (!bytes) throw new Error('The favicon source file is missing: ' + source);
  return sharp(bytes).rotate().resize(faviconSize, faviconSize, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).png().toBuffer();
}
