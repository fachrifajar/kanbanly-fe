"use client";

import { useEffect, useState } from "react";

export function ZustandHydration({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setHydrated(true));
  }, []);

  if (!hydrated) {
    return <div suppressHydrationWarning>{/* spinner */}</div>;
  }

  return <>{children}</>;
}
