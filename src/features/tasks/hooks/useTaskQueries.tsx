import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask, deleteTask, fetchTasks, updateTask } from "../taskAPI";

export function useTasks(searchQuery: string) {
  return useQuery({
    queryKey: ["tasks", searchQuery],

    queryFn: () => fetchTasks(searchQuery),
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
