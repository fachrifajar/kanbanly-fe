import { cache } from "react";
import { dehydrate, DehydratedState } from "@tanstack/react-query";
import { makeQueryClient } from "./client";

/**
 * Cache QueryClient per request (di server)
 */
export const getServerQueryClient = cache(() => makeQueryClient());

/**
 * Prefetch single query di RSC
 */
export async function prefetchQuery<T>(
  queryKey: unknown[],
  queryFn: () => Promise<T>,
  options?: { staleTime?: number }
) {
  const queryClient = getServerQueryClient();

  const data = await queryFn();

  // Set hasil langsung ke cache
  // queryClient.setQueryData(queryKey, data);

  // Simpan metadata dan mark sebagai fetched
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => data,
    staleTime: options?.staleTime ?? 1000 * 60,
  });

  // console.log(
  //   "✅ [prefetchQuery] Cached keys:",
  //   queryClient
  //     .getQueryCache()
  //     .getAll()
  //     .map((q) => q.queryKey)
  // );

  return dehydrate(queryClient);
}

/**
 * Prefetch multiple queries
 */
export async function prefetchQueries(
  queries: Array<{
    queryKey: unknown[];
    queryFn: () => Promise<unknown>;
    staleTime?: number;
  }>
) {
  const queryClient = getServerQueryClient();

  await Promise.all(
    queries.map((q) =>
      queryClient.prefetchQuery({
        queryKey: q.queryKey,
        queryFn: q.queryFn,
        staleTime: q.staleTime ?? 1000 * 60,
      })
    )
  );

  return dehydrate(queryClient);
}

/**
 * Type helper untuk hasil dehydrasi
 */
export type PrefetchedState = DehydratedState;
