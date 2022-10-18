import { useStore } from "../store";
import { trpc } from "../utils/trpc";

export const useMutateTask = () => {
  const utils = trpc.useContext();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = trpc.task.createTask.useMutation({
    onSuccess: (res) => {
      // React Queryのキャッシュを更新しているみたい。再取得してもいいのでは？
      const previousTasks = utils.task.getTasks.getData();
      if (previousTasks) {
        utils.task.getTasks.setData([res, ...previousTasks]);
      }
      reset();
    },
  });

  const updateTaskMutation = trpc.task.updateTask.useMutation({
    onSuccess: (res) => {
      const previousTasks = utils.task.getTasks.getData();
      if (previousTasks) {
        utils.task.getTasks.setData(
          previousTasks.map((task) => (task.id === res.id ? res : task))
        );
      }
      reset();
    },
  });

  return { createTaskMutation, updateTaskMutation };
};
