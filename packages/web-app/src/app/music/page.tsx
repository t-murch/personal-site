import { ListCardSkeleton } from "@/components/ListCardSkeleton";
import { MusicCard } from "@/components/MusicCard";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="flex h-full w-full">
      <Suspense fallback={<ListCardSkeleton />}>
        <MusicCard placement="main" />
      </Suspense>
    </main>
  );
}
