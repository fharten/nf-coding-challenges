import express from "express";

import { aboutController } from "../controllers/aboutController";
import { homeController } from "../controllers/homeController";
import { postController } from "../controllers/postController";
import { samplePostController } from "../controllers/samplePostController.ts";
import { contactController } from "../controllers/contactController";

const router = express.Router();

router
  .get("/", homeController)
  .get("/index", homeController)
  .get("/about", aboutController)
  .get("/contact", contactController)
  .get("/post/:slug", postController)
  .get("/post", samplePostController);

export default router;
