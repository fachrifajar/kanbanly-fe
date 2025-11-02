import { cn } from "@/shared/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>
        {`
          html, body {
            overflow: hidden;
            height: 100%;
          }
        `}
      </style>
      <div
        className={cn(
          "h-svh w-full overflow-hidden",
          "flex items-start justify-center",
          "pt-20 md:pt-24 px-6"
        )}
      >
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </>
  );
}
