import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TasksPage } from "./pages/TasksPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksPage />
    </QueryClientProvider>
  );
}

export default App;
