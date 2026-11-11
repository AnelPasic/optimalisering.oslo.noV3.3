import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';

// Execute production SQL against SQLite; platform binding parity is checked separately in Miniflare.
export function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys=ON');
  for (const name of ['0001_receipts.sql', '0002_customer_confirmations.sql']) {
    sqlite.exec(readFileSync(new URL('../migrations/' + name, import.meta.url), 'utf8'));
  }
  return bindDatabase(sqlite);
}

export function bindDatabase(sqlite) {
  return {
    sqlite,
    async batch(statements) {
      sqlite.exec('BEGIN');
      try {
        const results = [];
        for (const statement of statements) results.push(await statement.run());
        sqlite.exec('COMMIT');
        return results;
      } catch (error) {
        sqlite.exec('ROLLBACK');
        throw error;
      }
    },
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
