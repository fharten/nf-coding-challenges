/// <reference types="node" />
import "express-session";
import type { User as AppUser } from "../User";

declare module "express-session" {
  interface SessionData {
    user?: AppUser;
  }
}
