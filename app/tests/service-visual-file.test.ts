import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { resolveServiceVisual } from '../src/lib/service-visual.ts';
test('missing service assets fall back and existing service files resolve without homepage-photo reuse', () => {
  const root = mkdtempSync(join(tmpdir(), 'h011-service-visual-'));
  const visual = { kind: 'photo' as const, src: '/images/services/outcome.webp', alt: 'Customer outcome', positionX: 40, positionY: 60 };
  try {
    assert.equal(resolveServiceVisual(undefined, root), undefined);
    assert.equal(resolveServiceVisual(visual, root), undefined);
    mkdirSync(join(root, 'images/services'), { recursive: true });
    writeFileSync(join(root, 'images/services/outcome.webp'), 'local file fixture');
    assert.deepEqual(resolveServiceVisual(visual, root), visual);
    assert.equal(resolveServiceVisual({ ...visual, src: '/images/home/hero-customer.webp' }, root), undefined);
    assert.equal(resolveServiceVisual({ ...visual, src: '/images/services/../home/a.webp' }, root), undefined);
  } finally {
    assert.ok(resolve(root).startsWith(resolve(tmpdir()) + sep));
    rmSync(root, { recursive: true, force: true });
  }
});
