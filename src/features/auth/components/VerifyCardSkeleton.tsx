import { Card, CardHeader, CardContent, CardTitle } from "@/shared/components";

export function VerifyCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm ">
      <CardHeader className="flex flex-col items-center justify-center space-y-4 p-6">
        <CardTitle>
          <div className="h-7 w-40 sm:w-48 bg-[var(--skeleton)] rounded-md shimmer" />
        </CardTitle>

        <div className="w-full space-y-3 mt-4">
          <div className="h-4 w-[90%] bg-[var(--skeleton)] rounded-md shimmer" />
          <div className="h-4 w-[80%] bg-[var(--skeleton)] rounded-md shimmer" />
          <div className="h-4 w-[95%] bg-[var(--skeleton)] rounded-md shimmer" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col space-y-3 p-6 pt-0">
        <div className="h-5 w-full bg-[var(--skeleton)] rounded-md shimmer" />
        <div className="h-5 w-1/2 bg-[var(--skeleton)] rounded-md shimmer self-center" />
      </CardContent>
    </Card>
  );
}
