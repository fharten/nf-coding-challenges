import { Request, Response } from "express";
import { BlogPost } from "../../types/BlogPost";
import { getAllBlogEntries } from "../../models/blogEntriesModel";

export const adminPostController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const blogEntries = await getAllBlogEntries();
  const post = blogEntries.find((p: BlogPost) => p.id === id);

  if (!post) return res.status(404).send("Post not found");

  res.render("../views/admin/post.html", {
    blogEntriesWithSlug: blogEntries,
    meta: {
      title: "Admin Panel | Edit Post",
      postUrl: `update/${id}`,
    },
    mainData: {
      id: post.id,
      title: post.title,
      image: post.image,
      author: post.author,
      date: post.date,
      teaser: post.teaser,
      content: post.content,
      slug: post.slug,
    },
  });
};
