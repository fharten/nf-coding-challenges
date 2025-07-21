import { getDB } from "../db/database";
import type { User } from "../types/User";

export async function getUserById(id: string): Promise<User> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    db.get<User>(
      `SELECT * FROM users WHERE id = ?`,
      [id],
      (error: Error | null, rowData: User) => {
        if (error) return reject(error);
        resolve(rowData);
      },
    );
  });
}

export function createUser(user: User): Promise<number> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (id, username, displayName, profileUrl, createdAt, date, isAdmin)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        user.username,
        user.displayName,
        user.profileUrl,
        Date.now(),
        user.date,
        user.isAdmin,
      ],
      function (error: Error | null) {
        if (error) return reject(error);
        resolve(this.lastID);
      },
    );
  });
}
