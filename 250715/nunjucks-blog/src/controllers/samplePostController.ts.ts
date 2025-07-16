import { Request, Response } from "express";
import { transformBlogData } from "../utils/transformBlogData";
import { getAllBlogEntries } from "../models/blogEntriesModel";

export const samplePostController = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const blogEntries = await getAllBlogEntries();
  const post = transformBlogData(blogEntries)[0];

  if (!post) return res.status(404).send("Post not found");

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
      date: post.date,
      teaser: post.teaser,
      content: post.content,
    },
  });
};
