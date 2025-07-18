import { Request, Response } from "express";

import { getAllBlogEntries } from "../../models/blogEntriesModel";

export const adminNewPostController = async (req: Request, res: Response) => {
  const blogEntries = await getAllBlogEntries();

  res.render("../views/admin/post.html", {
    blogEntries,
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
