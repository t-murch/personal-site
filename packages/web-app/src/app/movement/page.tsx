import StravaIcon from "@/../public/icons/strava.svg";
import { ListCard } from "@/components/ListCard";
import ActivityRow from "@/components/content-row/ActivityRow";
import { recentActivities } from "@/lib/text-data";

export default function Page() {
  return (
    <main className="flex h-full w-full">
      <ListCard
        contentRow={ActivityRow}
        headerLink="strava"
        title="Recent Activities"
        titleColor="text-orange-500"
        iconPath={StravaIcon}
        items={recentActivities}
        placement="main"
      />
    </main>
  );
}
