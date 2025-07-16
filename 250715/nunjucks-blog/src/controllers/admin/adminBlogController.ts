import { Request, Response } from "express";
import { getAllBlogEntries } from "../../models/blogEntriesModel";
import { transformBlogData } from "../../utils/transformBlogData";

export const adminBlogController = async (req: Request, res: Response) => {
  const blogEntries = await getAllBlogEntries();
  const blogEntriesWithSlug = transformBlogData(blogEntries);

  res.render("../views/admin/indexPage.html", {
    blogEntriesWithSlug,
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
