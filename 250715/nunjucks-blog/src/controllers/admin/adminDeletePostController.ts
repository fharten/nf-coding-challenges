import { Request, Response } from "express";
import { deletePost } from "../../models/blogEntriesModel";

export const adminDeletePostController = async (
  req: Request,
  res: Response,
) => {
  try {
    await deletePost(req.params.id);

    res.redirect("/admin");
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
};
