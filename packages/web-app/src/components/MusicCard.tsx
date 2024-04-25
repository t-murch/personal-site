"use client";

import SpotifyIcon from "@/../public/icons/spotify.svg";
import { musicDataAtom } from "@/app/store";
import { CardPlacementOptions, ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";
import { MUSIC_TITLE } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { Suspense } from "react";
import { ListCardSkeleton } from "./ListCardSkeleton";

function MusicCardContent({ placement }: { placement: CardPlacementOptions }) {
  // const [
  //   {
  //     data: { items, name },
  //   },
  // ] = useAtom(useMusicDataAtom);
  const data = useAtomValue(musicDataAtom);

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
