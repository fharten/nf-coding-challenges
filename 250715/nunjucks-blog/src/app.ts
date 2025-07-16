require("dotenv").config();

import express from "express";
import nunjucks from "nunjucks";
import cors from "cors";
import { logger } from "./middlewares/loggerMiddleware";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(cors());

app.use(publicRoutes).use("/admin", adminRoutes);

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
