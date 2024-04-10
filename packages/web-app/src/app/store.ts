import { ClientPlaylist } from "@/types";
import { atom } from "jotai";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { ResumePayload, ReviewParts } from "./actions/robots";

export const musicDataAtom = atom<ClientPlaylist | null>(null);
export const resumeDataAtom = atom<ReviewParts | null>(null);

export const useMusicDataAtom = atomWithSuspenseQuery((get) => ({
  queryKey: ["musicData", get(musicDataAtom)],
  queryFn: async () => {
    // Cannot call this Server Action from the client
    // return await getMusicData();
    // TODO: Update with variable for url.

    // const response = await fetch(
    //   "https://d2nwdehfiw8blq.cloudfront.net/api?query=music",
    // );
    const response = await fetch("http://localhost:3000/api?query=music");
    // add 3 second delay to simulate slow network
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return await response.json();
  },
}));

export const useResumeDataAtom = atomWithSuspenseQuery((get) => ({
  queryKey: ["resumeData", get(resumeDataAtom)],
  queryFn: async () => {
    // const response = await fetch(
    //   "https://d2nwdehfiw8blq.cloudfront.net/api?query=resume",
    // );
    const response = await fetch("http://localhost:3000/api?query=resume");
    // add 3 second delay to simulate slow network
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.debug(
    //   "response pre-parse",
    //   JSON.stringify(response, null, 2) + "\n\n",
    // );
    // const data = (await response.json()) as ResumePayload;
    // console.debug("data", JSON.stringify(data, null, 2) + "\n\n");
    return (await response.json()) as ReviewParts;
    // return { ...data.text } as ReviewParts;
  },
}));
