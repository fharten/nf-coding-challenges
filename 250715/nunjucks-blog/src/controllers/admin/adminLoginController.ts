import { Request, Response } from "express";

export const adminLoginController = async (req: Request, res: Response) => {
  if (req.user) return res.redirect("/admin");

  res.render("../views/admin/login.html", {
    meta: {
      title: "Login",
    },
  });
};
