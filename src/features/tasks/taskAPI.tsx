import type { NewTask } from "./types";
const URL = "http://localhost:3000/tasks";

export async function fetchTasks(
  searchQuery?: string,
  statusQuery?: string,
): Promise<NewTask[]> {
  let url;
  if (searchQuery) {
    url = `http://localhost:3000/tasks?title:contains=${encodeURIComponent(searchQuery)}`;
  } else if (statusQuery) {
    url = `http://localhost:3000/tasks?status:contains=${encodeURIComponent(statusQuery)}`;
  } else {
    url = "http://localhost:3000/tasks";
  }

  const taskData = await fetch(url);
  const tasks = await taskData.json();
  return tasks;
}
export async function fetchDetailedTask(id: string) {
  const taskItemData = await fetch(`http://localhost:3000/tasks/${id}`);
  const taskItem = await taskItemData.json();
  return taskItem;
}
export async function addTask(newTask: NewTask): Promise<NewTask> {
  const taskData = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  return taskData.json();
}
export async function deleteTask(id: string): Promise<NewTask> {
  const taskData = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  return taskData.json();
}
export async function updateTask(task: NewTask): Promise<NewTask> {
  const taskData = await fetch(`${URL}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return taskData.json();
}
