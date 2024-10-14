import { getResumeSummaryData } from "@/app/actions/robots";

export async function ResumeSummary() {
  const data = await getResumeSummaryData();

  return (
    <p className="font-normal text-base h-full overflow-y-scroll">{data}</p>
  );
}
