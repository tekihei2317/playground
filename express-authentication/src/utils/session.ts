import session from "express-session";

export const sessionMiddleware = session({
  secret: "dummy secret", // TODO:
  cookie: {
    sameSite: "lax",
  },
});
