import { Request, Response } from "express";
import { deleteAuthor } from "../../models/authorsModel";

export const adminDeleteAuthorController = async (
  req: Request,
  res: Response,
) => {
  try {
    await deleteAuthor(req.params.id);

    res.redirect("/admin/authors");
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
};
