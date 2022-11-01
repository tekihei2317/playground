import { Router } from "express";
import { taskRouter } from "./task-router";

const mainRouter = Router();

mainRouter.use("/tasks", taskRouter);

export { mainRouter };
