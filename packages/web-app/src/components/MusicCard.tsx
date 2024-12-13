import SpotifyIcon from "@/../public/icons/spotify.svg";
import { getMusicData } from "@/app/actions/music";
import { CardPlacementOptions, ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";

export async function MusicCard({
  placement,
}: {
  placement: CardPlacementOptions;
}) {
  //TODO: implement error page.
  const musicData = await getMusicData();
  if (!musicData.success) {
    return (
      <ListCard
        contentRow={MusicRow}
        headerLink="spotify"
        title="Music"
        titleColor="text-gray-500"
        iconPath={SpotifyIcon}
        items={[]}
        placement={placement}
      />
    );
  }

  return (
    <ListCard
      contentRow={MusicRow}
      headerLink="spotify"
      title={musicData.data.name || ""}
      titleColor="text-green-500"
      iconPath={SpotifyIcon}
      items={musicData.data.items || []}
      placement={placement}
    />
  );
}
