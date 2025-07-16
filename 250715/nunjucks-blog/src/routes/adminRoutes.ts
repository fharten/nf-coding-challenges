import express from "express";

import { adminBlogController } from "../controllers/admin/adminBlogController";
import { adminPostController } from "../controllers/admin/adminPostController";
import { adminUpdatePostController } from "../controllers/admin/adminUpdatePostController";
import { adminDeletePostController } from "../controllers/admin/adminDeletePostController";
import { adminCreatePostController } from "../controllers/admin/adminCreatePostController";
import { adminNewPostController } from "../controllers/admin/adminNewPostController";

const router = express.Router();

router
  .get("/", adminBlogController)
  .get("/post", adminNewPostController)
  .get("/post/:slug", adminPostController)
  .post("/create", adminCreatePostController)
  .post("/update/:slug", adminUpdatePostController)
  .post("/delete/:slug", adminDeletePostController);

export default router;
