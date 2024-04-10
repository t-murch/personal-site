"use client";

import SpotifyIcon from "@/../public/icons/spotify.svg";
import { useMusicDataAtom } from "@/app/store";
import { CardPlacementOptions, ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";
import { MUSIC_TITLE } from "@/lib/utils";
import { useAtom } from "jotai";
import { Suspense } from "react";
import { ListCardSkeleton } from "./ListCardSkeleton";

function MusicCardContent({ placement }: { placement: CardPlacementOptions }) {
  const [
    {
      data: { items, name },
    },
  ] = useAtom(useMusicDataAtom);

  return (
    <ListCard
      contentRow={MusicRow}
      headerLink="spotify"
      title={name || MUSIC_TITLE}
      titleColor="text-green-500"
      iconPath={SpotifyIcon}
      items={items || []}
      placement={placement}
    />
  );
}

export function MusicCard({ placement }: { placement: CardPlacementOptions }) {
  // return <ListCardSkeleton />;
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
