import { Request, Response } from "express";
import { updateAuthor } from "../../models/authorsModel";

export const adminUpdateAuthorController = async (
  req: Request,
  res: Response,
) => {
  const updatedAuthor = {
    ...req.body,
    updatedAt: Date.now(),
  };

  try {
    await updateAuthor(updatedAuthor, req.params.id);
    res.redirect("/admin/authors");
  } catch (error) {
    res.status(500).send(`Error updating author: ${error}`);
  }
};
