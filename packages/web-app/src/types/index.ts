import { ContentRowProps } from "@/components/content-row/contentRow";

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
  return {
    title: jam.title,
    secondaryInfo: jam.artist,
    additional: jam.album,
    imageLink: jam.albumCover,
    url: jam.url,
  };
}

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

export type { Activity, Jam, ClientPlaylist };
