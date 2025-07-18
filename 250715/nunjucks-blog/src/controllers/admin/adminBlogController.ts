import { Request, Response } from "express";
import { getAllBlogEntries } from "../../models/blogEntriesModel";

export const adminBlogController = async (req: Request, res: Response) => {
  const blogEntries = await getAllBlogEntries();

  res.render("../views/admin/indexPage.html", {
    blogEntries,
    meta: {
      title: "Admin Panel",
      url: req.url,
    },
    header: {
      title: "All posts",
      image: "colorful-umbrella.jpg",
    },
  });
};
