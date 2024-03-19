import NextLogo from "@/../public/next.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Jam } from "@/types";
import Image from "next/image";
import Icon from "./Icon";
import { ContentRowProps } from "./content-row/contentRow";

type ListCardProps = {
  contentRow: React.ComponentType<ContentRowProps>;
  title: string;
  titleColor?: string;
  iconPath?: string;
  items: Jam[];
};

export function ListCard({
  contentRow: ContentRow,
  title,
  titleColor,
  iconPath,
  items,
}: ListCardProps): JSX.Element {
  return (
    <Card className="@container/card h-full w-full text-xl">
      <CardHeader
        className={`h-1/3 @xl/card:h-1/5 @xl/card:text-4xl px-2 pt-2 pb-0 font-bold`}
      >
        <div className="flex flex-row justify-between pr-1 h-full overflow-hidden text-ellipsis">
          <div className={`flex gap-1 items-center ${titleColor}`}>
            {iconPath && (
              <Image
                className="hidden @xl/card:inline"
                src={iconPath}
                alt={`${title}-icon`}
                width={40}
                height={40}
              />
            )}
            {title}
          </div>
          {iconPath && (
            <Image
              className="inline @xl/card:hidden"
              src={iconPath}
              alt={`${title}-icon`}
              width={40}
              height={40}
            />
          )}
          <Icon name="minimize" className="hidden @xl/card:inline" />
        </div>
        <Separator className="@xl/card:my-2" />
      </CardHeader>
      <CardContent className="h-2/3 @xl/card:h-4/5 p-2 pt-2">
        <ScrollArea className="h-full">
          {items.map((jam, index) => {
            return (
              <div key={index}>
                <ContentRow
                  title={jam.title}
                  secondaryInfo={jam.artist}
                  imageLink={NextLogo}
                  additional={jam.album}
                  url={jam.url}
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
