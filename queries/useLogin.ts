import { LogInApi } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { LogIn } = useAuthStore();

  return useMutation({
    mutationFn: LogInApi,
    onSuccess: ({ data }) => {
      // Invalidate and refetch
      LogIn(data);
      queryClient.invalidateQueries({ queryKey: ["LogInApi"] });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};
