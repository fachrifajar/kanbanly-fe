import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/services/auth.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: (data) => {
      clearUser();

      router.push("/");
      return data;
    },
    onError: (error) => {
      console.log("error", error);
      if (error instanceof AxiosError) {
        toast.error("Logout failed", {
          description: error?.response?.data?.message || "Please try again.",
        });
      }
    },
  });
};
