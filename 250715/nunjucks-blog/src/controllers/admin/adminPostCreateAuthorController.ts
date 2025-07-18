import { Request, Response } from "express";
import { createAuthor } from "../../models/authorsModel";

export const adminPostCreateAuthorController = async (
  req: Request,
  res: Response,
) => {
  try {
    await createAuthor(req.body);
    res.redirect("/admin/authors");
  } catch (error) {
    res.status(500).send(`Error updating post: ${error}`);
  }
};
