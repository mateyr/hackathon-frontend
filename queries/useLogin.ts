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
      // data debe contener first_name y last_name
      LogIn({
        ...data,
        first_name: data.first_name,
        last_name: data.last_name
      });
      queryClient.invalidateQueries({ queryKey: ["LogInApi"] });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};
