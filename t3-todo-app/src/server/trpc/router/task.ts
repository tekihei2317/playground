import { z } from "zod";
import {
  createTask,
  updateTask,
  getTasks,
  deleteTask,
} from "../../use-cases/task";
import { router, publicProcedure } from "../trpc";
import { getTaskProcedure } from "../../procedures/task";

// schema
const taskIdSchema = z.string().cuid();

const createTaskSchema = z.object({
  title: z.string().max(20),
  body: z.string().min(5),
});

const updateTaskSchema = z.object({
  id: taskIdSchema, // パスパラメータがないので直接含める
  title: z.string().max(20),
  body: z.string().min(5),
});

export type TaskId = z.TypeOf<typeof taskIdSchema>;
export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>;

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
export const todoRouter = router({
  getTasks: getTasksProcedure,
  getTask: getTaskProcedure,
  createTask: createTaskProcedure,
  updateTask: updateTaskProcedure,
  deleteTask: deleteTaskProcedure,
});
