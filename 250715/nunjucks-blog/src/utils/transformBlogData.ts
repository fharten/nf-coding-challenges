import slugify from "slugify";
import sanitizeHtml from "sanitize-html";
import { BlogPost, BlogPosts } from "../types/BlogPost";

export function transformBlogData(blogData: BlogPosts) {
  const transformedBlogData: BlogPosts = blogData.map((p: BlogPost) => ({
    ...p,
    slug: slugify(p.title, { remove: /[*+~.,()'"!:@]/g }),
    date: new Date(p.createdAt * 1000).toLocaleDateString(),
    updated: new Date(
      p.updatedAt ? p.updatedAt * 1000 : p.createdAt * 1000,
    ).toLocaleDateString(),
  }));

  return transformedBlogData;
}

export function sanitizeNewBlogData(post: BlogPost) {
  const { title, image, author, teaser, content } = post;

  const sanitized = {
    title: sanitizeHtml(title),
    image: sanitizeHtml(image),
    author: sanitizeHtml(author),
    teaser: sanitizeHtml(teaser),
    content: sanitizeHtml(content),
    createdAt: Math.floor(Date.now() / 1000),
    slug: slugify(title, { remove: /[*+~.,()'"!:@]/g }),
  };

  return sanitized;
}
