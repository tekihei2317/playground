import { Router } from "express";

const taskRouter = Router();

type Task = {
  id: number;
  name: string;
};

let taskId = 3;
const tasks: Task[] = [
  {
    id: 1,
    name: "expressを使ってみる",
  },
  {
    id: 2,
    name: "passportを使ってみる",
  },
];

taskRouter.get("/", function (req, res) {
  return res.json(tasks);
});

taskRouter.post("/", function (req, res) {
  const taskName = req.body.name;

  if (taskName === undefined) {
    return res.status(400).json({ message: "名前は必須です" });
  }
  if (typeof taskName !== "string") {
    return res.status(400).json({ message: "名前は文字列で指定してください" });
  }

  const newTask = {
    id: taskId++,
    name: taskName,
  };
  tasks.push(newTask);

  return res.status(201).json(newTask);
});

export { taskRouter };
