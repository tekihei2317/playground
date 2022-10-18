import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

const Home: NextPage = () => {
  return (
    <Layout title="Todo App">
      <TaskForm />
      <TaskList />
    </Layout>
  );
};

export default Home;
