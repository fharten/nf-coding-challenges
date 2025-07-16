import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { BlogPost, BlogPosts } from "../types/BlogPost";
import {
  sanitizeNewBlogData,
  transformBlogData,
} from "../utils/transformBlogData";

const FILE_PATH = path.join(__dirname, "..", "data", "blog-entries.json");

export async function getAllBlogEntries() {
  try {
    const blogEntries = await readFile(FILE_PATH, { encoding: "utf-8" });

    if (blogEntries.length === 0) return [];

    return JSON.parse(blogEntries);
  } catch (error) {
    console.error(`Error getting blog entries. ${error}`);
  }
}

export async function saveBlogPosts(posts: BlogPosts): Promise<void> {
  await writeFile(FILE_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export async function createPost(post: BlogPost): Promise<void> {
  const posts = await getAllBlogEntries();
  const sanitizedData = sanitizeNewBlogData(post);

  posts.push(sanitizedData);

  await saveBlogPosts(posts);
}

export async function updatePost(updatedPost: BlogPost): Promise<void> {
  const posts = await getAllBlogEntries();
  const transformedBlogData = transformBlogData(posts);

  const index = transformedBlogData.findIndex(
    (p: BlogPost) => p.slug === updatedPost.slug,
  );
  if (index === -1) throw new Error("Post not found");

  transformedBlogData[index] = {
    ...transformedBlogData[index],
    ...updatedPost,
  };

  await saveBlogPosts(transformedBlogData);
}

export async function deletePost(slug: string): Promise<void> {
  const posts = await getAllBlogEntries();
  const transformedBlogData = transformBlogData(posts);

  const filtered = transformedBlogData.filter((p: BlogPost) => p.slug !== slug);

  await saveBlogPosts(filtered);
}
