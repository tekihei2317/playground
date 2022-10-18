import {
  createTask,
  updateTask,
  getTasks,
  deleteTask,
} from "../../use-cases/task";
import { router, publicProcedure } from "../trpc";
import { getTaskProcedure } from "../../procedures/task";
import { createTaskSchema, taskIdSchema, updateTaskSchema } from "../schema";

// procedure
const createTaskProcedure = publicProcedure
  .input(createTaskSchema)
  .mutation(async ({ ctx, input }) => {
    return await createTask(ctx, input);
  });

const updateTaskProcedure = publicProcedure
  .input(updateTaskSchema)
  .mutation(async ({ ctx, input }) => {
    return await updateTask(ctx, input);
  });

const getTasksProcedure = publicProcedure.query(async ({ ctx }) => {
  return await getTasks(ctx);
});

const deleteTaskProcedure = publicProcedure
  .input(taskIdSchema)
  .mutation(async ({ ctx, input }) => {
    return await deleteTask(ctx, input);
  });

// router
export const taskRouter = router({
  getTasks: getTasksProcedure,
  getTask: getTaskProcedure,
  createTask: createTaskProcedure,
  updateTask: updateTaskProcedure,
  deleteTask: deleteTaskProcedure,
});
