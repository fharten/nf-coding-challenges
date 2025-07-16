import { Request, Response } from "express";
import { getAllBlogEntries } from "../models/blogEntriesModel";
import { transformBlogData } from "../utils/transformBlogData";

export const homeController = async (req: Request, res: Response) => {
  const blogEntries = await getAllBlogEntries();
  const blogEntriesWithSlug = transformBlogData(blogEntries);

  res.render("../views/pages/index.html", {
    blogEntriesWithSlug,
    meta: {
      title: "Home",
    },
    headerData: {
      image: "home-bg.jpg",
      title: "Clean Blog",
      subTitle: "A Blog Theme by Start Bootstrap",
    },
  });
};
