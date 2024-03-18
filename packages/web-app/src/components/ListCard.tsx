import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import NextLogo from "../../public/next.svg";
import { ListCardProps } from "../app/page";

export function ListCard({ title, items }: ListCardProps): JSX.Element {
  return (
    <Card className="@container/card h-full w-full text-xl">
      <CardHeader className="h-1/5 @[14rem]/card:h-[15%] @[14rem]/card:text-4xl px-2 pt-2 pb-0 font-bold text-green-500">
        {title}
        <Separator className="@[14rem]/card:my-2" />
      </CardHeader>
      <CardContent className="h-4/5 @[14rem]/card:h-[85%] p-2 pt-2">
        <ScrollArea className="h-full">
          {items.map((jam, index) => {
            return (
              <div key={index}>
                <a
                  href={jam.url}
                  className="flex flex-row gap-2 @[14rem]/card:gap-3 items-center whitespace-nowrap overflow-hidden overflow-ellipsis @[14rem]/card:font-semibold @[14rem]/card:text-[#adbac7] text-sm @[14rem]/card:text-lg"
                  target="_blank"
                >
                  <Image
                    src={NextLogo}
                    alt={`${jam.title} album cover`}
                    // fill={true}
                    width={50}
                    height={50}
                    className="rounded-md"
                    priority
                  />
                  <div className="overflow-hidden overflow-ellipsis">
                    <p>
                      {jam.title}{" "}
                      <span className="text-xs font-bold text-[#2a2828]">
                        by
                      </span>{" "}
                      {jam.artist}
                    </p>
                    <p className="hidden @[14rem]/card:flex text-sm">
                      <span className="text-xs font-bold text-[#adbac7]">
                        {jam.album}
                      </span>
                    </p>
                  </div>
                </a>
                <Separator className="my-1" />
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
