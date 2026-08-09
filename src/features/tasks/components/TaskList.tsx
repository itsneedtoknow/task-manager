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
  onDeleteTask: (id: string) => void;
  onEditTask: () => void;
}
export function TaskList({ data, onDeleteTask, onEditTask }: TaskListProps) {
  return (
    <ul className={styles.taskList}>
      {data.map((item) => (
        <TaskItem
          key={item.id}
          id={item.id}
          name={item.title}
          description={item.description}
          priority={item.priority}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}
