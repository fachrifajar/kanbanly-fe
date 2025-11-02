import { useResendVerificationMutation } from "../api/resendVerification.mutation";
import { useRouter } from "next/navigation";

export const useResendVerificationSubmit = ({
  value,
  isSuccess,
}: {
  value: string;
  isSuccess: boolean;
}) => {
  const router = useRouter();
  const {
    mutate,
    isPending: isResendPending,
    data: resendResult,
  } = useResendVerificationMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSuccess) {
      router.push("/login");
    } else {
      mutate({ email: value });
    }
  };

  return { handleSubmit, isResendPending, resendResult };
};
