import { getResumeTLDRData } from "@/app/actions/robots";
import { delayFetch } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

export async function TLDRContent() {
  const data = await delayFetch(getResumeTLDRData);
  const content = data.success
    ? data.data.TLDR.join(" ")
    : "Error fetching resume summary.";

  return <ScrollArea className="h-full w-full">{content}</ScrollArea>;
}
