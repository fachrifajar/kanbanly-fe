import axios, { AxiosError } from "axios";
// import { getToken } from "@/features/auth/utils";
import { API_ENDPOINTS } from "./endpoints";

// const AUTH_EXCEPT_ROUTES = Object?.values(API_ENDPOINTS?.auth)?.filter(
//   (v) => typeof v === "string"
// ) as string[];
const AUTH_EXCEPT_ROUTES = Object?.values(API_ENDPOINTS?.auth)?.map((v) =>
  typeof v === "string" ? v : v("")
) as string[];

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// const AUTH_PUBLIC_ROUTES = [
//   "/auth/login",
//   "/auth/register",
//   "/auth/verify-email",
//   "/auth/forgot-password",
//   "/auth/reset-password",
// ];

apiClient.interceptors.request.use(
  async (config) => {
    // console.log({ config, AUTH_EXCEPT_ROUTES });
    // if (typeof window !== "undefined") {
    //   const token = getToken();

    //   const path = new URL(config?.url ?? "", config?.baseURL)?.pathname;

    //   const isAuthRoute = AUTH_EXCEPT_ROUTES?.some((route) =>
    //     path?.includes(route)
    //   );

    //   if (!isAuthRoute && token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    // }

    // return config;

    const isServer = typeof window === "undefined";
    // console.log(`🔍 [${isServer ? "SERVER" : "CLIENT"}] Request:`, config.url);

    // Check if route needs auth
    const path = new URL(config.url ?? "", config.baseURL).pathname;
    const isPublicRoute = AUTH_EXCEPT_ROUTES.some((route) =>
      path.includes(route)
    );

    // console.log(`🔍 Is public route: ${isPublicRoute}`);

    // Only add token for protected routes on CLIENT
    if (!isPublicRoute && !isServer) {
      const { getToken } = await import("@/features/auth/utils");
      const token = getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // console.log("🔑 Added Authorization header");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    // console.log("✅ API Response:", response.config.url, response.status);
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        // console.warn("Unauthorized — mungkin token expired.");

        // TODO: refresh token otomatis / redirect ke login
        // Contoh (pseudo):
        // if (refreshAvailable()) await refreshToken();
        // else redirectToLogin();
      }
    }

    return Promise.reject(error);
  }
);
