import { Request, Response } from "express";
import { getAllAuthors } from "../models/authorsModel";
import { Author } from "../types/Author";
import { getBlogEntriesByAuthor } from "../models/blogEntriesModel";

export const authorController = async (req: Request, res: Response) => {
  const authorId = req.params.id;
  const authors = await getAllAuthors();
  const author = authors.find((a: Author) => a.id === authorId);
  const blogEntries = await getBlogEntriesByAuthor(authorId);

  if (!author) return res.status(404).send("Author not found");

  res.render("../views/pages/author.html", {
    meta: {
      title: `Author | ${author.name}`,
    },
    blogEntries,
    author: {
      name: author.name,
      firstName: author.name.substring(0, author.name.indexOf(" ")),
      date: author.date,
      bio: author.bio,
      avatar: author.avatar,
      email: author.email,
    },
  });
};
