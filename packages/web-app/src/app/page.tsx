import NextLogo from "@/../public/next.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex h-full w-full">
      <Card className="@container/card h-full w-full text-xl">
        <CardHeader
          className={`h-1/3 @xl/card:h-1/5 @xl/card:text-4xl px-2 pt-2 pb-0 font-bold`}
        >
          <div className="flex flex-row justify-between pr-1 h-full overflow-hidden text-ellipsis">
            <div className="flex gap-1 items-center">
              <Image
                className="hidden @xl/card:inline"
                src={NextLogo}
                alt={`SOME-icon`}
                width={40}
                height={40}
              />
              AI Gen. Resume Summary
            </div>
            {/* <Link href="/"> */}
            {/*   <Icon name="minimize" className="hidden @xl/card:inline" /> */}
            {/* </Link> */}
          </div>
          <Separator className="@xl/card:my-2" />
        </CardHeader>
        <CardContent className="h-2/3 @xl/card:h-4/5 p-2 pt-2">
          <ScrollArea className="h-full">
            {/* <div className="py-1 px-2"> */}
            THIS IS THE MAIN SECTION
            {"\n"}
            Will show a randomly loaded ai summary of my resume. And be swapped
            out by 'full versions' of the right hand sections upon clicking on
            the section.
            {/* </div> */}
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}
