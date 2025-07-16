import express from "express";
import passport from "passport";

const router = express.Router();

router
  .get("/auth/github", passport.authenticate("github"))
  .get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (_req, res) => res.redirect("/admin"),
  )
  .get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });

export default router;
