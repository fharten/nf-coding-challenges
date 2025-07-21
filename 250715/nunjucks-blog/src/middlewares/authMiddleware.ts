import type { Request, Response, NextFunction } from "express";
import type session from "express-session";
import type { User } from "../types/User";
import { getUserById } from "../models/userModel";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = req.session as session.Session & {
    passport?: { user?: string };
  };
  const userLoggedIn = await getUserById(session.passport?.user!);
  if (req.isAuthenticated() && userLoggedIn.isAdmin) {
    return next();
  }
  res.redirect("/");
}
