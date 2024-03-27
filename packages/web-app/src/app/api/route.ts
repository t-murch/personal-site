import { getMusicData } from "@/app/actions/music";

export async function GET(_request: Request) {
  return Response.json(await getMusicData());
}
