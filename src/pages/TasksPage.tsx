import { TaskList } from "../features/tasks/components/TaskList.tsx";
import { TaskForm } from "../features/tasks/components/TaskForm.tsx";
import { Button } from "../components/Button.tsx";
import { createPortal } from "react-dom";
import { Modal } from "../components/Modal.tsx";
import { useTaskHandlers } from "../features/tasks/hooks/useTaskHandlers.tsx";
export function TasksPage() {
  const {
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
  } = useTaskHandlers();
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
