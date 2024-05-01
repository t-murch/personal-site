"use client";

import { getResumeSummaryData } from "@/app/actions/robots";
import { useQuery } from "@tanstack/react-query";

export function ResumeSummary() {
  const query = useQuery({
    queryKey: ["resumeSummaryData"],
    queryFn: getResumeSummaryData,
  });

  return (
    <p className="font-normal text-base h-full overflow-y-scroll">
      {query.data}
    </p>
  );
}
