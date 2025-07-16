import { Request, Response } from "express";
import { transformBlogData } from "../../utils/transformBlogData";
import { BlogPost } from "../../types/BlogPost";
import { getAllBlogEntries } from "../../models/blogEntriesModel";

export const adminPostController = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const blogEntries = await getAllBlogEntries();
  const blogEntriesWithSlug = transformBlogData(blogEntries);
  const post = blogEntriesWithSlug.find((p: BlogPost) => p.slug === slug);

  if (!post) return res.status(404).send("Post not found");

  res.render("../views/admin/post.html", {
    blogEntriesWithSlug,
    meta: {
      title: "Edit Post",
      postUrl: `update/${slug}`,
    },
    mainData: {
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
