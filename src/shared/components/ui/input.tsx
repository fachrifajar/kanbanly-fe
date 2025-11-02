import * as React from "react";
import { Label } from "@/shared/components";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/shared/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  id?: string;
  label?: string;
  className?: string;
}

function Input({
  className,
  type,
  error,
  errorMessage,
  id,
  label,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          data-slot="input"
          aria-invalid={error || false}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            type === "password" && "pr-10"
          )}
          {...props}
        />

        {type === "password" && (
          <div
            onClick={handleShowPassword}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
          >
            {showPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </div>
        )}
      </div>
      {error && <p className="text-[12px] text-destructive">{errorMessage}</p>}
    </div>
  );
}

export { Input };
