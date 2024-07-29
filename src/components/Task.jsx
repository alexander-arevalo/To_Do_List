import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";

import { TasksContext } from "../store/task-context.jsx";
import TaskItem from "./TaskItem.jsx";
import TaskTabs from "./TaskTabs.jsx";

export default function Task() {
  const { Tasks } = useContext(TasksContext);

  const [selectedType, setSelectedType] = useState("active");
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredTask = {
    active: Tasks.filter((task) => task.status === "active"),
    completed: Tasks.filter((task) => task.status === "completed"),
    failed: Tasks.filter((task) => task.status === "failed"),
  };

  const displayedTask = filteredTask[selectedType];

  return (
    <div id="task">
      <TaskTabs
        task={filteredTask}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        <AnimatePresence mode="wait">
          {displayedTask.length > 0 && (
            <motion.ol
              key="list"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: -30, opacity: 0 }}
              className="task-items"
            >
              <AnimatePresence>
                {displayedTask.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onViewDetails={() => handleViewDetails(task.id)}
                    isExpanded={expanded === task.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}
          {displayedTask.length === 0 && (
            <motion.p
              key="fallback"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              No Task found.
            </motion.p>
          )}
        </AnimatePresence>
      </TaskTabs>
    </div>
  );
}
