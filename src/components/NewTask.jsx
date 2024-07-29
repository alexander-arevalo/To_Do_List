import { motion, useAnimate, stagger } from "framer-motion";
import { useSnackbar } from "notistack";

import { useContext, useRef, useState } from "react";

import { TasksContext } from "../store/task-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewTask({ onDone }) {
  const { enqueueSnackbar } = useSnackbar();
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addTask } = useContext(TasksContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const task = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !task.title.trim() ||
      !task.description.trim() ||
      !task.deadline.trim() ||
      !task.image
    ) {
      animate(
        "input, textarea",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    onDone();
    addTask(task);
    enqueueSnackbar("Successfully Added the Task", { variant: "success" });
  }

  return (
    <Modal title="New Task" onClose={onDone}>
      <form id="new-task" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          id="new-task-images"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: "string" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-task-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Task</button>
        </p>
      </form>
    </Modal>
  );
}
