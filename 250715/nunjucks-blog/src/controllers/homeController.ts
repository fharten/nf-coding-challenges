import { Request, Response } from "express";
import { getAllBlogEntries } from "../models/blogEntriesModel";
import { getAllAuthors } from "../models/authorsModel";

export const homeController = async (req: Request, res: Response) => {
  const blogEntries = await getAllBlogEntries();
  const authors = await getAllAuthors();

  const authorMap = new Map(authors.map((a) => [a.id, a.name]));
  const blogEntriesWithNames = blogEntries.map((p) => ({
    ...p,
    authorName: authorMap.get(p.author) || "Unknown",
  }));

  res.render("../views/pages/index.html", {
    blogEntries: blogEntriesWithNames,
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
