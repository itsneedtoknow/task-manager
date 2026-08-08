import { createBrowserRouter, Navigate } from "react-router-dom";
import { TasksPage } from "./pages/TasksPage";
import { TaskDetailPage } from "./pages/TaskDetailPage";
export const route = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/tasks" replace />,
  },
  { path: "/tasks", element: <TasksPage /> },
  { path: "/tasks/:id", element: <TaskDetailPage /> },
]);
