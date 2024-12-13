import { getResumeSummaryData } from "@/app/actions/robots";
import { delayFetch } from "@/lib/utils";
import { GeneralResponse } from "@/types";

export async function ResumeSummary() {
  const data: GeneralResponse<string, { message: string }> =
    await delayFetch(getResumeSummaryData);
  const content = data.success ? data.data : "Error fetching resume summary.";
  return (
    <p className="font-normal text-base h-full overflow-y-scroll">{content}</p>
  );
}
