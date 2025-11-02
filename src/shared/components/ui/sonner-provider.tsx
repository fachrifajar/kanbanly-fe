"use client";

import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import { useTheme } from "next-themes";

export function SonnerProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      theme={(resolvedTheme as ToasterProps["theme"]) ?? "system"}
      visibleToasts={9}
      richColors
      position="top-center"
      toastOptions={{
        classNames: {
          title: "!font-bold text-base",
        },
      }}
      // closeButton
    />
  );
}
