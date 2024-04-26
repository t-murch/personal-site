"use client";

import SpotifyIcon from "@/../public/icons/spotify.svg";
import { musicDataRW } from "@/app/store";
import { CardPlacementOptions, ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";
import { useAtom } from "jotai";
import { Suspense } from "react";
import { ListCardSkeleton } from "./ListCardSkeleton";

function MusicCardContent({ placement }: { placement: CardPlacementOptions }) {
  const [data] = useAtom(musicDataRW);

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
  return (
    <Suspense
      fallback={
        <ListCardSkeleton
        // titleColor="bg-green-500"
        />
      }
    >
      <MusicCardContent placement={placement} />
    </Suspense>
  );
}
