import { z } from "zod";

export const taskIdSchema = z.string().cuid();

export const createTaskSchema = z.object({
  title: z.string().max(20),
  body: z.string().min(5),
});

export const updateTaskSchema = z.object({
  id: taskIdSchema, // パスパラメータがないので直接含める
  title: z.string().max(20),
  body: z.string().min(5),
});

export type TaskId = z.TypeOf<typeof taskIdSchema>;
export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>;
