import { useState } from "react";
import { TaskList } from "../features/tasks/components/TaskList.tsx";
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
  function deleteTaskHandler(id: string) {
    setTasks(tasks.filter((item) => item.id !== id));
  }
  return (
    <main>
      <h1> Task-manager</h1>
      <section className="add-form">
        <form>
          <label htmlFor="task-name">
            Task name
            <input type="text" name="" id="task-name" />
          </label>
          <label htmlFor="task-priority">
            Priority
            <select id="task-priority">
              <option value="">High</option>
              <option value="">Mid</option>
              <option value="">Low</option>
            </select>
          </label>
          <label htmlFor="task-description">
            Description
            <textarea id="task-description"></textarea>
          </label>
          <button type="submit">Create</button>
        </form>
      </section>
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
            <TaskList data={tasks} onDeleteTask={deleteTaskHandler} />
          </ul>
        </div>
      </section>
    </main>
  );
}
