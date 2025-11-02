import React from "react";
import { cn } from "@/shared/utils";
import { CircleX, CheckCircle } from "lucide-react";

export const KanbanlyLogo = ({
  useText = true,
  className,
}: {
  useText?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M7.5 4.5H4.5V7.5H7.5V4.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 4.5H16.5V7.5H19.5V4.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 16.5H4.5V19.5H7.5V16.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 16.5H16.5V19.5H19.5V16.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 4.5H13V7.5H11V4.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 16.5H13V19.5H11V16.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {useText && (
        <span className="text-xl font-bold text-foreground">Kanbanly</span>
      )}
    </div>
  );
};

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

const ErrorIcon = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex items-center justify-center w-18 h-18 rounded-full bg-[var(--error-bg)]",
      className
    )}
  >
    <CircleX className="w-9 h-9 text-[var(--error-color)]" strokeWidth={2.5} />
  </div>
);

const SuccessIcon = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex items-center justify-center w-18 h-18 rounded-full bg-[var(--success-bg)]",
      className
    )}
  >
    <CheckCircle
      className="w-9 h-9 text-[var(--success)]"
      strokeWidth={2.5}
    />
  </div>
);

const iconMap = {
  plus: PlusIcon,
  close: CloseIcon,
  error: ErrorIcon,
  success: SuccessIcon,
};

export type IconName = keyof typeof iconMap;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
