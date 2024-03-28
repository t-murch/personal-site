import { ClientPlaylist } from "@/types";
import { atom } from "jotai";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";

export const musicDataAtom = atom<ClientPlaylist | null>(null);

export const useMusicDataAtom = atomWithSuspenseQuery((get) => ({
  queryKey: ["musicData", get(musicDataAtom)],
  queryFn: async () => {
    // Cannot call this Server Action from the client
    // return await getMusicData();
    // TODO: Update with variable for url.
    const response = await fetch("http://localhost:3000/api/");
    return await response.json();
  },
}));
