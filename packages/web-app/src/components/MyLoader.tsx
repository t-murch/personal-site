"use client";

import { getMusicData } from "@/app/actions/music";
import { atom, useAtom } from "jotai";
import { musicDataRW } from "@/app/store";
import { useEffect } from "react";

const loadingAtom = atom(false);

export default function MyLoader() {
  const [musicData, setMusicData] = useAtom(musicDataRW);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  useEffect(() => {
    async function fetchMusicData() {
      setIsLoading(true);
      console.log("fetching from PROVIDERS");
      await getMusicData()
        .then((data) => {
          if (data.items.length > 0) {
            console.debug("setting music data: ", data);
            setMusicData({ ...data });
          }
        })
        .catch((error) => console.error("Error fetching music data: ", error))
        .finally(() => setIsLoading(false));
    }

    if (!isLoading && !musicData?.items) fetchMusicData();
  }, [isLoading, musicData, setIsLoading, setMusicData]);

  return null;
}
