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
