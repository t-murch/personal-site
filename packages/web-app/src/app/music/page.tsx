import { MusicCard } from "@/components/MusicCard";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getMusicData } from "../actions/music";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["musicData"],
    queryFn: getMusicData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full w-full">
        <MusicCard placement="main" />
      </main>
    </HydrationBoundary>
  );
}
