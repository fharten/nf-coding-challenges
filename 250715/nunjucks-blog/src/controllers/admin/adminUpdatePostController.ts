import { Request, Response } from "express";
import { updatePost } from "../../models/blogEntriesModel";

export const adminUpdatePostController = async (
  req: Request,
  res: Response,
) => {
  const updatedPost = {
    ...req.body,
    updatedAt: Date.now(),
  };

  try {
    await updatePost(updatedPost);
    res.redirect("/admin");
  } catch (error) {
    res.status(500).send(`Error updating post: ${error}`);
  }
};
