export interface NewTask {
  title: string;
  description: string;
  priority: "high" | "middle" | "low";
  id: string;
}
