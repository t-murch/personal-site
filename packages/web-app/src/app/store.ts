import { ClientPlaylist } from "@/types";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { getMusicData } from "./actions/music";

export const musicDataAtom = atom<ClientPlaylist | null>(null);

export const useMusicData = () => {
  const [musicData, setMusicData] = useAtom(musicDataAtom);

  useEffect(() => {
    const fetchData = async () => {
      if (!musicData) {
        try {
          const response = await getMusicData();
          setMusicData(response);
        } catch (error) {
          console.error("Error fetching music data:", error);
        }
      }
    };

    fetchData();
  }, [setMusicData, musicData]);

  return musicData;
};
