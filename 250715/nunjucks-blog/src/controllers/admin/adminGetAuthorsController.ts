import { Request, Response } from "express";
import { getAllAuthors } from "../../models/authorsModel";
import { getAllBlogEntries } from "../../models/blogEntriesModel";

export const adminGetAuthorsController = async (
  req: Request,
  res: Response,
) => {
  const authors = await getAllAuthors();
  const blogEntries = await getAllBlogEntries();

  res.render("../views/admin/indexAuthors.html", {
    blogEntries,
    authors,
    meta: {
      title: "Admin Panel",
      url: req.url,
    },
    header: {
      title: "All authors",
    },
  });
};
