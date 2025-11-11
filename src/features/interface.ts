import { ResponseAPI } from "@/shared/interface";
import { PageProps } from "../../.next/types/app/layout";

export interface AuthFormProps {
  type: "login" | "register";
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export type LoginPayload = Omit<RegisterPayload, "username">;

export interface ResendVerificationPayload {
  email: string;
}

export interface RegisterResponse extends ResponseAPI {
  status: string;
  message: string;
  data: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
  };
}

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  createdAt: string;
}

export interface LoginResponse extends Omit<RegisterPayload, "data"> {
  data: {
    user: User;
  };
}

export interface UseAuthSubmitProps {
  type: "login" | "register";
  formValues: {
    email: string;
    password: string;
    username?: string;
  };
  onValidate: () => boolean;
}

export interface VerifyPageProps extends Omit<PageProps, "searchParams"> {
  searchParams: Promise<{ register_token?: string }>;
}

export interface VerifyRegisterTokenResponse extends ResponseAPI {
  data: {
    message?: string;
    email?: string;
    success?: boolean;
    error?: string;
    status?: number;
  };
}

export interface VerifyRegisterTokenResponse {
  success: boolean;
  error: string;
}

export interface UseVerifyToastOptions {
  verifyData: VerifyRegisterTokenResponse | undefined;
  isClient: boolean;
}

export interface ToastConfig {
  message: string;
  duration?: number;
  description?: string;
  position?: string;
  shouldRedirect: boolean;
  enableClickDismiss: boolean;
}

export interface ResendVerificationProps {
  title: string;
  isSuccess: boolean;
}

export interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isAuthenticated: () => boolean;
}
