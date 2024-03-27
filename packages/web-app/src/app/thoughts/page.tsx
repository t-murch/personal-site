import NotionIcon from "@/../public/notion.svg";
import { ListCard } from "@/components/ListCard";
import ThoughtRow from "@/components/content-row/ThoughtRow";

export default function Page() {
  return (
    <main className="flex h-full">
      <ListCard
        contentRow={ThoughtRow}
        headerLink="notion"
        title="Some Thoughts"
        titleColor="text-white-500"
        iconPath={NotionIcon}
        items={[]}
        placement="main"
      />
    </main>
  );
}
