export interface NewTask {
  title: string;
  description: string;
  priority: "high" | "middle" | "low";
  id: string;
  status: "to do" | "in progress" | "done";
  creationDate: string;
}
export interface SelectType {
  id?: string;
  value?: string;
  options: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export type TaskStatus = "to do" | "in progress" | "done";
export type TaskPriority = "high" | "middle" | "low";
