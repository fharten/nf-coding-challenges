import { BlogPost, BlogPosts } from "../types/BlogPost";
import { sanitizeBlogPost } from "../utils/transformData";
import { getDB } from "../db/database";

export async function getAllBlogEntries(): Promise<BlogPosts> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    db.all<BlogPost>(
      `SELECT * FROM blog_entries`,
      [],
      (error: Error | null, rowData: BlogPosts) => {
        if (error) return reject(error);
        resolve(rowData);
      },
    );
  });
}

export async function getAllBlogEntriesSortedByDateDesc(
  pageNumber: number,
): Promise<BlogPosts> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    db.all<BlogPost>(
      `SELECT * FROM blog_entries ORDER BY createdAt DESC LIMIT 5 OFFSET ?`,
      [(pageNumber - 1) * 5],
      (error: Error | null, rowData: BlogPosts) => {
        if (error) return reject(error);
        resolve(rowData);
      },
    );
  });
}

export async function getBlogEntriesByAuthor(
  authorId: string,
): Promise<BlogPosts> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    db.all<BlogPost>(
      `SELECT * FROM blog_entries WHERE author = ?`,
      [authorId],
      (error: Error | null, rowData: BlogPosts) => {
        if (error) return reject(error);
        resolve(rowData);
      },
    );
  });
}

export async function createPost(post: BlogPost): Promise<Number> {
  const db = getDB();
  const sanitizedPost = sanitizeBlogPost(post);
  const {
    id,
    title,
    image,
    author,
    createdAt,
    updatedAt,
    updated,
    date,
    teaser,
    content,
    slug,
  } = sanitizedPost;

  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO blog_entries (
        id, title, image, author, createdAt, updatedAt, updated,
        date, teaser, content, slug
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        title,
        image,
        author,
        createdAt,
        updatedAt,
        updated,
        date,
        teaser,
        content,
        slug,
      ],
      function (error: Error | null) {
        if (error) return reject(error);
        resolve(this.lastID);
      },
    );
  });
}

export async function updatePost(
  updatedPost: BlogPost,
  id: string,
): Promise<Number> {
  const db = getDB();
  const sanitizedPost = sanitizeBlogPost(updatedPost);
  const {
    title,
    image,
    author,
    createdAt,
    updatedAt,
    updated,
    date,
    teaser,
    content,
  } = sanitizedPost;

  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE blog_entries 
        SET title = ?, image = ?, author = ?, createdAt = ?, updatedAt = ?, updated = ?,
        date = ?, teaser = ?, content = ?
        WHERE id = ?
      `,
      [
        title,
        image,
        author,
        createdAt,
        updatedAt,
        updated,
        date,
        teaser,
        content,
        id,
      ],
      function (error: Error | null) {
        if (error) return reject(error);
        resolve(this.changes);
      },
    );
  });
}

export async function deletePost(id: string): Promise<Number> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    db.run(
      `
      DELETE FROM blog_entries where id = ?
      `,
      [id],
      function (error: Error | null) {
        if (error) return reject(error);
        resolve(this.changes);
      },
    );
  });
}
