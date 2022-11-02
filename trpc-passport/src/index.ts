import * as express from "express";

const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.json({ hello: "world" });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}.`);
});
