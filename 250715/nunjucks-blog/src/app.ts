require("dotenv").config();

import express from "express";
import nunjucks from "nunjucks";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { configurePassport } from "./auth/passport";
import { logger } from "./middlewares/loggerMiddleware";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./db/database";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);
app.use(
  session({
    secret: process.env.AUTH_SECRET!,
    resave: false,
    saveUninitialized: false,
  }),
);

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

connectDB()
  .then(() => {
    app.use(publicRoutes).use("/admin", adminRoutes).use(authRoutes);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error(`Failed to start Database server: ${error}`);
  });
