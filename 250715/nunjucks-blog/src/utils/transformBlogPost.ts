import slugify from "slugify";
import sanitizeHtml from "sanitize-html";
import { v4 as uuidv4 } from "uuid";
import { BlogPost, BlogPosts } from "../types/BlogPost";

export function sanitizeBlogPost(post: BlogPost) {
  const { title, image, author, teaser, content } = post;
  const sanitized = {
    id: post.id ? post.id : uuidv4(),
    title: sanitizeHtml(title),
    image: sanitizeHtml(image),
    author: sanitizeHtml(author),
    teaser: sanitizeHtml(teaser),
    content: sanitizeHtml(content),
    createdAt: post.createdAt ? post.createdAt : Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
    date: post.date ? post.date : new Date(Date.now()).toLocaleDateString(),
    updated: new Date(Date.now()).toLocaleDateString(),
    slug: post.slug ? post.slug : slugify(title, { remove: /[*+~.,()'"!:@]/g }),
  };

  return sanitized;
}
