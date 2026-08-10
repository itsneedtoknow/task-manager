import { useState } from "react";
import type { NewTask } from "../types.tsx";
import {
  useAddTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "./useTaskQueries.tsx";
import { useDebounce } from "./useDebounce.tsx";
export function useTaskPageHandlers() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { data: tasks = [], isLoading, isError } = useTasks(debouncedSearch);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<NewTask | null>(null);
  const [taskStatus, setTaskStatus] = useState<
    "to do" | "in progress" | "done"
  >(editTask ? editTask.status : "to do");
  const { mutate: addTask } = useAddTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  function deleteTaskHandler(id: string) {
    deleteTask(id);
  }
  function addTaskHandler(newTask: NewTask) {
    addTask(newTask);
    closeAddTaskModalHandler();
    setEditTask(null);
  }
  function editTaskHandler(id: string) {
    const taskToEdit = tasks.find((item) => item.id === id);
    if (!taskToEdit) {
      return;
    }
    setEditTask(taskToEdit);
    openTaskModalHandler();
  }
  function updateTasksHandler(updatedTask: NewTask) {
    if (!updatedTask) {
      return;
    } else {
      updateTask(updatedTask);
      closeAddTaskModalHandler();
      setEditTask(null);
    }
  }
  function updateTaskStatusHandler(
    id: string,
    newStatus: "to do" | "in progress" | "done",
  ) {
    const currentTask = tasks.find((task) => task.id === id);
    if (!currentTask) return;

    const updatedTask = {
      ...currentTask,
      status: newStatus,
    };

    updateTask(updatedTask);
  }
  function openTaskModalHandler() {
    setIsTaskModalOpen(true);
  }
  function closeAddTaskModalHandler() {
    setEditTask(null);
    setIsTaskModalOpen(false);
  }

  return {
    tasks,
    search,
    isLoading,
    isError,
    isTaskModalOpen,
    editTask,
    taskStatus,
    setSearch,
    deleteTaskHandler,
    addTaskHandler,
    editTaskHandler,
    updateTasksHandler,
    openTaskModalHandler,
    closeAddTaskModalHandler,
    setTaskStatus,
    updateTaskStatusHandler,
  };
}
