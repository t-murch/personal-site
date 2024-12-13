import { ContentRowProps } from "@/components/content-row/contentRow";

/* MUSIC TYPES */

type ClientPlaylist = {
  items: Jam[];
  name: string;
  url: string;
};

type Jam = {
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  url: string;
};

export function jamToContentRow(jam: Jam): ContentRowProps {
  // console.debug(`do we have a jam? = ${JSON.stringify(jam)}`);
  return {
    title: jam.title,
    secondaryInfo: jam.artist,
    additional: jam.album,
    imageLink: jam.albumCover,
    url: jam.url,
  };
}

/* ROBOTS TYPES */

type ReviewParts = { StrongSuits: string[]; TLDR: string[] };

type Activity = {
  name: string;
  duration: string;
  distance: string;
  type: string;
  date: string;
  url: string;
};

// a function for converting Objects of
// recentActivity type to ContentRow type.
export function activityToContentRow(activity: Activity): ContentRowProps {
  return {
    title: activity.name,
    secondaryInfo: activity.duration,
    imageLink: "/images/strava.png",
    additional: activity.date,
    url: activity.url,
    data: { type: activity.type },
  };
}

export function convertToContentRow<T>(convert: (item: T) => ContentRowProps) {
  return (items: T[]): ContentRowProps[] => {
    return items.map(convert);
  };
}

type GeneralResponse<T, E> =
  | { data: T; success: true }
  | { error: E; success: false };

export type { Activity, GeneralResponse, Jam, ClientPlaylist, ReviewParts };
