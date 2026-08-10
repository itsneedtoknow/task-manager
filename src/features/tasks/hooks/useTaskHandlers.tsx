import { useState } from "react";
import type { NewTask } from "../types.tsx";
import {
  useAddTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "./useTaskQueries.tsx";
export function useTaskHandlers() {
  const { data: tasks = [], isLoading, isError } = useTasks();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<NewTask | null>(null);
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
  function openTaskModalHandler() {
    setIsTaskModalOpen(true);
  }
  function closeAddTaskModalHandler() {
    setEditTask(null);
    setIsTaskModalOpen(false);
  }
  return {
    tasks,
    isLoading,
    isError,
    isTaskModalOpen,
    editTask,
    deleteTaskHandler,
    addTaskHandler,
    editTaskHandler,
    updateTasksHandler,
    openTaskModalHandler,
    closeAddTaskModalHandler,
  };
}
