import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import NewTask from "./NewTask.jsx";

export default function Header() {
  const [isCreatingTask, setisCreatingTask] = useState();

  function handleStartAddNewTask() {
    setisCreatingTask(true);
  }

  function handleDone() {
    setisCreatingTask(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingTask && <NewTask onDone={handleDone} />}
      </AnimatePresence>
      <header id="main-header">
        <h1>Your Task</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          onClick={handleStartAddNewTask}
          className="button"
        >
          Add Task
        </motion.button>
      </header>
    </>
  );
}
