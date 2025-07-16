require("dotenv").config();

import express from "express";
import nunjucks from "nunjucks";
import cors from "cors";
import session from "express-session";
import passport, { Profile as PassportProfile } from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { logger } from "./middlewares/loggerMiddleware";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";
import { User } from "./types/User";
import { log } from "console";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.AUTH_SECRET!,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(logger);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  console.log(req.user);
  next();
});

app.use(publicRoutes).use("/admin", adminRoutes);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "/auth/github/callback",
    },
    (
      _accessToken: string,
      _refreshToken: string,
      profile: PassportProfile,
      done: (error: any, user?: Express.User | false | null) => void,
    ) => {
      const user: Express.User = {
        id: profile.id,
        username: profile.username ?? "",
        displayName: profile.displayName ?? "",
        profileUrl: (profile as any).profileUrl,
      };

      done(null, user);
    },
  ),
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((obj: Express.User, done) => {
  done(null, obj);
});

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (_req, res) => res.redirect("/admin"),
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
