"use client";

import { getResumeTLDRData } from "@/app/actions/robots";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function TLDRContent() {
  const query = useQuery({
    queryKey: ["resumeTLDRData"],
    queryFn: getResumeTLDRData,
  });

  return (
    <p className="font-normal text-base h-full overflow-y-scroll">
      {query.data?.TLDR && query.data.TLDR.join(" ")}
    </p>
  );
}
