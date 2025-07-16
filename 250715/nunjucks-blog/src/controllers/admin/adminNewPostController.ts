import { Request, Response } from "express";
import { transformBlogData } from "../../utils/transformBlogData";
import { BlogPost } from "../../types/BlogPost";
import { getAllBlogEntries } from "../../models/blogEntriesModel";

export const adminNewPostController = async (req: Request, res: Response) => {
  const blogEntries = await getAllBlogEntries();
  const blogEntriesWithSlug = transformBlogData(blogEntries);

  res.render("../views/admin/post.html", {
    blogEntriesWithSlug,
    meta: {
      title: "Admin Panel | Create Post",
      url: req.url,
      postUrl: "create",
    },
    mainData: {
      title: "",
      image: "",
      author: "",
      teaser: "",
      content: "",
    },
  });
};
