"use server";

import { parseError } from "@/lib/utils";
import { ClientPlaylist, GeneralResponse } from "@/types";
import { Resource } from "sst";

const MUSIC_API = Resource.MusicApi.url;
console.log(`MUSIC_API: ${MUSIC_API}`);

export async function getMusicData(): Promise<
  GeneralResponse<ClientPlaylist, { message: string }>
> {
  // noStore();
  console.log("getting music data...");
  const response = await fetch(`${MUSIC_API}/music/topItems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 * 60 * 24 },
  });

  const data: GeneralResponse<ClientPlaylist, { message: string }> =
    await response.json().catch((error) => {
      let errorMsg = parseError(error);

      return {
        error: { message: errorMsg },
        success: false,
      };
    });

  if (!data.success) {
    console.error(
      `error fetching top items. error: ${JSON.stringify(data.error)}`,
    );
    return { error: { message: `Error fetching top items.` }, success: false };
  }

  console.log(
    `top items acquired. one item: ${JSON.stringify(data.data.items[0])}`,
  );

  console.log("music data sent...");
  return { data: data.data, success: true };
}
