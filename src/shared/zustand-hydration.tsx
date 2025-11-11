"use client";

import { useEffect, useState } from "react";
// import { LoadingBackdrop } from "./components";

export function ZustandHydration({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setHydrated(true));
  }, []);

  if (!hydrated) {
    return <div suppressHydrationWarning>{/* <LoadingBackdrop open /> */}</div>;
  }

  return <>{children}</>;
}
