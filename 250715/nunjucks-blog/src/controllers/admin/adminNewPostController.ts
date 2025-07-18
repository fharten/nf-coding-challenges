import { Request, Response } from "express";

import { getAllBlogEntries } from "../../models/blogEntriesModel";
import { getAllAuthors } from "../../models/authorsModel";

export const adminNewPostController = async (req: Request, res: Response) => {
  const blogEntries = await getAllBlogEntries();
  const authors = await getAllAuthors();

  res.render("../views/admin/post.html", {
    blogEntries,
    authors,
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
