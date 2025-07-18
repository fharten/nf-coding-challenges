import slugify from "slugify";
import sanitizeHtml from "sanitize-html";
import { v4 as uuidv4 } from "uuid";
import { BlogPost } from "../types/BlogPost";
import { Author } from "../types/Author";

export function sanitizeBlogPost(post: BlogPost) {
  const { title, image, author, teaser, content, createdAt, date } = post;
  const sanitized = {
    id: post.id ? post.id : uuidv4(),
    title: sanitizeHtml(title),
    image: sanitizeHtml(image),
    author: sanitizeHtml(author),
    teaser: sanitizeHtml(teaser),
    content: sanitizeHtml(content),
    createdAt: createdAt ? createdAt : Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
    date: date ? date : new Date(Date.now()).toLocaleDateString(),
    updated: new Date(Date.now()).toLocaleDateString(),
    slug: post.slug
      ? post.slug
      : slugify(title, { remove: /[*+~.,()'"!?:@]/g }),
  };

  return sanitized;
}

export function sanitizeAuthor(author: Author) {
  const { name, bio, avatar, email, createdAt } = author;
  const sanitized = {
    id: author.id ? author.id : uuidv4(),
    name: sanitizeHtml(name),
    bio: sanitizeHtml(bio),
    avatar: sanitizeHtml(avatar),
    email: sanitizeHtml(email),
    createdAt: createdAt ? createdAt : Math.floor(Date.now() / 1000),
    date: author.date ? author.date : new Date(Date.now()).toLocaleDateString(),
  };

  return sanitized;
}
