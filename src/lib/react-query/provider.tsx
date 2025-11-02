"use client";

import { ReactNode } from "react";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query/client";
import { PrefetchedState } from "@/lib/react-query/prefetch";

export function ReactQueryProvider({
  children,
  state,
}: {
  children: ReactNode;
  state?: PrefetchedState;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
