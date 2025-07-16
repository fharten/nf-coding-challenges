import type { Request, Response, NextFunction } from "express";
import { access, constants, writeFile, readFile, rm } from "node:fs/promises";
import * as path from "node:path";
import * as crypto from "crypto";
import { sanitizeInput } from "../actions/actions";

const MSG_DIR = path.join(__dirname, "..", "..", "messages");

(async () => {
  try {
    await access(MSG_DIR, constants.F_OK);
    return true;
  } catch (error) {
    console.error(`Error accessing directory: ${error}`);
    return false;
  }
})();

export async function createMessageFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const message = req.body.message;
  const sanitizeMsg = sanitizeInput(message);

  try {
    if (!sanitizeMsg.trim()) {
      return res.status(400).send("Message can't be empty.");
    }

    const id = crypto.randomUUID();
    const filePath = path.join(MSG_DIR, `${id}.txt`);

    await writeFile(filePath, sanitizeMsg, { encoding: "utf-8" });
    res.locals.messageUrl = `${req.protocol}://${req.get("host")}/message/${id}`;

    next();
  } catch (error) {
    console.error(`Error creating text: ${error}`);
    next(error);
  }
}

export async function readAndDeleteMessage(id: string) {
  const filePath = path.join(MSG_DIR, `${id}.txt`);

  try {
    const content = await readFile(filePath, { encoding: "utf-8" });
    await rm(filePath);
    return content;
  } catch (error) {
    return "This message has already been viewed or does not exist.";
  }
}
