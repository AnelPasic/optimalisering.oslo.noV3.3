import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';

// Execute production SQL against SQLite; platform binding parity is checked separately in Miniflare.
export function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../migrations/0001_receipts.sql', import.meta.url), 'utf8'));
  return {
    sqlite,
    prepare(sql) {
      const stmt = sqlite.prepare(sql);
      return { bind(...values) {
        return {
          async run() { return { success: true, meta: { changes: Number(stmt.run(...values).changes) } }; },
          async first() { return stmt.get(...values) ?? null; },
          async all() { return { success: true, results: stmt.all(...values) }; },
        };
      } };
    },
  };
}
