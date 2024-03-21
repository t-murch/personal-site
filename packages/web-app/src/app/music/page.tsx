import SpotifyIcon from "@/../public/spotify.svg";
import { ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";
import { recentJams } from "@/lib/text-data";

export default function Page() {
  return (
    <main className="flex h-full">
      <ListCard
        contentRow={MusicRow}
        title="Recent Jams"
        titleColor="text-green-500"
        iconPath={SpotifyIcon}
        items={recentJams}
      />
    </main>
  );
}
