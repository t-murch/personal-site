import { getMusicData } from "@/app/actions/music";
import { NextRequest } from "next/server";
import { getResumeData } from "../actions/robots";

export async function GET(_request: NextRequest) {
  const query = _request.nextUrl.searchParams.get("query");

  switch (query) {
    case "music":
      return Response.json(await getMusicData());
    case "resume":
      return Response.json(await getResumeData());
  }
}
