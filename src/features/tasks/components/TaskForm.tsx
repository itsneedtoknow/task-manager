import { useState } from "react";
import styles from "./TaskForm.module.css";
import type { NewTask } from "../types";
import { Select } from "../../../components/Select";
import { useTaskPageHandlers } from "../hooks/useTaskPageHandlers";

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
  const { taskStatus, setTaskStatus } = useTaskPageHandlers();
  // const [taskStatus, setTaskStatus] = useState<
  //   "to do" | "in progress" | "done"
  // >(editTask ? editTask.status : "to do");
  function addTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editTask) {
      const updatedTask = {
        title: taskName,
        description: taskDescription,
        priority: taskPriority,
        status: taskStatus,
        id: editTask.id,
      };
      onUpdateTask(updatedTask);
    } else {
      const newTask = {
        title: taskName,
        description: taskDescription,
        priority: taskPriority,
        status: taskStatus,
        id: crypto.randomUUID(),
      };
      onAddTask(newTask);
    }
    setTaskName("");
    setTaskDescription("");
    setTaskPriority("high");
    setTaskStatus("to do");
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

      <label htmlFor="task-priority" style={{ width: "45%" }}>
        Priority
        <Select
          id="task-priority"
          value={taskPriority}
          onChange={(e) =>
            setTaskPriority(e.target.value as "high" | "middle" | "low")
          }
          options={[
            { value: "high", label: "high" },
            { value: "middle", label: "middle" },
            { value: "low", label: "low" },
          ]}
        />
      </label>
      <label htmlFor="task-status" style={{ width: "45%" }}>
        Status
        <Select
          value={taskStatus}
          options={[
            { value: "to do", label: "to do" },
            { value: "in progress", label: "in progress" },
            { value: "done", label: "done" },
          ]}
          onChange={(e) =>
            setTaskStatus(e.target.value as "to do" | "in progress" | "done")
          }
        />
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
