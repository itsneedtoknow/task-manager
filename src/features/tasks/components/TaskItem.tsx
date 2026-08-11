import styles from "./TaskItem.module.css";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi";
import { Button } from "../../../components/Button";
import { Select } from "../../../components/Select";
import type { TaskPriority, TaskStatus } from "../types";

interface TaskItemProps {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
  onUpdateTaskStatus: (id: string, status: TaskStatus) => void;
  onOpenBtnClick: (id: string) => void;
}

export function TaskItem({
  name,
  priority,
  description,
  id,
  status,
  onDeleteTask,
  onEditTask,
  onUpdateTaskStatus,
  onOpenBtnClick,
}: TaskItemProps) {
  const priorityClass = styles[`priority-${priority}`];

  function deleteItemHandler() {
    onDeleteTask(id);
  }
  function editItemHandler() {
    onEditTask(id);
  }
  function changeStatusHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as TaskStatus;
    onUpdateTaskStatus(id, newStatus);
  }
  function openTaskDetailHandler() {
    onOpenBtnClick(id);
  }
  return (
    <li className={styles.taskItem} key={id} id={id}>
      <div className={styles.taskItemLeft}>
        <p className={styles.itemName}>{name}</p>
        <p>{description}</p>
      </div>
      <div className={styles.taskItemRight}>
        <p className={`${styles.itemPriority} ${priorityClass}`}>{priority}</p>

        <div className={styles.actions}>
          <Button
            title="Edit"
            children={<HiPencil />}
            onClick={editItemHandler}
          />
          <Button
            title="Open"
            children={<HiEye />}
            onClick={openTaskDetailHandler}
          />
          <Button
            title="Delete"
            children={<HiTrash />}
            className={`${styles.btnDelete} `}
            onClick={deleteItemHandler}
          />
          <Select
            value={status}
            options={[
              { value: "to do", label: "to do" },
              { value: "in progress", label: "in progress" },
              { value: "done", label: "done" },
            ]}
            onChange={changeStatusHandler}
          />
        </div>
      </div>
    </li>
  );
}
