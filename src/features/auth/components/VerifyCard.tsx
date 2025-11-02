"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/shared/components";
import { VerifyCardSkeleton } from "./VerifyCardSkeleton";
import { ResendVerification } from "./ResendVerification";
import { useVerifyRegisterToken } from "../api/verifyRegisterToken.query";
import { useVerifyToast } from "@/features/auth/hooks/useVerifyToast";
import { useClientOnly } from "@/shared/hooks/useClientOnly";
import { VERIFY_TEXT } from "../constants";
import { Icon } from "@/shared/components/ui/icons";
import { cn } from "@/shared/utils";

interface VerifyCardProps {
  token: string;
}

export const VerifyCard = ({ token }: VerifyCardProps) => {
  const isClient = useClientOnly();
  const isLoading = !isClient;

  const { data: verifyData } = useVerifyRegisterToken(token);
  const { isTokenInvalid, isTokenExpired } = useVerifyToast({
    verifyData,
    isClient,
  });
  console.log("verifyData=>>>", verifyData);
  const getTitle = () => {
    if (verifyData?.success) return VERIFY_TEXT?.TITLE_SUCCESS;
    if (isTokenInvalid) return VERIFY_TEXT?.TITLE_INVALID;
    if (isTokenExpired) return VERIFY_TEXT?.TITLE_EXPIRED;
  };

  const getDescription = () => {
    if (verifyData?.success) return VERIFY_TEXT?.DESCRIPTION_SUCCESS;
    if (isTokenInvalid) return VERIFY_TEXT?.DESCRIPTION_INVALID;
    if (isTokenExpired) return VERIFY_TEXT?.DESCRIPTION_EXPIRED;
  };

  const getButtonTitle = () => {
    if (isTokenExpired) return VERIFY_TEXT?.BUTTON_INVALID;
    return VERIFY_TEXT?.BUTTON_SUCCESS;
  };

  if (isLoading) return <VerifyCardSkeleton />;
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center flex-col justify-center">
          <Icon
            name={verifyData?.success ? "success" : "error"}
            className="mb-2 shrink-0"
          />

          <CardTitle
            className={cn(
              "text-xl text-center break-words max-w-full",
              verifyData?.success ? "text-success" : "text-destructive"
            )}
          >
            {getTitle()}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <CardDescription className="text-center break-words hyphens-auto">
            {getDescription()}
          </CardDescription>

          {(isTokenExpired || verifyData?.success) && (
            <ResendVerification
              title={getButtonTitle()}
              isSuccess={!!verifyData?.success}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
