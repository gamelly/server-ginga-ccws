import { Database } from "bun:sqlite";

export const db = new Database("app.db");

db.run(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    method TEXT,
    path TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS persistent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    value TEXT
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS mediaplayer (
    id INTEGER PRIMARY KEY CHECK(id = 1),
    state TEXT NOT NULL DEFAULT 'idle',
    url TEXT NOT NULL DEFAULT '',
    pos_x INTEGER NOT NULL DEFAULT 0,
    pos_y INTEGER NOT NULL DEFAULT 0,
    pos_w INTEGER NOT NULL DEFAULT 0,
    pos_h INTEGER NOT NULL DEFAULT 0,
    time INTEGER NOT NULL DEFAULT 0
  );
  DELETE FROM mediaplayer WHERE id = 1;
  INSERT INTO mediaplayer (id) VALUES (1);
`);
