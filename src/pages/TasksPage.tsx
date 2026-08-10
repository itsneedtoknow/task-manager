import { TaskList } from "../features/tasks/components/TaskList.tsx";
import { TaskForm } from "../features/tasks/components/TaskForm.tsx";
import { Button } from "../components/Button.tsx";
import { createPortal } from "react-dom";
import { Modal } from "../components/Modal.tsx";
import { useTaskPageHandlers } from "../features/tasks/hooks/useTaskPageHandlers.tsx";
import { TaskSearch } from "../features/tasks/components/TaskSearch.tsx";
import { Select } from "../components/Select.tsx";
export function TasksPage() {
  const {
    tasks,
    search,
    setSearch,
    isLoading,
    isError,
    isTaskModalOpen,
    editTask,
    priorityFilter,
    deleteTaskHandler,
    addTaskHandler,
    editTaskHandler,
    updateTasksHandler,
    openTaskModalHandler,
    closeAddTaskModalHandler,
    updateTaskStatusHandler,
    filterTasksByPriorityHandler,
  } = useTaskPageHandlers();
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
    <>
      <header>
        <div className="container-wrapper">
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
        </div>
      </header>
      <main>
        <section className="search-panel">
          <div className="container-wrapper">
            <TaskSearch search={search} setSearch={setSearch} />

            <Select
              value={priorityFilter}
              onChange={filterTasksByPriorityHandler}
              options={[
                { value: "", label: "All priorities" },
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </div>
        </section>
        <section className="tasks">
          <div className="container-wrapper">
            <ul className="task-list">
              <TaskList
                data={tasks}
                onDeleteTask={deleteTaskHandler}
                onEditTask={editTaskHandler}
                onUpdateTaskStatus={updateTaskStatusHandler}
              />
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
