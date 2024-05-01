import { getMusicData } from "@/app/actions/music";
import { NextRequest } from "next/server";
import { getResumeTLDRData, streamResumeSummaryData } from "../actions/robots";

export async function GET(_request: NextRequest) {
  const query = _request.nextUrl.searchParams.get("query");

  switch (query) {
    case "music":
      return Response.json(await getMusicData());
    case "resumeTLDR":
      return Response.json(await getResumeTLDRData());
    case "resumeSummary":
      return Response.json(await streamResumeSummaryData());
  }
}
