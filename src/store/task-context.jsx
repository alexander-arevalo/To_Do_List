import { createContext, useState, useEffect } from "react";

export const TasksContext = createContext({
  Tasks: [],
  addTask: () => {},
  updateTaskStatus: () => {},
});

export default function TaskContextProvider({ children }) {
  const [Tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(Tasks));
  }, [Tasks]);

  function addTask(Task) {
    setTasks((prevTasks) => [
      { ...Task, id: Math.random().toString(), status: "active" },
      ...prevTasks,
    ]);
  }

  function deleteTask(TaskId) {
    setTasks((prevTasks) => prevTasks.filter((Task) => Task.id !== TaskId));
  }

  function updateTaskStatus(taskId, newStatus) {
    setTasks((prevTask) =>
      prevTask.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  }

  const TaskContext = {
    Tasks,
    addTask,
    deleteTask,
    updateTaskStatus,
  };

  return (
    <TasksContext.Provider value={TaskContext}>
      {children}
    </TasksContext.Provider>
  );
}
