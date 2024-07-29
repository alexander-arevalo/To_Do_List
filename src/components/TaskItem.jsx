import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { useSnackbar } from "notistack";

import { TasksContext } from "../store/task-context.jsx";

export default function TaskItem({ task, onViewDetails, isExpanded }) {
  const { updateTaskStatus, deleteTask } = useContext(TasksContext);
  const { enqueueSnackbar } = useSnackbar();

  const formattedDate = new Date(task.deadline).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function handleDelete() {
    enqueueSnackbar("Successfully Deleted the Task", { variant: "success" });
    deleteTask(task.id);
  }

  function handleCancel() {
    enqueueSnackbar("The Task is now in the Backlog", { variant: "warning" });
    updateTaskStatus(task.id, "failed");
  }

  function handleComplete() {
    enqueueSnackbar("Successfully Completed the Task", { variant: "success" });
    updateTaskStatus(task.id, "completed");
  }

  return (
    <motion.li layout exit={{ y: -30, opacity: 0 }}>
      <article className="task-item">
        <header>
          <img {...task.image} />
          <div className="task-item-meta">
            <h2>{task.title}</h2>
            <p>Complete until {formattedDate}</p>
            <p className="task-item-actions">
              <button onClick={handleDelete} className="btn-negative">
                Delete
              </button>
              <button onClick={handleCancel} className="btn-negative">
                Mark as Backlog
              </button>
              {task.status !== "completed" && (
                <button onClick={handleComplete}>Mark as Done</button>
              )}
              {task.status === "completed" && (
                <button disabled>Mark as Done</button>
              )}
            </p>
          </div>
        </header>
        <div className="task-item-details">
          <p>
            <button onClick={onViewDetails}>
              View Details
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="task-item-details-icon"
              >
                &#9650;
              </motion.span>
            </button>
          </p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="task-item-description">{task.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </motion.li>
  );
}
