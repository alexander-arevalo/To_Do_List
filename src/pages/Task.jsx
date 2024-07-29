import Header from "../components/Header.jsx";
import Task from "../components/Task.jsx";
import TasksContextProvider from "../store/task-context.jsx";

export default function TaskPage() {
  return (
    <TasksContextProvider>
      <Header />
      <main>
        <Task />
      </main>
    </TasksContextProvider>
  );
}
