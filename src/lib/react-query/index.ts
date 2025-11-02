// lib/react-query/index.ts

// Client-side
export { ReactQueryProvider } from "./provider";
export { HydrationBoundary } from "./hydration-boundary";
export { getQueryClient } from "./client";

// Server-side
export {
  getQueryClientForServer,
  prefetchQuery,
  prefetchQueries,
  type PrefetchedState,
} from "./prefetch";

// Re-export from @tanstack/react-query for convenience
export {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
