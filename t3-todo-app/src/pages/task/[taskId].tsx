import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { trpc } from "../../utils/trpc";
import { Layout } from "../../components/Layout";

const TaskPage: NextPage = () => {
  const router = useRouter();
  const taskId = router.query.taskId as string;
  const { data, isLoading, error } = trpc.task.getTask.useQuery({ id: taskId });

  if (!isLoading) {
    return <Layout title="Task Detail">Loading...</Layout>;
  }
  if (!data) {
    return <Layout title="Task Detail">No Data</Layout>;
  }

  return (
    <Layout title="Task Detail">
      <p className="mb-3 text-xl font-bold text-blue-600">title</p>
      <p>data.body</p>
      <p className="my-1 text-sm">data.createdAt</p>
      <p className="my-1 text-sm">data.updatedAt</p>
      <Link href="/">
        <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-600" />
      </Link>
    </Layout>
  );
};

export default TaskPage;
