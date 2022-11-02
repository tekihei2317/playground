import * as express from "express";
import { trpcExpressMiddleware } from "./trpc/express-middleware";

const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.json({ hello: "world" });
});

app.use(trpcExpressMiddleware);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}.`);
});
