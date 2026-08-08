import { useState } from "react";
import styles from "./TaskAddForm.module.css";
interface newTask {
  title: string;
  description: string;
  priority: "high" | "middle" | "low";
  id: string;
}
interface TaskAddFormProps {
  onAddTask: (newTask: newTask) => void;
}

export function TaskAddForm({ onAddTask }: TaskAddFormProps) {
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState<"high" | "middle" | "low">(
    "high",
  );
  const [taskDescription, setTaskDescription] = useState("");

  function addTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTask = {
      title: taskName,
      description: taskDescription,
      priority: taskPriority,
      id: crypto.randomUUID(),
    };
    onAddTask(newTask);
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
