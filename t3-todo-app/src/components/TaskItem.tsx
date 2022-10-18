import Link from "next/link";
import { useStore } from "../store";
import { UpdateTaskInput } from "../server/trpc/schema";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { trpc } from "../utils/trpc";

export const TaskItem = ({ id, title, body }: UpdateTaskInput) => {
  const update = useStore((state) => state.updateEditedTask);

  const deleteTask = trpc.task.deleteTask.useMutation();
  const handleDelete = async (taskId: string) => {
    await deleteTask.mutate(taskId);
    // TODO: React Queryのキャッシュからタスクを削除する？
  };

  return (
    <li>
      <Link href={`/task/${id}`}>
        <span className="cursor-pointer">{title}</span>
      </Link>
      <div className="float-right ml-20 flex">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-600"
          onClick={() => {
            update({ id, title, body });
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-600"
          onClick={() => handleDelete(id)}
        />
      </div>
      {deleteTask.isLoading && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
    </li>
  );
};
