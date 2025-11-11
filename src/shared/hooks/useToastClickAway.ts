import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { UseToastClickAwayOptions } from "../interface";

export function useToastClickAway(
  toastId: string | number | null,
  options: UseToastClickAwayOptions = {}
) {
  const { enabled = true, delay = 300, onDismiss } = options;
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!enabled || !toastId) return;

    const handleClick = () => {
      toast.dismiss(toastId);
      onDismissRef.current?.();
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClick, { once: true });
    }, delay);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [toastId, enabled, delay]);
}
