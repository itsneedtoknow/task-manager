import styles from "./TaskItem.module.css";
import { HiPencil, HiTrash } from "react-icons/hi";
import { Button } from "../../../components/Button";

interface TaskItemProps {
  id: string;
  name: string;
  description: string;
  priority: "high" | "middle" | "low";
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
}

export function TaskItem({
  name,
  priority,
  description,
  id,
  onDeleteTask,
  onEditTask,
}: TaskItemProps) {
  const priorityClass = styles[`priority-${priority}`];

  function deleteItemHandler() {
    onDeleteTask(id);
  }
  function editItemHandler() {
    onEditTask(id);
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

        <select>
          <option>to do</option>
          <option>in progress</option>
          <option>done</option>
        </select>
      </div>
    </li>
  );
}
