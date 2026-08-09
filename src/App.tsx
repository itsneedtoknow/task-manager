import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { route } from "./router";

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
      <RouterProvider router={route} />;
    </QueryClientProvider>
  );
}

export default App;
