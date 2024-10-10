"use server";

import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { ClientPlaylist } from "@/types";
import { get } from "aws-amplify/api/server";
import { cookies } from "next/headers";

export async function getMusicData(): Promise<ClientPlaylist> {
  // noStore();
  let data: ClientPlaylist = {} as ClientPlaylist;
  console.debug("getting music data...");
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (context) => {
      try {
        const { body } = await get(context, {
          apiName: "music",
          path: "/music/topItems",
        }).response;

        const response = (await body.json()) as {
          data: ClientPlaylist;
          success: boolean;
        };
        data = response.data;
      } catch (error) {
        if (error instanceof Error) {
          console.debug(
            "error getting music: ",
            JSON.stringify(error, null, 2),
          );
        } else {
          console.error("error is not of Error type: ", error);
        }
      } finally {
        console.debug("music data sent...");
        return data;
      }
    },
  });
}
