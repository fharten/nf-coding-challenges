import { Request, Response } from "express";
import { BlogPost } from "../types/BlogPost";
import { getAllBlogEntries } from "../models/blogEntriesModel";
import { getAuthorById } from "../models/authorsModel";

export const postController = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const blogEntries = await getAllBlogEntries();
  const post = blogEntries.find((p: BlogPost) => p.slug === slug);

  if (!post) return res.status(404).send("Post not found");
  const author = await getAuthorById(post.author);

  res.render("../views/pages/post.html", {
    meta: {
      title: "Post",
    },
    headerData: {
      image: post.image,
      title: post.title,
    },
    mainData: {
      author: post.author,
      authorName: author.name,
      date: post.date,
      teaser: post.teaser,
      content: post.content,
    },
  });
};
