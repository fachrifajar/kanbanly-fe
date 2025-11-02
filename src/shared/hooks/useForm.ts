import { useCallback, useState } from "react";

export type ValidationRule<T extends Record<string, unknown>> = (
  value: T[keyof T],
  values: T
) => string | null;

export type ValidationRules<T extends Record<string, unknown>> = Partial<
  Record<keyof T, ValidationRule<T>>
>;

interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validationRules = {},
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      const rule = validationRules[name];
      if (!rule) return null;
      return rule(value, values);
    },
    [validationRules, values]
  );

  const setFieldValue = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error ?? undefined }));
    },
    [validateField]
  );

  const validateAll = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const key in validationRules) {
      const rule = validationRules[key];
      const value = values[key];
      const error = rule?.(value, values);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const handleError = useCallback((name: keyof T, value: string | null) => {
    setErrors((prev) => ({ ...prev, [name]: value ?? undefined }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  return {
    values,
    setFieldValue,
    errors,
    touched,
    validateAll,
    resetForm,
    handleError,
  };
}
