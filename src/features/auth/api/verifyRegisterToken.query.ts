import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/services/auth.service";
import { VerifyRegisterTokenResponse } from "@/features/interface";

export const useVerifyRegisterToken = (
  register_token: string
): UseQueryResult<VerifyRegisterTokenResponse> => {
  return useQuery({
    queryKey: ["verify", register_token],
    queryFn: () => AuthService?.verifyEmail(register_token),
    staleTime: Infinity,
    retry: false,
  });
};
