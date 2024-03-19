import StravaIcon from "@/../public/strava.svg";
import { ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";
import { recentActivities } from "@/lib/text-data";

export default function Page() {
  return (
    <main className="flex h-full">
      <ListCard
        contentRow={MusicRow}
        title="Recent Activities"
        titleColor="text-orange-500"
        iconPath={StravaIcon}
        items={recentActivities}
      />
    </main>
  );
}
