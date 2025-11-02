import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import {
  RegisterPayload,
  RegisterResponse,
  ResendVerificationPayload,
  // VerifyRegisterTokenResponse,
} from "@/features/interface";

export const AuthService = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const { data } = await apiClient.post(
      API_ENDPOINTS?.auth?.register,
      payload
    );
    return data;
  },

  async verifyEmail(token: string) {
    const url = API_ENDPOINTS.auth.verifyEmail(token);

    const { data } = await apiClient.get(url);

    return data;
  },

  async ResendEmailVerification(payload: ResendVerificationPayload) {
    const url = API_ENDPOINTS?.auth?.resendVerification;

    const { data } = await apiClient.post(url, payload);

    return data;
  },
};
