import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/services/auth.service";
import { LoginPayload } from "@/features/interface";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),
    onSuccess: (data) => {
      toast.success("Login successful!", {
        description: "You will be redirected shortly.",
        onAutoClose: () => {
          router.push("/workspace");
        },
      });

      setUser(data?.data?.user);
      // router.push("/workspace");
      return data;
    },
    onError: (error) => {
      console.log("error", error);
      if (error instanceof AxiosError) {
        toast.error("Login failed", {
          description: error?.response?.data?.message || "Please try again.",
        });
      }
    },
  });
};
