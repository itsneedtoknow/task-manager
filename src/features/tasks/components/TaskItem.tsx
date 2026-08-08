import styles from "./TaskItem.module.css";
import { HiPencil, HiTrash } from "react-icons/hi";
import { Button } from "../../../components/Button";

interface TaskItemProps {
  id: string;
  name: string;
  description: string;
  priority: "high" | "middle" | "low";
}

export function TaskItem({ name, priority, description }: TaskItemProps) {
  const priorityClass = styles[`priority-${priority}`];

  return (
    <li className={styles.taskItem}>
      <p className={styles.itemName}>{name}</p>
      <p className={`${styles.itemPriority} ${priorityClass}`}>{priority}</p>

      <p>{description}</p>

      <div className={styles.actions}>
        <Button title="Edit" children={<HiPencil />} />
        <Button
          title="Delete"
          children={<HiTrash />}
          className={`${styles.btnDelete} `}
        />

        <select>
          <option>to do</option>
          <option>in progress</option>
          <option>done</option>
        </select>
      </div>
    </li>
  );
}
