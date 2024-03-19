type Jam = {
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  url: string;
};

type Activity = {
  name: string;
  duration: string;
  distance: string;
  type: string;
  date: string;
  url: string;
};

export type { Activity, Jam };
