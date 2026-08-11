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
  const [modalType, setModalType] = useState<"null" | "task" | "detail">(
    "null",
  );
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<NewTask | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<
    "" | "low" | "middle" | "high"
  >("");
  const { mutate: addTask } = useAddTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  function deleteTaskHandler(id: string) {
    deleteTask(id);
  }
  function addTaskHandler(newTask: Omit<NewTask, "creationDate">) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Date()
      .toLocaleDateString("en-US", options)
      .replace(",", "")
      .replace(" at", " at");

    const taskWithDate: NewTask = {
      ...newTask,
      creationDate: formattedDate,
    };

    addTask(taskWithDate);
    closeAddTaskModalHandler();
    setEditTask(null);
  }
  function editTaskHandler(id: string) {
    const taskToEdit = tasks.find((item) => item.id === id);
    if (!taskToEdit) {
      return;
    }
    setEditTask(taskToEdit);
    setModalType("task");
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
  function openDetailTaskHandler(id: string) {
    setActiveTaskId(id);
    setModalType("detail");
  }
  function filterTasksByPriorityHandler(
    e: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setPriorityFilter(e.target.value as "" | "low" | "middle" | "high");
  }
  const filteredTasks = tasks.filter((task) => {
    if (priorityFilter === "") return true;
    return task.priority === priorityFilter;
  });
  function openTaskModalHandler(type: "task" | "detail") {
    setModalType(type);
  }
  function closeAddTaskModalHandler() {
    setEditTask(null);
    setModalType("null");
    setActiveTaskId(null);
  }

  return {
    tasks: filteredTasks,
    search,
    priorityFilter,
    isLoading,
    isError,
    editTask,
    modalType,
    activeTaskId,
    setSearch,
    setModalType,
    deleteTaskHandler,
    addTaskHandler,
    editTaskHandler,
    updateTasksHandler,
    openTaskModalHandler,
    closeAddTaskModalHandler,
    updateTaskStatusHandler,
    filterTasksByPriorityHandler,
    openDetailTaskHandler,
  };
}
