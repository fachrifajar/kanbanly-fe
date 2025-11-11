import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/services/auth.service";
import { toast } from "sonner";
import { handleAxiosError } from "@/shared/utils";
import { ResendVerificationPayload } from "@/features/interface";

export const useResendVerificationMutation = () => {
  return useMutation({
    mutationFn: (payload: ResendVerificationPayload) =>
      AuthService?.resendEmailVerification(payload),
    onSuccess: (data) => {
      toast.success("Verification email sent!", {
        description:
          "Check your inbox. If you don't see it, check your spam folder.",
      });
      return data;
    },
    onError: (error) => {
      handleAxiosError(
        error,
        "Failed to resend verification email. Please try again later."
      );
    },
  });
};
