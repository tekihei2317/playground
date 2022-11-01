import "express-session";
import { User } from "../utils/user";

declare module "express-session" {
  interface SessionData {
    views: number;
    currentUserIdentifier: string;
    currentUser: User;
  }
}
