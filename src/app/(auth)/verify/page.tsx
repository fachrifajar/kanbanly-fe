import { VerifyCard } from "@/features/auth/components/VerifyCard";
import { HydrationBoundary } from "@/lib/react-query";
import { prefetchVerifyRegisterToken } from "@/features/auth/api/verifyRegisterToken.prefetch";
import { VerifyPageProps } from "@/features/interface";

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams;
  const token = params?.register_token ?? "";

  const dehydratedState = await prefetchVerifyRegisterToken(token);
  // console.log("dehydratedState in page.tsx =>", dehydratedState);

  // console.log(
  //   "dehydratedState in page.tsx =>",
  //   dehydratedState.queries?.[0]?.state
  // );

  return (
    <HydrationBoundary state={dehydratedState}>
      <VerifyCard token={token} />
    </HydrationBoundary>
  );
}
