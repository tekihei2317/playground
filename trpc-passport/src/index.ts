import * as express from "express";
import { ensureLoggedIn } from "./middlewares/authentication";
import { trpcExpressMiddleware } from "./trpc/express-middleware";
import { passport } from "./utils/passport";
import * as session from "express-session";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  session({
    secret: "test secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

// ルーティング定義
app.get("/", (_, res) => {
  res.json({ hello: "world" });
});

app.post("/login", passport.authenticate("local"), (_, res) => {
  res.status(201).json({ message: "ログインしました" });
});

app.get("/me", ensureLoggedIn, (req, res) => {
  res.json(req.user);
});

// ルーティング定義より後ろに書く(普通のリクエストがtRPCに処理されないようにするため)
app.use(trpcExpressMiddleware);

// サーバーを起動する
app.listen(port, () => {
  console.log(`Server is listening at port ${port}.`);
});
