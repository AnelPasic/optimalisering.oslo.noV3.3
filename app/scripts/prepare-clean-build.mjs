import { readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Cloud builds can reuse the generated Astro content layer between commits.
// Rebuild from the checked-out JSON rather than an older cached projection.
const appRoot = fileURLToPath(new URL('../', import.meta.url));
const retiredServiceKeys = ['closingCta', 'proofAfter', 'pricingBridge'];

function jsonFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return jsonFiles(path);
    return entry.isFile() && entry.name.endsWith('.json') ? [path] : [];
  });
}

export function checkPageSources(root = appRoot) {
  const pagesDir = join(root, 'src', 'content', 'pages');
  const files = jsonFiles(pagesDir);
  const invalid = [];
  for (const path of files) {
    const page = JSON.parse(readFileSync(path, 'utf8'));
    if (page.kind !== 'service') continue;
    const legacy = retiredServiceKeys.filter(key =>
      Object.hasOwn(page.composition?.service ?? {}, key)
    );
    if (Object.hasOwn(page, 'proof')) legacy.push('root proof');
    if (legacy.length) invalid.push(`${relative(root, path)}: ${legacy.join(', ')}`);
  }
  if (invalid.length) throw new Error(
    'CMS Structure Parity requires explicit sections, not legacy auto-inserted fields:\n' +
    invalid.join('\n')
  );
  return files.length;
}

export function prepareCleanBuild(root = appRoot) {
  // Validate tracked sources first, before touching generated output.
  const pageCount = checkPageSources(root);
  for (const path of [
    join(root, '.astro'),
    join(root, 'dist'),
    join(root, 'node_modules', '.vite'),
  ]) rmSync(path, { recursive: true, force: true });
  return pageCount;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const declaredCommit = process.env.WORKERS_CI_COMMIT_SHA || process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA || 'unknown';
  let checkoutCommit = 'unknown';
  try {
    checkoutCommit = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: dirname(fileURLToPath(import.meta.url)),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch { /* Some build providers do not expose a git checkout. */ }
  console.log(`[cms-parity-prebuild] Source commit: ${declaredCommit === 'unknown' ? checkoutCommit : declaredCommit}; checkout: ${checkoutCommit}`);
  if (process.env.WORKERS_CI_COMMIT_SHA && checkoutCommit !== 'unknown' && checkoutCommit !== process.env.WORKERS_CI_COMMIT_SHA) {
    throw new Error('Cloudflare build checkout does not match WORKERS_CI_COMMIT_SHA');
  }
  const count = prepareCleanBuild();
  console.log(`[cms-parity-prebuild] Validated ${count} page sources; cleared Astro/Vite build cache.`);
}
