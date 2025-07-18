import { Request, Response } from "express";
import { getAllBlogEntries } from "../models/blogEntriesModel";

export const homeController = async (req: Request, res: Response) => {
  const blogEntries = await getAllBlogEntries();

  res.render("../views/pages/index.html", {
    blogEntries,
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
