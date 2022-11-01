import { Request, Response, NextFunction } from "express";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export const requireLogin: Middleware = (req, res, next) => {
  if (req.session.currentUser === undefined) {
    res.status(401).json({ message: "ログインしてください" });
    return;
  }
  next();
};
