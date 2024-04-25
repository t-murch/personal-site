import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface ListCardSkeletonProps {
  numItems?: number;
  height?: string;
  placeholderColor?: string;
  titleColor?: string;
}

export const ListCardSkeleton: React.FC<ListCardSkeletonProps> = ({
  numItems = 7,
  height = "h-full",
  placeholderColor = "bg-gray-200",
  titleColor = "bg-gray-200",
}) => {
  return (
    <Card className="h-full w-full">
      <div className={`animate-pulse ${height} p-2`}>
        <CardHeader
          className={`h-1/3 @xl/card:h-1/5 @xl/card:text-4xl flex-row justify-start gap-4 items-center px-2 pt-2 pb-0 font-bold overflow-hidden`}
        >
          <div className={`${titleColor} w-20 h-24 rounded`} />
          <div className={`${titleColor} w-3/4 h-20 m-0 rounded`} />
        </CardHeader>
        <Separator className="my-1" />
        <CardContent className="h-2/3 @xl/card:h-4/5 @xl/card:max-h-[4/5] p-2 pt-2">
          <ScrollArea className="h-[98%]">
            {[...Array(numItems)].map((_, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${placeholderColor} w-6 h-6 rounded`} />
                  <div className="flex-1">
                    <div className={`${placeholderColor} w-1/2 h-3 rounded`} />
                    <div
                      className={`${placeholderColor} w-2/3 h-2 rounded mt-1`}
                    />
                  </div>
                </div>
                <Separator className="my-1" />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </div>
    </Card>
  );
};
