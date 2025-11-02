export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    refreshToken: "/auth/refresh",
    logout: "/auth/logout",
    resendVerification: "/auth/resend-verification",
    verifyEmail: (token: string) => `/auth/verify-email?token=${token}`,
  },
} as const;
