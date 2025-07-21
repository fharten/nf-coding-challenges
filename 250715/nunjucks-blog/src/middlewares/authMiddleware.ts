import type { Request, Response, NextFunction } from "express";
import type session from "express-session";
import type { User } from "../types/User";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = req.session as session.Session & { user?: User };
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}
