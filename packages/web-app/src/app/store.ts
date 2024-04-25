import { ClientPlaylist } from "@/types";
import { atom } from "jotai";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { ReviewParts } from "./actions/robots";
// import { getSSTHost } from "./actions/util-server-actions";

export const musicDataAtom = atom<ClientPlaylist | null>(null);
export const resumeDataAtom = atom<ReviewParts | null>(null);
const APP_DOMAIN =
  process.env.NEXT_PUBLIC_APP_DOMAIN ?? "http://localhost:3000";

export const useMusicDataAtom = atomWithSuspenseQuery((get) => ({
  queryKey: ["musicData", get(musicDataAtom)],
  queryFn: async () => {
    "use client";
    // const siteDomain = await getSSTHost();
    const response = await fetch(`/api?query=music`);
    return await response.json();
  },
}));

export const useResumeTLDRDataAtom = atomWithSuspenseQuery((get) => ({
  queryKey: ["resumeTLDRData", get(resumeDataAtom)],
  queryFn: async () => {
    "use client";
    // const siteDomain = await getSSTHost();
    const response = await fetch(`/api?query=resumeTLDR`);
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
