import NextLogo from "@/../public/next.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Activity, Jam, activityToContentRow, jamToContentRow } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { ContentRowProps } from "./content-row/contentRow";

type ListCardProps = {
  contentRow: React.ComponentType<ContentRowProps>;
  title: string;
  titleColor?: string;
  iconPath?: string;
  items: Jam[] | Activity[];
};

export function ListCard({
  contentRow: ContentRow,
  title,
  titleColor,
  iconPath,
  items,
}: ListCardProps): JSX.Element {
  return (
    <Card id="container-card" className="@container/card h-full w-full text-xl">
      <CardHeader
        className={`h-1/3 @xl/card:h-1/5 @xl/card:text-4xl px-2 pt-2 pb-0 font-bold overflow-hidden text-ellipsis text-nowrap`}
      >
        <div className="flex flex-row justify-between pr-1 h-full overflow-hidden text-ellipsis">
          <div className={`flex gap-1 items-center ${titleColor}`}>
            {iconPath && (
              <Image
                className="hidden @xl/card:inline w-[30px] h-[30px]"
                src={iconPath}
                alt={`${title}-icon`}
                width={30}
                height={30}
              />
            )}
            {title}
          </div>
          <div>
            {iconPath && (
              <Image
                className="inline @xl/card:hidden w-[30px] h-[30px]"
                src={iconPath}
                alt={`${title}-icon`}
                width={30}
                height={30}
              />
            )}
            <Link href="/">
              <Icon name="minimize" className="hidden @xl/card:inline" />
            </Link>
          </div>
        </div>
        <Separator className="@xl/card:my-2" />
      </CardHeader>
      <CardContent className="h-2/3 @xl/card:h-4/5 p-2 pt-2">
        <ScrollArea className="h-[98%]">
          {items.map((listItem, index) => {
            // Will need to refactor this once I have the third type
            const itemType: "jam" | "activity" = (listItem as Jam)?.album
              ? "jam"
              : "activity";
            const item =
              itemType === "jam"
                ? jamToContentRow(listItem as Jam)
                : activityToContentRow(listItem as Activity);

            return (
              <div key={index} className="h-full">
                <ContentRow
                  title={item.title}
                  secondaryInfo={item.secondaryInfo}
                  imageLink={NextLogo}
                  additional={item.additional}
                  url={item.url}
                  data={item?.data ?? {}}
                />
                <Separator className="my-1" />
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
