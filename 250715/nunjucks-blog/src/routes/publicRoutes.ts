import express from "express";

import { aboutController } from "../controllers/aboutController";
import { homeController } from "../controllers/homeController";
import { postController } from "../controllers/postController";
import { contactController } from "../controllers/contactController";
import { authorController } from "../controllers/authorController";

const router = express.Router();

router
  .get("/", homeController)
  .get("/page/:number", homeController)
  .get("/index", homeController)
  .get("/about", aboutController)
  .get("/contact", contactController)
  .get("/post/:slug", postController)
  .get("/author/:id", authorController);

export default router;
