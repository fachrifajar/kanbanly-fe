import { redirect } from "next/navigation";
import { prefetchQuery } from "@/lib/react-query";
import { AuthService } from "@/features/auth/services/auth.service";
// import { handleAxiosError } from "@/shared/utils";

export const prefetchVerifyRegisterToken = async (register_token: string) => {
  if (!register_token) redirect("/");

  try {
    const dehydratedState = await prefetchQuery(
      ["verify", register_token],
      async () => {
        try {
          const res = await AuthService.verifyEmail(register_token);
          return {
            ...res,
            success: true,
          };

          return res;
        } catch (err) {
          // save to cache

          return {
            success: false,
            status: err?.response?.status || 500,
            error: err?.response?.data?.message || "Verification failed.",
          };
        }
      },
      { staleTime: 0 }
    );

    return dehydratedState;
  } catch (err) {
    // console.error("❌ Prefetch outer error:", err);
    return { queries: [] } as any; // fallback kosong agar tidak crash
  }
};
