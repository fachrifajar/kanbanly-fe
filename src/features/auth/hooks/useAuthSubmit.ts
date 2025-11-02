import { useRegisterMutation } from "@/features/auth/api/register.mutation";
// import { useLogin } from "./useLogin";
import { UseAuthSubmitProps } from "@/features/interface";

export const useAuthSubmit = ({
  type,
  formValues,
  onValidate,
}: UseAuthSubmitProps) => {
  const {
    mutate: register,
    isPending: isRegisterPending,
    data,
  } = useRegisterMutation();
  // const { mutate: login, isPending: isLoginPending } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    if (!onValidate()) return;

    // Submit based on type
    if (type === "register") {
      register({
        email: formValues.email,
        password: formValues.password,
        username: formValues.username!,
      });
    } else {
      // login({
      //   email: formValues.email,
      //   password: formValues.password,
      // });
    }
  };

  return {
    handleSubmit,
    isPending: isRegisterPending,
    data,
    // isPending: type === "register" ? isRegisterPending : isLoginPending,
  };
};
