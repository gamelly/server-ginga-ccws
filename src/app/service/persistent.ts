import { Persistent } from "../../domain/persistent";
import { db } from "../../infra/db";

export function save(key: string, value: string): Persistent {
  const stmt = db.prepare(`
    INSERT INTO persistent (key, value)
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET
      value = excluded.value;
  `);
  const info = stmt.run(key, value);

  return {id: Number(info.lastInsertRowid), key, set: {[key]: value}}
}

export function load(key: string): Persistent | null {
  const stmt = db.prepare(`SELECT id, key, value FROM persistent WHERE key = ?`);
  const row = stmt.get(key) as { id: number; key: string; value: string } | undefined;

  if (!row) return null;

  return {
    id: row.id,
    key: row.key,
    set: {
      [row.key]: row.value
    }
  };
}

export function loadAll(): Persistent[] {
  const stmt = db.prepare(`SELECT id, key, value FROM persistent`);
  const rows = stmt.all() as { id: number; key: string; value: string }[];

  return rows.map(row => ({
    id: row.id,
    key: row.key,
    set: {
      [row.key]: row.value
    }
  }));
}