// lib/react-query/hydration-boundary.tsx
"use client";

import {
  HydrationBoundary as RQHydrationBoundary,
  HydrationBoundaryProps,
} from "@tanstack/react-query";

/**
 * Re-export HydrationBoundary dengan type yang lebih baik
 */
export function HydrationBoundary({ children, state }: HydrationBoundaryProps) {
  return <RQHydrationBoundary state={state}>{children}</RQHydrationBoundary>;
}
