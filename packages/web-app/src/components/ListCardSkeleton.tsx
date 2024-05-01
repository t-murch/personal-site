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
  numItems = 18,
  height = "h-full",
  placeholderColor = "bg-gray-200",
  titleColor = "bg-gray-200",
}) => {
  // const scrollAreaRef = useRef<HTMLDivElement>(null);
  // const [skeletonRowCount, setSkeletonRowCount] = useState(7);
  // This proved to be very slow in testing. So defaulting to a higher number.
  // useEffect(() => {
  //   if (scrollAreaRef.current) {
  //     const scrollAreaHeight = scrollAreaRef.current.offsetHeight;
  //     console.log("scrollAreaHeight: ", scrollAreaHeight + "\n");
  //     const calculatedCount = Math.floor(scrollAreaHeight / 40) + 1;
  //     setSkeletonRowCount(calculatedCount);
  //   }
  // }, []);

  return (
    <Card className="h-full w-full">
      <div className={`animate-pulse ${height} p-2`}>
        <CardHeader
          className={
            "h-[10%] md:h-1/3 flex-row p-1 justify-start md:justify-start gap-4 items-center"
          }
        >
          <div
            className={`${titleColor} w-10 h-12 md:w-20 md:h-24 rounded-md md:rounded-2xl`}
          />
          <div
            className={`${titleColor} w-3/4 h-10 md:h-20 m-0 rounded-md md:rounded-2xl`}
          />
        </CardHeader>
        <Separator className="my-1" />
        <CardContent className="h-[90%] md:h-2/3 @xl/card:max-h-[4/5] p-1 pt-2">
          <ScrollArea id="SkeletonScrollArea" className="h-[98%]">
            {[...Array(numItems)].map((_, index) => (
              <div key={index}>
                <div className="flex flex-row min-h-10 @[14rem]/card:min-h-14 gap-2 @xl/card:gap-3 items-center">
                  <div className={`${placeholderColor} w-8 h-8 rounded`} />
                  <div className="flex-1">
                    <div
                      className={`${placeholderColor} w-[96%] md:w-1/2 h-6 md:h-3 rounded`}
                    />
                    <div
                      className={`${placeholderColor} hidden md:flex md:w-1/3 h-2 rounded mt-1`}
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
