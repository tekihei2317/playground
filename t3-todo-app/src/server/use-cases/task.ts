import { CreateTaskInput, TaskId, UpdateTaskInput } from "../trpc/router/task";
import { Context } from "../trpc/context";

const userId = "tekihei2317"; // TODO:

// TODO: ContextはDIしたほうがよい？
export async function createTask({ prisma }: Context, input: CreateTaskInput) {
  const task = await prisma.task.create({
    data: { ...input, userId },
  });

  return task;
}

export async function updateTask({ prisma }: Context, input: UpdateTaskInput) {
  const { id: taskId, ...taskInput } = input;

  // TODO: 認可を実装する
  // TODO: タスクがなかった場合のエラーハンドリングについて
  // 戻り値がTaskになっているので、存在しなかった場合はDBのエラーになる？
  const task = await prisma.task.update({
    where: { id: taskId },
    data: taskInput,
  });

  return task;
}

export async function getTasks({ prisma }: Context) {
  return await prisma.task.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteTask({ prisma }: Context, taskId: TaskId) {
  const filter = { where: { id: taskId } };
  const task = await prisma.task.findUnique(filter);

  if (task === null) {
    throw new Error("Task is not found.");
  }

  if (task.userId !== userId) {
    // TODO: ちゃんと書く
    throw new Error("Unauthorized");
  }

  await prisma.task.delete(filter);
}
