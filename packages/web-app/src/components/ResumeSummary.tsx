import { getResumeSummaryData } from "@/app/actions/robots";
import { delayFetch } from "@/lib/utils";
import { GeneralResponse } from "@/types";
import { ScrollArea } from "./ui/scroll-area";

export async function ResumeSummary() {
  const data: GeneralResponse<string, { message: string }> =
    await delayFetch(getResumeSummaryData);
  const content = data.success ? data.data : "Error fetching resume summary.";
  return <ScrollArea className="h-full w-full">{content}</ScrollArea>;
}
