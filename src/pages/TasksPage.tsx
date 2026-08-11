import { TaskList } from "../features/tasks/components/TaskList.tsx";
import { TaskForm } from "../features/tasks/components/TaskForm.tsx";
import { Button } from "../components/Button.tsx";
import { createPortal } from "react-dom";
import { Modal } from "../components/Modal.tsx";
import { useTaskPageHandlers } from "../features/tasks/hooks/useTaskPageHandlers.tsx";
import { TaskSearch } from "../features/tasks/components/TaskSearch.tsx";
import { Select } from "../components/Select.tsx";
import { TaskDetailPage } from "./TaskDetailPage.tsx";
import {
  HiCheckCircle,
  HiClipboardList,
  HiClock,
  HiPlay,
} from "react-icons/hi";

import styles from "./TasksPage.module.css";

export function TasksPage() {
  const {
    tasks,
    search,
    setSearch,
    isLoading,
    isError,
    editTask,
    priorityFilter,
    modalType,
    activeTaskId,
    deleteTaskHandler,
    addTaskHandler,
    editTaskHandler,
    updateTasksHandler,
    openTaskModalHandler,
    closeAddTaskModalHandler,
    updateTaskStatusHandler,
    filterTasksByPriorityHandler,
    openDetailTaskHandler,
  } = useTaskPageHandlers();

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <h2>The list is loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${styles.centered} ${styles.errorText}`}>
        <h2>Error loading tasks!</h2>
        <p>Please check if your json-server is running on port 3001.</p>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((t) => t.status === "to do").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in progress",
  ).length;
  const doneTasks = tasks.filter((t) => t.status === "done").length;

  return (
    <div className={styles.pageLayout}>
      <header className={styles.header}>
        <div className={styles.containerWrapper}>
          <div className={styles.headerTitleGroup}>
            <h1>Tasks</h1>
            <p className={styles.headerSubtitle}>
              Manage your tasks and stay productive
            </p>
          </div>
          <Button
            className={styles.btnAdd}
            children={"+ Add Task"}
            onClick={() => openTaskModalHandler("task")}
          />
          {modalType === "task" &&
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

      <main className={styles.containerWrapper}>
        <section className={styles.searchPanel}>
          <TaskSearch search={search} setSearch={setSearch} />
          <div className={styles.filterGroup}>
            <Select
              value={priorityFilter}
              onChange={filterTasksByPriorityHandler}
              options={[
                { value: "", label: "All Priorities" },
                { value: "low", label: "Low" },
                { value: "middle", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </div>
        </section>

        <section className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.cardAll}`}>
            <div className={styles.statIcon}>
              <HiClipboardList />
            </div>
            <div>
              <div className={styles.statLabel}>All Tasks</div>
              <div className={styles.statNumber}>{totalTasks}</div>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.cardTodo}`}>
            <div className={styles.statIcon}>
              <HiClock />
            </div>
            <div>
              <div className={styles.statLabel}>To Do</div>
              <div className={styles.statNumber}>{todoTasks}</div>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.cardProgress}`}>
            <div className={styles.statIcon}>
              <HiPlay />
            </div>
            <div>
              <div className={styles.statLabel}>In Progress</div>
              <div className={styles.statNumber}>{inProgressTasks}</div>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.cardDone}`}>
            <div className={styles.statIcon}>
              <HiCheckCircle />
            </div>
            <div>
              <div className={styles.statLabel}>Done</div>
              <div className={styles.statNumber}>{doneTasks}</div>
            </div>
          </div>
        </section>

        <section className={styles.tasksSection}>
          <div className={styles.tableHeader}>
            <div className={styles.colCheckbox}></div>
            <div className={styles.colTask}>Task</div>
            <div className={styles.colStatus}>Status</div>
            <div className={styles.colPriority}>Priority</div>
            <div className={styles.colCreated}>Created</div>
            <div className={styles.colActions}></div>
          </div>

          <TaskList
            data={tasks}
            onDeleteTask={deleteTaskHandler}
            onEditTask={editTaskHandler}
            onUpdateTaskStatus={updateTaskStatusHandler}
            onOpenBtnClick={openDetailTaskHandler}
          />

          {modalType === "detail" &&
            activeTaskId &&
            createPortal(
              <Modal
                closeAddTaskModalHandler={closeAddTaskModalHandler}
                children={
                  <TaskDetailPage
                    id={activeTaskId}
                    onEditTask={editTaskHandler}
                    onUpdateTaskStatus={updateTaskStatusHandler}
                    onDeleteTask={deleteTaskHandler}
                    onClose={closeAddTaskModalHandler}
                  />
                }
              />,
              document.body,
            )}
        </section>
      </main>
    </div>
  );
}
