import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";

import { adminBlogController } from "../controllers/admin/adminBlogController";
import { adminPostController } from "../controllers/admin/adminPostController";
import { adminUpdatePostController } from "../controllers/admin/adminUpdatePostController";
import { adminDeletePostController } from "../controllers/admin/adminDeletePostController";
import { adminCreatePostController } from "../controllers/admin/adminCreatePostController";
import { adminNewPostController } from "../controllers/admin/adminNewPostController";
import { adminGetAuthorsController } from "../controllers/admin/adminGetAuthorsController";
import { adminPostCreateAuthorController } from "../controllers/admin/adminPostCreateAuthorController";
import { adminGetCreateAuthorController } from "../controllers/admin/adminGetCreateAuthorController";
import { adminUpdateAuthorController } from "../controllers/admin/adminUpdateAuthorController";
import { adminAuthorController } from "../controllers/admin/adminAuthorController";
import { adminDeleteAuthorController } from "../controllers/admin/adminDeleteAuthorController";

const router = express.Router();

router.use(isAuthenticated);

router
  .get("/", adminBlogController)
  .get("/authors", adminGetAuthorsController)
  .get("/authors/create", adminGetCreateAuthorController)
  .get("/author/:id", adminAuthorController)
  .get("/post/create", adminNewPostController)
  .get("/post/:id", adminPostController)
  .post("/post/create", adminCreatePostController)
  .post("/post/update/:id", adminUpdatePostController)
  .post("/author/create", adminPostCreateAuthorController)
  .post("/author/update/:id", adminUpdateAuthorController)
  .post("/delete/post/:id", adminDeletePostController)
  .post("/delete/author/:id", adminDeleteAuthorController);

export default router;
