import sqlite3 from "sqlite3";
import path from "path";

const dbInstance = sqlite3.verbose();

const DB_FILE = path.join(__dirname, "../../blog.db");

let db: sqlite3.Database | null = null;

export function connectDB(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    db = new dbInstance.Database(
      DB_FILE,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (error: Error | null) => {
        if (error) {
          console.error("Error connecting to database:", error.message);
          reject(error);
        } else {
          console.log("Connected to the SQLite database.");
          db?.serialize(() => {
            db!.run(
              `
                CREATE TABLE IF NOT EXISTS blog_entries (
                  id TEXT PRIMARY KEY,
                  title TEXT NOT NULL,
                  teaser TEXT NOT NULL,
                  author TEXT NOT NULL,
                  createdAt INTEGER NOT NULL,
                  date TEXT,
                  updatedAt INTEGER,
                  updated TEXT,
                  image TEXT NOT NULL,
                  content TEXT NOT NULL,
                  slug TEXT
                )
              `,
              (errorBlogEntries: Error | null) => {
                if (errorBlogEntries) {
                  console.error(
                    "Error creating blog_entries table:",
                    errorBlogEntries.message,
                  );
                  return reject(errorBlogEntries);
                }

                console.log("blog_entries table checked/created.");

                db!.run(
                  `
                    CREATE TABLE IF NOT EXISTS authors (
                      id TEXT PRIMARY KEY,
                      name TEXT NOT NULL,
                      bio TEXT,
                      avatar TEXT,
                      email TEXT,
                      createdAt INTEGER NOT NULL,
                      date TEXT
                    )
                  `,
                  (errorAuthors: Error | null) => {
                    if (errorAuthors) {
                      console.error(
                        "Error creating authors table:",
                        errorAuthors.message,
                      );
                      return reject(errorAuthors);
                    }

                    console.log("authors table checked/created.");
                    resolve(db as sqlite3.Database);
                  },
                );
              },
            );
          });
        }
      },
    );
  });
}

export function getDB(): sqlite3.Database {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}

export function closeDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err: Error | null) => {
        if (err) {
          console.error("Error closing database:", err.message);
          reject(err);
        } else {
          console.log("Database connection closed.");
          db = null;
          resolve();
        }
      });
    } else {
      console.log("No database connection to close.");
      resolve();
    }
  });
}
