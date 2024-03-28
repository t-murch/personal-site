"use client";

import SpotifyIcon from "@/../public/spotify.svg";
import { useMusicDataAtom } from "@/app/store";
import { CardPlacementOptions, ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";
import { MUSIC_TITLE } from "@/lib/utils";
import { useAtom } from "jotai";

export function MusicCard({ placement }: { placement: CardPlacementOptions }) {
  const [
    {
      data: { items, name },
    },
  ] = useAtom(useMusicDataAtom);
  // const { isLoading, musicData } = useMusicData();

  return (
    <div className="flex h-full">
      <ListCard
        contentRow={MusicRow}
        headerLink="spotify"
        title={name || MUSIC_TITLE}
        titleColor="text-green-500"
        iconPath={SpotifyIcon}
        items={items || []}
        placement={placement}
      />
    </div>
  );
}
