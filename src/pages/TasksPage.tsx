import { useState } from "react";
import { TaskList } from "../features/tasks/components/TaskList.tsx";
import { TaskForm } from "../features/tasks/components/TaskForm.tsx";
import { Button } from "../components/Button.tsx";
import { createPortal } from "react-dom";
import { Modal } from "../components/Modal.tsx";
import type { NewTask } from "../features/tasks/types.tsx";
export function TasksPage() {
  const dummyTasks = [
    {
      id: "1",
      title: "Изучить CSS-модули в React",
      description:
        "Разобраться с изоляцией стилей, глобальными классами и динамическим изменением стилей через пропсы.",
      priority: "high" as const,
    },
    {
      id: "2",
      title: "Сходить за продуктами",
      description:
        "Купить молоко, хлеб, свежие овощи для салата и куриную грудку для ужина.",
      priority: "low" as const,
    },
    {
      id: "3",
      title: "Настроить json-server",
      description:
        "Создать файл db.json в корне проекта и прописать скрипты для запуска mock-сервера.",
      priority: "middle" as const,
    },
  ];
  const [tasks, setTasks] = useState(dummyTasks);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<NewTask | null>(null);

  function deleteTaskHandler(id: string) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  function addTaskHandler(newTask: NewTask) {
    setTasks([...tasks, newTask]);
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
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
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
