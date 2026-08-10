import styles from "./TaskItem.module.css";
import { HiPencil, HiTrash } from "react-icons/hi";
import { Button } from "../../../components/Button";
import { Select } from "../../../components/Select";

interface TaskItemProps {
  id: string;
  name: string;
  description: string;
  priority: "high" | "middle" | "low";
  status: "to do" | "in progress" | "done";
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
  onUpdateTaskStatus: (
    id: string,
    status: "to do" | "in progress" | "done",
  ) => void;
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
}: TaskItemProps) {
  const priorityClass = styles[`priority-${priority}`];

  function deleteItemHandler() {
    onDeleteTask(id);
  }
  function editItemHandler() {
    onEditTask(id);
  }
  function changeStatusHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as "to do" | "in progress" | "done";
    onUpdateTaskStatus(id, newStatus);
  }
  return (
    <li className={styles.taskItem} key={id} id={id}>
      <p className={styles.itemName}>{name}</p>
      <p className={`${styles.itemPriority} ${priorityClass}`}>{priority}</p>

      <p>{description}</p>

      <div className={styles.actions}>
        <Button
          title="Edit"
          children={<HiPencil />}
          onClick={editItemHandler}
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
    </li>
  );
}
