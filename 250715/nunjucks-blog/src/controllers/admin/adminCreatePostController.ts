import { Request, Response } from "express";
import { createPost } from "../../models/blogEntriesModel";

export const adminCreatePostController = async (
  req: Request,
  res: Response,
) => {
  try {
    await createPost(req.body);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send(`Error updating post: ${error}`);
  }
};
