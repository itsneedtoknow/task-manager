import { useState } from "react";
import { TaskList } from "../features/tasks/components/TaskList.tsx";
import { TaskForm } from "../features/tasks/components/TaskForm.tsx";
import { Button } from "../components/Button.tsx";
import { createPortal } from "react-dom";
import { Modal } from "../components/Modal.tsx";
import type { NewTask } from "../features/tasks/types.tsx";
import {
  useAddTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "../features/tasks/useTaskQueries.tsx";
export function TasksPage() {
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
  if (isLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>The list is loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Error loading tasks!</h2>
        <p>Please check if your json-server is running on port 3001.</p>
      </div>
    );
  }
  return (
    <main>
      <h1> Task-manager</h1>
      <Button children={"Add a task"} onClick={openTaskModalHandler} />
      {isTaskModalOpen &&
        createPortal(
          <Modal
            closeAddTaskModalHandler={closeAddTaskModalHandler}
            children={
              <TaskForm
                onAddTask={addTaskHandler}
                editTask={editTask}
                onUpdateTask={updateTasksHandler}
              />
            }
          />,
          document.body,
        )}

      <section>
        <div className="container-wrapper">
          <form>
            <input type="text" />
          </form>
        </div>
      </section>
      <section className="tasks">
        <div className="container-wrapper">
          <ul className="task-list">
            <TaskList
              data={tasks}
              onDeleteTask={deleteTaskHandler}
              onEditTask={editTaskHandler}
            />
          </ul>
        </div>
      </section>
    </main>
  );
}
