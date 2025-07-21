import { Request, Response } from "express";
import { getAllBlogEntriesSortedByDateDesc } from "../../models/blogEntriesModel";

export const adminBlogController = async (req: Request, res: Response) => {
  const blogEntries = await getAllBlogEntriesSortedByDateDesc();

  res.render("../views/admin/indexPage.html", {
    blogEntries,
    meta: {
      title: "Admin Panel",
      url: req.url,
    },
    header: {
      title: "All posts",
    },
  });
};
