import express from "express";
import { sessionMiddleware } from "./utils/session";
import { mainRouter } from "./router";
import { passport } from "./utils/passport";

const app = express();
const port = 3000;

app.use(sessionMiddleware);
app.use(passport.authenticate("session"));
app.use(express.json());
app.use(mainRouter);

app.get("/", function (req, res) {
  res.send({ hello: "world" });
});

app.listen(port, function () {
  console.log(`server is listening at port ${port}.`);
});
