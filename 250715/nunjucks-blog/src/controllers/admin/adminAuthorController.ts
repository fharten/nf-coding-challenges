import { Request, Response } from "express";
import { getAllBlogEntries } from "../../models/blogEntriesModel";
import { Author } from "../../types/Author";
import { getAllAuthors } from "../../models/authorsModel";

export const adminAuthorController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const blogEntries = await getAllBlogEntries();
  const authors = await getAllAuthors();
  const author = authors.find((a: Author) => a.id === id);

  if (!author) return res.status(404).send("Post not found");

  res.render("../views/admin/editAuthor.html", {
    blogEntries,
    meta: {
      title: "Admin Panel | Edit Author",
      postUrl: `update/${id}`,
    },
    mainData: {
      id: author.id,
      name: author.name,
      email: author.email,
      avatar: author.avatar,
      bio: author.bio,
      date: author.date,
      createdAt: author.createdAt,
    },
  });
};
