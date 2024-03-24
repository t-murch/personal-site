import SpotifyIcon from "@/../public/spotify.svg";
import { ListCard } from "@/components/ListCard";
import MusicRow from "@/components/content-row/MusicRow";
import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { MUSIC_TITLE } from "@/lib/utils";
import { ClientPlaylist } from "@/types";
import { get } from "aws-amplify/api/server";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

async function getMusicData() {
  noStore();
  let data: ClientPlaylist = {} as ClientPlaylist;
  console.debug("getting music data...");
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (context) => {
      try {
        const { body } = await get(context, {
          apiName: "music",
          path: "/music/popular",
        }).response;

        data = (await body.json()) as ClientPlaylist;
        // console.debug("data", data);
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
        return data;
      }
    },
  });
}

export default async function Page() {
  const { items, name } = await getMusicData();

  return (
    <main className="flex h-full">
      <ListCard
        contentRow={MusicRow}
        title={name || MUSIC_TITLE}
        titleColor="text-green-500"
        iconPath={SpotifyIcon}
        items={items || []}
      />
    </main>
  );
}
