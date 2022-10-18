import { trpc } from "../utils/trpc";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const { data, isLoading, error } = trpc.task.getTasks.useQuery();

  if (isLoading) {
    return <p>Loading task list...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!data) {
    return <></>;
  }

  return (
    <ul>
      {data.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          body={task.body}
        />
      ))}
    </ul>
  );
};
