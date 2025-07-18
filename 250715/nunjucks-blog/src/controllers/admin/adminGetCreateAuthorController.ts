import { Request, Response } from "express";

import { getAllAuthors } from "../../models/authorsModel";

export const adminGetCreateAuthorController = async (
  req: Request,
  res: Response,
) => {
  const blogEntries = await getAllAuthors();

  res.render("../views/admin/editAuthor.html", {
    blogEntries,
    meta: {
      title: "Admin Panel | Create Author",
      url: req.url,
      postUrl: "create",
    },
    mainData: {
      id: "",
      name: "",
      email: "",
      avatar: "",
      bio: "",
    },
  });
};
