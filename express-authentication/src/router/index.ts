import { Router } from "express";
import { validateRequired, validateString } from "../utils/validation";
import { taskRouter } from "./task-router";

const mainRouter = Router();

mainRouter.use("/tasks", taskRouter);

type User = {
  userName: string;
  password: string;
};

const users: User[] = [
  {
    userName: "root",
    password: "password",
  },
];

mainRouter.post("/signup", function (req, res) {
  // ユーザー登録をする
  const userName = req.body.user_name;
  const password = req.body.password;

  const messages = [
    validateRequired("名前", userName),
    validateString("名前", userName),
    validateRequired("パスワード", password),
    validateString("パスワード", password),
  ].filter((message) => message !== undefined);

  if (messages.length > 0) {
    return res.status(400).json({ messages });
  }

  const newUser = { userName, password };
  users.push(newUser);

  return res.status(201).json(newUser);
});

mainRouter.post("/signin", function (req, res) {
  // ログインする
  const userName = req.body.user_name;
  const password = req.body.password;

  const messages = [
    validateRequired("名前", userName),
    validateString("名前", userName),
    validateRequired("パスワード", password),
    validateString("パスワード", password),
  ].filter((message) => message !== undefined);

  if (messages.length > 0) {
    return res.status(400).json({ messages });
  }

  const user = users.find(
    (u) => u.userName === userName && u.password === password
  );
  if (user === undefined) {
    return res
      .status(400)
      .json({ message: "ユーザー名またはパスワードが間違っています" });
  }

  req.session.currentUserIdentifier = userName;
  return res.status(201).json({ message: "ログインしました" });
});

mainRouter.get("/me", function (req, res) {
  // ログイン中のユーザーを取得する
  if (req.session.currentUserIdentifier === undefined) {
    // TODO: ミドルウェアで弾く
    throw new Error("ログインしていません");
  }

  const user = users.find(
    (user) => user.userName === req.session.currentUserIdentifier
  );
  return res.status(201).json(user);
});

mainRouter.get("/session-test", function (req, res) {
  if (req.session.views === undefined) {
    req.session.views = 0;
  } else {
    req.session.views++;
  }
  return res.json({ views: req.session.views });
});

export { mainRouter };
