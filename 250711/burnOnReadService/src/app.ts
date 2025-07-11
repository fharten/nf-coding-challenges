import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import {
  createMessageFile,
  readAndDeleteMessage,
} from "./middleware/uploadMiddleware";

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure("src/templates", {
  autoescape: true,
  express: app,
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("form.html");
});

app.post("/create", createMessageFile, (req, res) => {
  res.render("link.html", { url: res.locals.messageUrl });
});

app.get("/message/:id", async (req, res) => {
  try {
    const content = await readAndDeleteMessage(req.params.id);
    res.render("message.html", { content });
  } catch (error) {
    res.status(404).send("Message not found or has already been viewed.");
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
