import { getResumeTLDRData } from "@/app/actions/robots";
import { delayFetch } from "@/lib/utils";

export async function TLDRContent() {
  const data = await delayFetch(getResumeTLDRData);
  const content = data.success
    ? data.data.TLDR.join(" ")
    : "Error fetching resume summary.";

  return (
    <p className="font-normal text-base h-full overflow-y-scroll">{content}</p>
  );
}
