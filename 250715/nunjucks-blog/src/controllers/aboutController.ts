import { Request, Response } from "express";

export const aboutController = (req: Request, res: Response) => {
  res.render("../views/pages/about.html", {
    meta: {
      title: "About",
    },
    headerData: {
      image: "about-bg.jpg",
      title: "About Me",
      subTitle: "This is what I do.",
    },
  });
};
