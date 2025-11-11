import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ResponseAPIError } from "./interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleAxiosError(error: unknown, fallbackMessage: string) {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ResponseAPIError;
    toast.error(apiError?.message || fallbackMessage);
  } else {
    toast.error(fallbackMessage);
  }
}

export const PUBLIC_ROUTES = new Set([
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/verify",
]);

export function isAuthRoute(pathname: string) {
  return PUBLIC_ROUTES.has(pathname);
}
