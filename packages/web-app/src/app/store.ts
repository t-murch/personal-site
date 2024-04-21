import { ClientPlaylist } from "@/types";
import { atom } from "jotai";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { ReviewParts } from "./actions/robots";

export const musicDataAtom = atom<ClientPlaylist | null>(null);
export const resumeDataAtom = atom<ReviewParts | null>(null);

export const useMusicDataAtom = atomWithSuspenseQuery((get) => ({
  queryKey: ["musicData", get(musicDataAtom)],
  queryFn: async () => {
    // Cannot call this Server Action from the client
    // return await getMusicData();
    // TODO: Update with variable for url.

    const response = await fetch(
      "https://d2nwdehfiw8blq.cloudfront.net/api?query=music",
    );
    // const response = await fetch("http://localhost:3000/api?query=music");
    return await response.json();
  },
}));

export const useResumeTLDRDataAtom = atomWithSuspenseQuery((get) => ({
  queryKey: ["resumeTLDRData", get(resumeDataAtom)],
  queryFn: async () => {
    const response = await fetch(
      "https://d2nwdehfiw8blq.cloudfront.net/api?query=resumeTLDR",
    );
    // const response = await fetch("http://localhost:3000/api?query=resumeTLDR");
    return await response.json();
  },
}));

// export const useResumeSummaryDataAtom = atomWithSuspenseQuery((get) => ({}));

// export const useResumeSummaryDataAtom = atomWithSuspenseQuery((get) => ({
//   queryKey: ["resumeSummaryData", get(resumeDataAtom)],
//   queryFn: async () => {
//     // const response = await fetch(
//     //   "https://d2nwdehfiw8blq.cloudfront.net/api?query=resume",
//     // );
//     const response = await fetch(
//       "http://localhost:3000/api?query=resumeSummary",
//     );
//     return await response.text();
//   },
// }));
