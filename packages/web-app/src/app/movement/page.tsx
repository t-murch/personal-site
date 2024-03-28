import StravaIcon from "@/../public/strava.svg";
import { ListCard } from "@/components/ListCard";
import ActivityRow from "@/components/content-row/ActivityRow";
import { recentActivities } from "@/lib/text-data";

export default function Page() {
  return (
    <main className="flex h-full">
      <ListCard
        contentRow={ActivityRow}
        title="Recent Activities"
        titleColor="text-orange-500"
        iconPath={StravaIcon}
        items={recentActivities}
      />
    </main>
  );
}
