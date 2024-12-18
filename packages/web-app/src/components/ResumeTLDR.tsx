import { getResumeTLDRData } from "@/app/actions/robots";
import { ScrollArea } from "./ui/scroll-area";

export async function TLDRContent() {
  const data = await getResumeTLDRData();
  const content = data.success
    ? data.data.TLDR.join(" ")
    : "Error fetching resume summary.";

  return <ScrollArea className="h-full w-full">{content}</ScrollArea>;
}
