"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/shared/utils";
import { LoadingBackdropProps } from "@/shared/interface";

export function LoadingBackdrop({ open, blur = true }: LoadingBackdropProps) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]",
        blur && "backdrop-blur-[2px]"
      )}
    >
      <Loader2 className="h-12 w-12 animate-spin text-primary drop-shadow-lg" />
    </div>
  );
}
