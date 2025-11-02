import { useCallback } from "react";
import { useForm } from "./useForm";

export function useFormInput<T extends Record<string, unknown>>(
  form: ReturnType<typeof useForm<T>>,
  name: keyof T
) {
  const { values, errors, touched, setFieldValue } = form;

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldValue(name, e.target.value as unknown as T[keyof T]);
    },
    [name, setFieldValue]
  );

  const value = values[name];
  const errorMessage = errors[name];
  const isTouched = touched[name];
  const error = Boolean(isTouched && errorMessage);

  return {
    name,
    value,
    onChange,
    errorMessage,
    error,
  };
}
