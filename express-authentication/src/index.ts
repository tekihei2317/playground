import express from "express";
import { mainRouter } from "./router";

const app = express();
const port = 3000;

app.use(express.json());
app.use(mainRouter);

app.get("/", function (req, res) {
  res.send({ hello: "world" });
});

app.listen(port, function () {
  console.log(`server is listening at port ${port}.`);
});
