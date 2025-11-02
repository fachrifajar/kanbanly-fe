import { Button, Input } from "@/shared/components";
import { ResendVerificationProps } from "@/features/interface";
import { Send, ChevronRight } from "lucide-react";
import { useResendVerificationForm } from "../hooks/useResendVerificationForm";
import { useResendVerificationSubmit } from "../hooks/useResendVerificationSubmit";

export const ResendVerification = ({
  title,
  isSuccess,
}: ResendVerificationProps) => {
  const { isDisabled, email } = useResendVerificationForm();

  const { handleSubmit, isResendPending, resendResult } =
    useResendVerificationSubmit({ value: email.value, isSuccess });

  return (
    <>
      <form className="mt-10" onSubmit={handleSubmit}>
        {!isSuccess && (
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
            {...email}
          />
        )}

        <Button
          className="w-full mt-6"
          disabled={!isSuccess ? isDisabled || isResendPending : false}
          isLoading={isResendPending}
          type="submit"
        >
          {!isSuccess && <Send className="mr-2 h-4 w-4 shrink-0" />}

          <span className="truncate">{title}</span>

          {isSuccess && <ChevronRight className="mr-2 h-4 w-4 shrink-0" />}
        </Button>
      </form>
    </>
  );
};
