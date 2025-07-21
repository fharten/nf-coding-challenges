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
import { CustomSQLiteStore } from "./store/CustomSQLiteStore";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

configurePassport();

connectDB()
  .then(() => {
    app.use(
      session({
        store: new CustomSQLiteStore(),
        secret: process.env.AUTH_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });

    app.use(publicRoutes).use("/admin", adminRoutes).use(authRoutes);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error(`Failed to start Database server: ${error}`);
  });
