import GeminiLogo from "@/../public/icons/gemini.svg";
import { Separator } from "@radix-ui/react-separator";
import CardHeaderContent from "./CardHeaderContent";
import { ResumeReview } from "./ResumeReview";
import { TooltipxPopover } from "./TooltipxPopover";
import { Card, CardContent, CardHeader } from "./ui/card";

export function ResumeCard() {
  return (
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
          TitleJSX={ResumeTitle}
          titleColor={"#FFF"}
        />
        <Separator className="@xl/card:my-2" />
      </CardHeader>
      <CardContent className="h-[90%] md:h-2/3 @xl/card:h-4/5 @xl/card:max-h-[4/5] p-2 pt-2">
        <ResumeReview />
      </CardContent>
    </Card>
  );
}

function ResumeTitle() {
  const title = "Resume Summary";
  return (
    <>
      <span title={title}>{title}</span>
      <TooltipxPopover />
    </>
  );
}
