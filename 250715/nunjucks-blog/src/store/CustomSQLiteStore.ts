import { Store } from "express-session";
import type session from "express-session";
import { getDB } from "../db/database";
import { Session } from "../types/Session";

export class CustomSQLiteStore extends Store {
  constructor() {
    super();
    const db = getDB();

    db.run(
      `CREATE TABLE IF NOT EXISTS sessions (
        sid TEXT PRIMARY KEY,
        sess TEXT NOT NULL,
        expire INTEGER
      )`,
      (err) => {
        if (err) console.error("Failed to create sessions table:", err.message);
      },
    );
  }

  get = (
    sid: string,
    callback: (err: any, session?: session.SessionData | null) => void,
  ) => {
    const db = getDB();
    db.get(
      "SELECT sess FROM sessions WHERE sid = ?",
      [sid],
      (err, row: Session) => {
        if (err) return callback(err);
        if (!row) return callback(null, null);
        try {
          return callback(null, JSON.parse(row.sess));
        } catch (e) {
          return callback(e);
        }
      },
    );
  };

  set = (
    sid: string,
    sess: session.SessionData,
    callback?: (err?: any) => void,
  ) => {
    const db = getDB();
    const expire =
      sess.cookie.expires instanceof Date
        ? sess.cookie.expires.getTime()
        : Date.now() + 86400000;
    db.run(
      `INSERT INTO sessions (sid, sess, expire)
       VALUES (?, ?, ?)
       ON CONFLICT(sid) DO UPDATE SET sess=excluded.sess, expire=excluded.expire`,
      [sid, JSON.stringify(sess), expire],
      (err) => callback?.(err),
    );
  };

  destroy = (sid: string, callback?: (err?: any) => void) => {
    const db = getDB();
    db.run("DELETE FROM sessions WHERE sid = ?", [sid], (err) =>
      callback?.(err),
    );
  };
}
