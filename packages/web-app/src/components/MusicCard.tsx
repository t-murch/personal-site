"use client";

import SpotifyIcon from "@/../public/spotify.svg";
import { useMusicData } from "@/app/store";
import { CardPlacementOptions, ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";
import { MUSIC_TITLE } from "@/lib/utils";

export function MusicCard({ placement }: { placement: CardPlacementOptions }) {
  const musicData = useMusicData();

  return (
    <div className="flex h-full">
      <ListCard
        contentRow={MusicRow}
        headerLink="spotify"
        title={musicData?.name || MUSIC_TITLE}
        titleColor="text-green-500"
        iconPath={SpotifyIcon}
        items={musicData?.items || []}
        placement={placement}
      />
    </div>
  );
}
