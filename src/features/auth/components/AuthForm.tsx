"use client";

import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components";
import { cn } from "@/shared/utils";
import { AuthFormProps } from "@/features/interface";
import { useAuthForm } from "@/features/auth/hooks/useAuthForm";
import { useAuthSubmit } from "@/features/auth/hooks/useAuthSubmit";
import { AUTH_TEXT } from "@/features/auth/constants";

export const AuthForm = ({ type }: AuthFormProps) => {
  const { form, email, password, confirmPassword, username, isDisabled } =
    useAuthForm({
      type,
    });
  const { handleSubmit, isPending } = useAuthSubmit({
    type,
    formValues: form.values,
    onValidate: form.validateAll,
  });

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="flex items-center flex-col justify-center">
          <CardTitle className="text-2xl font-bold">
            {type === "login"
              ? AUTH_TEXT.LOGIN_TITLE
              : AUTH_TEXT.REGISTER_TITLE}
          </CardTitle>
          <CardDescription>
            {type === "login"
              ? AUTH_TEXT.LOGIN_DESCRIPTION
              : AUTH_TEXT.REGISTER_DESCRIPTION}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              label="Email"
              {...email}
            />

            {type === "register" && (
              <Input
                id="username"
                type="text"
                required
                label="Username"
                {...username}
              />
            )}

            <Input
              id="password"
              type="password"
              required
              label="Password"
              {...password}
            />

            {type === "register" && (
              <Input
                id="confirm-password"
                type="password"
                required
                label="Confirm Password"
                {...confirmPassword}
              />
            )}

            <Button
              className="w-full mt-2"
              disabled={isDisabled}
              isLoading={isPending}
              type="submit"
            >
              {type === "login" ? "Login" : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
