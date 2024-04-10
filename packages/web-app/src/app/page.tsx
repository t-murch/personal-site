import { AboutMe } from "@/components/AboutMe";
import Icon from "@/components/Icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <main className="flex h-full w-full">
      <Card
        id={`container-card`}
        className="@container/card h-full w-full text-xl"
      >
        <CardHeader
          className={`h-[10%] md:h-1/3 @xl/card:h-1/5 @xl/card:text-4xl px-2 pt-2 pb-0 font-bold`}
        >
          <div className="flex flex-row justify-between pr-1 h-full overflow-hidden text-ellipsis">
            <div className="flex gap-1 items-center">
              <Icon name="scroll-text" alt="scroll-icon" size={25} />
              Hey there!
              {/* MySpace! 🚀, */}
            </div>
          </div>
          <Separator className="@xl/card:my-2" />
        </CardHeader>
        <CardContent className="h-[90%] md:h-2/3 @xl/card:h-4/5 @xl/card:max-h-[4/5] p-2 pt-2">
          <ScrollArea className="h-[98%]">
            <AboutMe />
            {/* <ResumeReview /> */}
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}
