import NextLogo from "@/../public/icons/next.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Activity, Jam, activityToContentRow, jamToContentRow } from "@/types";
import CardHeaderContent from "./CardHeaderContent";
import { ContentRowProps } from "./content-row/contentRow";

import type { JSX } from "react";

export const IconxRoutes = {
  gemini: "/resume_summary",
  home: "/",
  notion: "/thoughts",
  spotify: "/music",
  strava: "/movement",
} as const;

type IconxRoutes = typeof IconxRoutes;

export type CardPlacementOptions = "main" | "side";

type ListCardProps = {
  contentRow: React.ComponentType<ContentRowProps>;
  headerLink: keyof IconxRoutes;
  title: string;
  titleColor: string;
  iconPath: string;
  items: Jam[] | Activity[];
  placement: CardPlacementOptions;
};

export function ListCard({
  contentRow: ContentRow,
  headerLink,
  placement,
  title,
  titleColor,
  iconPath,
  items,
}: ListCardProps): JSX.Element {
  const titleJSX = () => <span>{title}</span>;

  return (
    <Card id="container-card" className="@container/card h-full w-full text-xl">
      <CardHeader className="h-[10%] md:h-1/3 @xl/card:h-1/5 @xl/card:text-4xl px-2 pt-2 pb-0 font-bold overflow-hidden text-ellipsis text-nowrap">
        <CardHeaderContent
          iconPath={iconPath}
          link={headerLink}
          placement={placement}
          TitleJSX={titleJSX}
          titleColor={titleColor}
        />
        <Separator className="@xl/card:my-2" />
      </CardHeader>
      <CardContent className="h-[90%] md:h-2/3 @xl/card:h-4/5 @xl/card:max-h-[4/5] p-2 pt-2">
        <ScrollArea className="h-full w-full">
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
              <div
                key={index}
                className="w-full rounded-t-md active:shadow-inner active:shadow-gray-500/50 md:hover:shadow-inner md:hover:shadow-gray-500/50"
              >
                <ContentRow
                  title={item.title}
                  secondaryInfo={item.secondaryInfo}
                  imageLink={item.imageLink ?? NextLogo}
                  additional={item.additional}
                  priorityLoad={index < 8}
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
