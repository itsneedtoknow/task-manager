import { TaskItem } from "./TaskItem.tsx";
import styles from "./TaskList.module.css";

interface TaskData {
  id: string;
  title: string;
  description: string;
  priority: "high" | "middle" | "low";
  status: "to do" | "in progress" | "done";
}
interface TaskListProps {
  data: TaskData[];
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
  onUpdateTaskStatus: (
    id: string,
    newStatus: "to do" | "in progress" | "done",
  ) => void;
}
export function TaskList({
  data,
  onDeleteTask,
  onEditTask,
  onUpdateTaskStatus,
}: TaskListProps) {
  return (
    <ul className={styles.taskList}>
      {data.map((item) => (
        <TaskItem
          key={item.id}
          id={item.id}
          name={item.title}
          description={item.description}
          status={item.status}
          priority={item.priority}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onUpdateTaskStatus={onUpdateTaskStatus}
        />
      ))}
    </ul>
  );
}
