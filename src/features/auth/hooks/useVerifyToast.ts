import { useEffect, useRef, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TOAST_CONFIG, TOKEN_ERROR_TYPES } from "../constants";
import { UseVerifyToastOptions, ToastConfig } from "@/features/interface";

export function useVerifyToast({
  verifyData,
  isClient,
}: UseVerifyToastOptions) {
  const router = useRouter();
  const toastIdRef = useRef<string | number | null>(null);

  const { isTokenInvalid, isTokenExpired } = useMemo(
    () => ({
      isTokenInvalid: TOKEN_ERROR_TYPES.isInvalid(verifyData?.error),
      isTokenExpired: TOKEN_ERROR_TYPES.isExpired(verifyData?.error),
    }),
    [verifyData?.error]
  );

  // Memoized dismiss handler
  const handleDismiss = useCallback(
    (shouldRedirect: boolean) => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;

        if (shouldRedirect) {
          router.push("/");
        }
      }
    },
    [router]
  );

  // Get toast configuration based on error type
  const getToastConfig = useCallback(
    (
      verifyData: NonNullable<UseVerifyToastOptions["verifyData"]>
    ): ToastConfig => {
      // Server error (500)
      if (parseInt(verifyData?.status) === 500) {
        return {
          ...TOAST_CONFIG.SERVER_ERROR,
          shouldRedirect: false,
          enableClickDismiss: false,
        };
      }

      // const isTokenInvalid = TOKEN_ERROR_TYPES.isInvalid(verifyData.error);
      // const isTokenExpired = TOKEN_ERROR_TYPES.isExpired(verifyData.error);

      // Invalid token
      if (isTokenInvalid) {
        return {
          ...TOAST_CONFIG.TOKEN_INVALID,
          shouldRedirect: true,
          enableClickDismiss: true,
        };
      }

      // Expired token
      if (isTokenExpired) {
        return {
          message: verifyData.error,
          ...TOAST_CONFIG.TOKEN_EXPIRED,
          shouldRedirect: false,
          enableClickDismiss: false,
        };
      }

      // Default error
      return {
        message: verifyData.error || TOAST_CONFIG.DEFAULT.message,
        duration: TOAST_CONFIG.DEFAULT.duration,
        shouldRedirect: false,
        enableClickDismiss: false,
      };
    },
    []
  );

  useEffect(() => {
    // Early returns
    if (!isClient || !verifyData || verifyData.success) return;

    const config = getToastConfig(verifyData);

    // Show toast
    const id = toast.error(config.message, {
      duration: config?.duration,
      description: config?.description,
    });

    toastIdRef.current = id;

    // Setup click dismiss if enabled
    if (!config.enableClickDismiss) return;

    const clickHandler = () => handleDismiss(config.shouldRedirect);

    const timer = setTimeout(() => {
      document.addEventListener("click", clickHandler, { once: true });
    }, 300);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", clickHandler);
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    };
  }, [verifyData, isClient, getToastConfig, handleDismiss]);

  return {
    isTokenInvalid,
    isTokenExpired,
    isLoading: !verifyData && !isClient,
  };
}
