"use client";

import SpotifyIcon from "@/../public/icons/spotify.svg";
import { CardPlacementOptions, ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";
import { Suspense } from "react";
import { ListCardSkeleton } from "./ListCardSkeleton";
import { getMusicData } from "@/app/actions/music";
import { useQuery } from "@tanstack/react-query";

function MusicCardContent({ placement }: { placement: CardPlacementOptions }) {
  const { data } = useQuery({ queryKey: ["musicData"], queryFn: getMusicData });

  // console.debug(`data in component? = ${JSON.stringify(data, null, 2)}`);
  return (
    <ListCard
      contentRow={MusicRow}
      headerLink="spotify"
      title={data?.name || ""}
      titleColor="text-green-500"
      iconPath={SpotifyIcon}
      items={data?.items || []}
      placement={placement}
    />
  );
}

export function MusicCard({ placement }: { placement: CardPlacementOptions }) {
  // return <ListCardSkeleton />;
  return (
    <Suspense fallback={<ListCardSkeleton />}>
      <MusicCardContent placement={placement} />
    </Suspense>
  );
}
