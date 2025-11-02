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

export interface ResendVerificationPayload {
  email: string;
}

export interface RegisterResponse extends ResponseAPI {
  data: {
    id: string;
    email: string;
    username: string;
    createdAt: string;
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
