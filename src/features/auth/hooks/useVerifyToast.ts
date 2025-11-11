import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useToastClickAway } from "@/shared/hooks/useToastClickAway";
import { TOAST_CONFIG, TOKEN_ERROR_TYPES } from "../constants";
import { UseVerifyToastOptions, ToastConfig } from "@/features/interface";

export function useVerifyToast({
  verifyData,
  isClient,
}: UseVerifyToastOptions) {
  const router = useRouter();
  const [toastId, setToastId] = useState<string | number | null>(null);

  const { isTokenInvalid, isTokenExpired } = useMemo(
    () => ({
      isTokenInvalid: TOKEN_ERROR_TYPES.isInvalid(verifyData?.error),
      isTokenExpired: TOKEN_ERROR_TYPES.isExpired(verifyData?.error),
    }),
    [verifyData?.error]
  );

  const getToastConfig = useCallback(
    (
      verifyData: NonNullable<UseVerifyToastOptions["verifyData"]>
    ): ToastConfig => {
      if (parseInt(verifyData?.status) === 500) {
        return {
          ...TOAST_CONFIG.SERVER_ERROR,
          shouldRedirect: false,
          enableClickDismiss: false,
        };
      }

      if (isTokenInvalid) {
        return {
          ...TOAST_CONFIG.TOKEN_INVALID,
          shouldRedirect: true,
          enableClickDismiss: true,
        };
      }

      if (isTokenExpired) {
        return {
          message: verifyData.error,
          ...TOAST_CONFIG.TOKEN_EXPIRED,
          shouldRedirect: false,
          enableClickDismiss: false,
        };
      }

      return {
        message: verifyData.error || TOAST_CONFIG.DEFAULT.message,
        duration: TOAST_CONFIG.DEFAULT.duration,
        shouldRedirect: false,
        enableClickDismiss: false,
      };
    },
    [isTokenInvalid, isTokenExpired]
  );

  useEffect(() => {
    if (!isClient || !verifyData || verifyData.success) return;

    const config = getToastConfig(verifyData);

    const id = toast.error(config.message, {
      duration: config.duration,
      description: config.description,
    });

    setToastId(id);

    return () => {
      toast.dismiss(id);
      setToastId(null);
    };
  }, [verifyData, isClient, getToastConfig]);

  useToastClickAway(toastId, {
    enabled: isTokenInvalid,
    delay: 300,
    onDismiss: () => {
      router.push("/");
      setToastId(null);
    },
  });

  return {
    isTokenInvalid,
    isTokenExpired,
    isLoading: !verifyData && !isClient,
  };
}
