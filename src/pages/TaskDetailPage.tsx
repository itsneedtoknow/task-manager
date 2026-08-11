import { HiPencil, HiTrash } from "react-icons/hi";
import { Button } from "../components/Button";
import { Select } from "../components/Select";

import { useDetailTask } from "../features/tasks/hooks/useTaskQueries";
import styles from "./TaskDetailPage.module.css";
import type { TaskStatus } from "../features/tasks/types";

interface TaskDetailPageProps {
  id: string;
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTaskStatus: (id: string, status: TaskStatus) => void;
  onClose: () => void;
}

export function TaskDetailPage({
  id,
  onEditTask,
  onDeleteTask,
  onUpdateTaskStatus,
  onClose,
}: TaskDetailPageProps) {
  const { data: task, isLoading, isError } = useDetailTask(id);

  if (isLoading) {
    return <div className={styles.loading}>Loading task details...</div>;
  }

  if (isError || !task) {
    return <div className={styles.error}>Error loading task details!</div>;
  }

  const priorityClass = styles[`priority-${task.priority}`];
  function changeStatusHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as TaskStatus;
    onUpdateTaskStatus(id, newStatus);
  }
  function deleteItemHandler() {
    onDeleteTask(id);
    onClose();
  }

  function editItemHandler() {
    onClose();
    onEditTask(id);
  }
  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2 className={styles.title}>{task.title}</h2>
      </div>

      <div className={styles.metaGrid}>
        <div className={styles.metaLabel}>Created</div>
        <div className={styles.metaValue}>
          {task.creationDate || "May 12, 2024 at 09:30"}
        </div>

        <div className={styles.metaLabel}>Priority</div>
        <div className={styles.metaValue}>
          <span className={`${styles.textPriority} ${priorityClass}`}>
            {task.priority}
          </span>
        </div>

        <div className={styles.metaLabel}>Status</div>
        <div className={styles.metaValue}>
          <Select
            value={task.status}
            options={[
              { value: "to do", label: "to do" },
              { value: "in progress", label: "in progress" },
              { value: "done", label: "done" },
            ]}
            onChange={changeStatusHandler}
          />
        </div>
      </div>

      <section className={styles.descriptionSection}>
        <h3>Description</h3>
        <div className={styles.descriptionText}>
          <p>{task.description}</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <Button
          title="Delete"
          children={<HiTrash />}
          className={`${styles.btnDelete} `}
          onClick={deleteItemHandler}
        />
        <div className={styles.footerRight}>
          <Button
            title="Edit"
            children={<HiPencil />}
            onClick={editItemHandler}
          />
        </div>
      </footer>
    </div>
  );
}
