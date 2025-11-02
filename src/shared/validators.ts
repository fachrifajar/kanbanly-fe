import { ValidationRule } from "@/shared/hooks/useForm";

export type Validator<T = string> = (val: T | undefined) => string | null;

export const wrapValidator =
  <T extends Record<string, string | undefined>>(
    validator: Validator<string>
  ): ValidationRule<T> =>
  (value) =>
    validator(value ?? ""); // pakai fallback "" biar aman

export function composeValidators<T extends Record<string, unknown>>(
  ...validators: ValidationRule<T>[]
): ValidationRule<T> {
  return (value, values) => {
    for (const validator of validators) {
      const error = validator(value, values);
      if (error) return error;
    }
    return null;
  };
}
export const required = (msg?: string): Validator<string> => {
  return (val) => {
    if (typeof val !== "string" || val.trim() === "") {
      return msg || "This field is required";
    }
    return null;
  };
};

export const validateEmail = (msg?: string): Validator<string> => {
  return (val) => {
    if (!val) return msg || "Invalid email address";
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(val) ? null : msg || "Invalid email address";
  };
};

export const validateStrongPassword = (msg?: string): Validator<string> => {
  return (val) => {
    if (!val) return msg || "Password is required";
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])\S{8,}$/;
    return strongPasswordRegex.test(val)
      ? null
      : msg ||
          "Password must contain 8+ chars, uppercase, lowercase, number, symbol";
  };
};

export const validateUsername = (msg?: string): Validator<string> => {
  return (val) => {
    if (!val) return msg || "Username is required";

    if (val.length < 3 || val.length > 20) {
      return msg || "Username must be between 3 and 20 characters";
    }

    if (!/[a-z]/.test(val)) {
      return msg || "Username must contain at least one letter (a-z)";
    }

    const baseRegex = /^(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/;
    if (!baseRegex.test(val)) {
      return (
        msg ||
        "Username can only contain lowercase letters, numbers, dots, and underscores. Cannot start or end with dot/underscore or have consecutive special characters."
      );
    }

    const specialCharCount = (val.match(/[._]/g) || []).length;
    if (specialCharCount > 2) {
      return msg || "Username cannot contain more than 2 dots or underscores";
    }

    return null;
  };
};

export const isStringEqual = (str1: string, str2: string) => {
  return str1.toLowerCase() === str2.toLowerCase();
};
