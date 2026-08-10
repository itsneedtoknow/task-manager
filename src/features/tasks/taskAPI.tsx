import type { NewTask } from "./types";
const URL = "http://localhost:3000/tasks";
export async function fetchTasks(searchQuery: string): Promise<NewTask[]> {
  const url = searchQuery
    ? `http://localhost:3000/tasks?title:contains=${encodeURIComponent(searchQuery)}`
    : "http://localhost:3000/tasks";
  console.log(url);
  const taskData = await fetch(url);
  const tasks = await taskData.json();
  return tasks;
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
