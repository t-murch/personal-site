// "use client";

import SpotifyIcon from "@/../public/icons/spotify.svg";
import { getMusicData } from "@/app/actions/music";
import { CardPlacementOptions, ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";

export async function MusicCard({
  placement,
}: {
  placement: CardPlacementOptions;
}) {
  const data = await getMusicData();
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
