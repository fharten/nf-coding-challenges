import { BlogPost, BlogPosts } from "../types/BlogPost";
import { sanitizeAuthor } from "../utils/transformData";
import { getDB } from "../db/database";
import { Author, Authors } from "../types/Author";

export async function getAllAuthors(): Promise<Authors> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    db.all<Author>(
      `SELECT * FROM authors`,
      [],
      (error: Error | null, rowData: Authors) => {
        if (error) return reject(error);
        resolve(rowData);
      },
    );
  });
}

export async function getAuthorById(id: string): Promise<Author> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    db.get<Author>(
      `SELECT * FROM authors WHERE id = ?`,
      [id],
      (error: Error | null, rowData: Author) => {
        if (error) return reject(error);
        resolve(rowData);
      },
    );
  });
}

export async function createAuthor(author: Author): Promise<Number> {
  const db = getDB();
  const sanitizedAuthor = sanitizeAuthor(author);
  const { id, name, bio, avatar, email, createdAt, date } = sanitizedAuthor;

  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO authors (
        id, name, bio, avatar, email, createdAt, date
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [id, name, bio, avatar, email, createdAt, date],
      function (error: Error | null) {
        if (error) return reject(error);
        resolve(this.lastID);
      },
    );
  });
}

export async function updateAuthor(
  updatedAuthor: Author,
  id: string,
): Promise<Number> {
  const db = getDB();
  const sanitizedAuthor = sanitizeAuthor(updatedAuthor);
  const { name, bio, avatar, email, createdAt, date } = sanitizedAuthor;

  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE authors
        SET name = ?, bio = ?, avatar = ?, email = ?, createdAt = ?, date = ?
        WHERE id = ?
      `,
      [name, bio, avatar, email, createdAt, date, id],
      function (error: Error | null) {
        if (error) return reject(error);
        resolve(this.changes);
      },
    );
  });
}

export async function deleteAuthor(id: string): Promise<Number> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    db.run(
      `
      DELETE FROM authors where id = ?
      `,
      [id],
      function (error: Error | null) {
        if (error) return reject(error);
        resolve(this.changes);
      },
    );
  });
}
