import { QueryClient, DefaultOptions } from "@tanstack/react-query";

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  },
  mutations: {
    retry: 0,
  },
};

/**
 * ⚙️ Buat QueryClient baru
 */
export function makeQueryClient() {
  return new QueryClient({ defaultOptions: defaultQueryOptions });
}

/**
 * ⚙️ Singleton QueryClient di browser
 */
let browserQueryClient: QueryClient | null = null;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // server-side: setiap request harus pakai instance sendiri
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}