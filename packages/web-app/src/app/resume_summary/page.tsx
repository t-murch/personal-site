import GeminiLogo from "@/../public/icons/gemini.svg";
import CardHeaderContent from "@/components/CardHeaderContent";
import { ResumeReview } from "@/components/ResumeReview";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
          <CardHeaderContent
            iconPath={GeminiLogo}
            link={"gemini"}
            placement={"main"}
            title={"Resume Summary"}
            titleColor={"#FFF"}
          />
          <Separator className="@xl/card:my-2" />
        </CardHeader>
        <CardContent className="h-[90%] md:h-2/3 @xl/card:h-4/5 @xl/card:max-h-[4/5] p-2 pt-2">
          {/* <div className="h-[98%]"> */}
          <ResumeReview />
          {/* </div> */}
        </CardContent>
      </Card>
    </main>
  );
}
