import { ResumeCard } from "@/components/ResumeCard";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getResumeSummaryData, getResumeTLDRData } from "../actions/robots";

export default async function Page() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["resumeTLDRData"],
      queryFn: getResumeTLDRData,
    }),
    queryClient.prefetchQuery({
      queryKey: ["resumeSummaryData"],
      queryFn: getResumeSummaryData,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full w-full">
        <ResumeCard />
      </main>
    </HydrationBoundary>
  );
}
