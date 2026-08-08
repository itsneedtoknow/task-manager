import { TaskItem } from "./TaskItem.tsx";
import styles from "./TaskList.module.css";

interface TaskData {
  id: string;
  title: string;
  description: string;
  priority: "high" | "middle" | "low";
}
interface TaskListProps {
  data: TaskData[];
}
export function TaskList({ data }: TaskListProps) {
  return (
    <ul className={styles.taskList}>
      {data.map((item) => (
        <TaskItem
          id={item.id}
          name={item.title}
          description={item.description}
          priority={item.priority}
        />
      ))}
    </ul>
  );
}
