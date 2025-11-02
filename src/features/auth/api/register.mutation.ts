import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/services/auth.service";
import { RegisterPayload } from "@/features/interface";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => AuthService.register(payload),
    onSuccess: (data) => {
      toast.success("Registration successful!", {
        description: "Please check your email to verify your account.",
      });

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Registration failed", {
          description: error?.response?.data?.message || "Please try again.",
        });
      }
    },
  });
};
