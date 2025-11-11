import { useState, useEffect } from "react";
import { useForm } from "@/shared/hooks/useForm";
import { useFormInput } from "@/shared/hooks/useFormInput";
import {
  validateEmail,
  validateStrongPassword,
  validateUsername,
  required,
  composeValidators,
  wrapValidator,
} from "@/shared/validators";

export const useAuthForm = ({ type }: { type: string }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      username: type === "register" ? "" : undefined,
      confirmPassword: type === "register" ? "" : undefined,
    },
    validationRules: {
      email: composeValidators(required(), validateEmail()),
      password: composeValidators(required(), validateStrongPassword()),
      confirmPassword:
        type === "register"
          ? (value, values) => {
              // const composed = composeValidators(
              //   required(),
              //   validateStrongPassword()
              // );
              // const error = composed(value, values);

              // if (error) return error;

              // if (value !== values.password) {
              //   return "Passwords do not match";
              // }

              // return null;

              const requiredError = required()(value);
              if (requiredError) return requiredError;

              if (value !== values.password) {
                return "Passwords do not match";
              }

              return null;
            }
          : undefined,
      username:
        type === "register"
          ? composeValidators(required(), validateUsername())
          : undefined,
    },
  });

  const email = useFormInput(form, "email");
  const password = useFormInput(form, "password");
  const confirmPassword = useFormInput(form, "confirmPassword");
  const username = useFormInput(form, "username");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    form.setFieldValue("password", newValue);

    const passwordError = composeValidators(
      wrapValidator(required()),
      wrapValidator(validateStrongPassword())
    )(newValue, form.values);

    if (type === "register" && passwordError && form.values.confirmPassword) {
      if (newValue === form.values.confirmPassword) {
        form.handleError("confirmPassword", "");
      } else {
        form.handleError("confirmPassword", "Passwords do not match");
      }
    }
  };

  const updatePasswordInput = {
    ...password,
    onChange: type === "register" ? handlePasswordChange : password.onChange,
  };

  useEffect(() => {
    if (type === "login") {
      if (email.error || password.error || !email.value || !password.value) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    } else {
      if (
        email.error ||
        password.error ||
        username.error ||
        confirmPassword.error ||
        !email.value ||
        !password.value ||
        !username.value ||
        !confirmPassword.value
      ) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [type, email, password, confirmPassword, username]);

  return {
    form,
    email,
    password: updatePasswordInput,
    confirmPassword,
    username,
    isDisabled,
  };
};
