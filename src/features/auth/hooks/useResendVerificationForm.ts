import { useEffect, useState } from "react";
import { useForm } from "@/shared/hooks/useForm";
import { useFormInput } from "@/shared/hooks/useFormInput";
import { composeValidators, validateEmail } from "@/shared/validators";

export const useResendVerificationForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validationRules: {
      email: composeValidators(validateEmail()),
    },
  });

  const email = useFormInput(form, "email");

  useEffect(() => {
    if (email?.error || !email?.value) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email]);

  return {
    isDisabled,
    email,
  };
};
