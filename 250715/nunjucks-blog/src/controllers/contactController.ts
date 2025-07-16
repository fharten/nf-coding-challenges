import { Request, Response } from "express";

export const contactController = (req: Request, res: Response) => {
  res.render("../views/pages/contact.html", {
    meta: {
      title: "Contact",
    },
    headerData: {
      image: "contact-bg.jpg",
      title: "Contact Me",
      subTitle: "Have questions? I have answers.",
    },
  });
};
