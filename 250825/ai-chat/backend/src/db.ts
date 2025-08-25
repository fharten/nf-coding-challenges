import Database from 'better-sqlite3';
const db = new Database('./chat.sqlite');

// CREATE
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS user_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`,
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS ai_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_message_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_message_id) REFERENCES user_messages(id)
  )
`,
).run();

export default db;
