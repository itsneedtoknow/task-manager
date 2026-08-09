import { useState } from "react";
import styles from "./TaskForm.module.css";
import type { NewTask } from "../types";

interface TaskFormProps {
  onAddTask: (newTask: NewTask) => void;
  editTask?: NewTask | null;
  onUpdateTask: (newTask: NewTask) => void;
}

export function TaskForm({ onAddTask, editTask, onUpdateTask }: TaskFormProps) {
  const [taskName, setTaskName] = useState(editTask ? editTask.title : "");
  const [taskPriority, setTaskPriority] = useState<"high" | "middle" | "low">(
    editTask ? editTask.priority : "high",
  );
  const [taskDescription, setTaskDescription] = useState(
    editTask ? editTask.description : "",
  );

  function addTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editTask) {
      const updatedTask = {
        title: taskName,
        description: taskDescription,
        priority: taskPriority,
        id: editTask.id,
      };
      onUpdateTask(updatedTask);
    } else {
      const newTask = {
        title: taskName,
        description: taskDescription,
        priority: taskPriority,
        id: crypto.randomUUID(),
      };
      onAddTask(newTask);
    }
    setTaskName("");
    setTaskDescription("");
    setTaskPriority("high");
  }

  return (
    <form
      className={styles.formContainer}
      onClick={(e) => e.stopPropagation()}
      onSubmit={addTask}
    >
      <h2>Create New Task</h2>

      <label htmlFor="task-name">
        Task name
        <input
          type="text"
          id="task-name"
          placeholder="Enter task title..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </label>

      <label htmlFor="task-priority">
        Priority
        <select
          id="task-priority"
          value={taskPriority}
          onChange={(e) =>
            setTaskPriority(e.target.value as "high" | "middle" | "low")
          }
        >
          <option value="high">High</option>
          <option value="middle">Middle</option>
          <option value="low">Low</option>
        </select>
      </label>

      <label htmlFor="task-description">
        Description
        <textarea
          id="task-description"
          placeholder="Enter task description..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
      </label>

      <button type="submit">Create</button>
    </form>
  );
}
