import { makeApi } from "@zodios/core";
import { zodiosApp } from "@zodios/express";
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().max(10),
  email: z.string(),
});
const UserSchema = z.object({
  id: z.number(),
  name: z.string().max(10),
  email: z.string(),
});
const UsersSchema = z.array(UserSchema);

type User = z.infer<typeof UserSchema>;

// これをフロントエンドと共通化したいが、makeApiに渡すとバックエンドがコンパイルエラーになる
export const apiDefinition = [
  {
    method: "get" as const,
    path: "/users/:id",
    response: UserSchema,
    alias: "getUser",
    description: "Get user",
  },
  {
    method: "get" as const,
    path: "/users",
    response: UsersSchema,
    alias: "getUsers",
    description: "Get users",
  },
  {
    method: "post" as const,
    path: "/users",
    response: UserSchema,
    alias: "createUser",
    description: "Create user",
    parameters: [
      {
        name: "body",
        type: "Body" as const,
        schema: CreateUserSchema,
      },
    ],
  },
];

const api = makeApi([
  {
    method: "get" as const,
    path: "/users/:id",
    response: UserSchema,
    alias: "getUser",
    description: "Get user",
  },
  {
    method: "get" as const,
    path: "/users",
    response: UsersSchema,
    alias: "getUsers",
    description: "Get users",
  },
  {
    method: "post" as const,
    path: "/users",
    response: UserSchema,
    alias: "createUser",
    description: "Create user",
    parameters: [
      {
        name: "body",
        type: "Body" as const,
        schema: CreateUserSchema,
      },
    ],
  },
]);

const app = zodiosApp(api);

let userId = 1;
const users: User[] = [];

app.get("/users/:id", (req, res) => {
  // TODO: パスパラメーターに型をつけたい
  const userId = Number(req.params.id);
  const user = users[userId];

  if (user === undefined) {
    return res.status(404).send();
  }

  return res.json(user);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = { ...req.body, id: userId++ };
  users.push(newUser);

  res.json(newUser);
});

app.listen(3000, function () {
  console.log("server is listening at port 3000");
});
