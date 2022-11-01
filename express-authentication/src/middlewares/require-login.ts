import { Request, Response, NextFunction } from "express";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export const requireLogin: Middleware = (req, res, next) => {
  console.log({ user: req.user });
  if (req.user === undefined) {
    res.status(401).json({ message: "ログインしてください" });
    return;
  }
  next();
};
