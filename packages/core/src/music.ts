export * as Music from "./music";

import { ClientPlaylist, Jam } from "../../web-app/src/types";
import { Playlist } from "./test-data";
import { Resource } from "sst";

type Result<T, E> = { data: T; success: true } | { error: E; success: false };
type GeneralError = { message: string };

const TOP_50_USA_PLAYLIST_ID = "37i9dQZEVXbLRQDuF5jeBp";
const TOP_50_GLOBAL_PLAYLIST_ID = "37i9dQZEVXbMDoHDwVN2tF";
const BILLBOARD_HOT_100_PLAYLIST_ID = "6UeSakyzhiEt4NB3UAd6NQ";

const SPOTIFY_PLAYLISTS = [
  TOP_50_USA_PLAYLIST_ID,
  TOP_50_GLOBAL_PLAYLIST_ID,
  BILLBOARD_HOT_100_PLAYLIST_ID,
];

const SPOTIFY_API_BASE = "https://api.spotify.com/v1/";

/**
 * Fetches a popular playlist from Spotify.
 * The fields property used in the query pairs down the response to only the fields we need.
 * Created using the Spotify API Console: https://developer.spotify.com/documentation/web-api/reference/get-playlist
 * fields: name,href,tracks.items(track(name,href,album(name,href),artists(name))
 */
export async function popularPlaylist(
  tokenFunc: () => Promise<AuthResponse>,
): Promise<Result<ClientPlaylist, GeneralError>> {
  //TODO: validate with ZOD
  let data: Playlist = {} as Playlist;
  const playlistId = SPOTIFY_PLAYLISTS[new Date().getDay() % 3];

  // const playlistId =
  //   SPOTIFY_PLAYLISTS[Math.floor(Math.random() * SPOTIFY_PLAYLISTS.length)];

  const fields =
    "fields=name,href,tracks.items(track(name,external_urls.spotify,album(name,images),artists(name)))";

  try {
    const { access_token: accessToken } = await tokenFunc();
    //TODO: Make the fields more robust with a url query builder
    const response = await fetch(
      SPOTIFY_API_BASE + `playlists/${playlistId}?${fields}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    /**
     *
     * data:  {
     * "error": {
     * "status": 400,
     * "message": "Only valid bearer authentication supported"
     * }
     * }
     */
    if (!response.ok) {
      return { error: { message: "Token exchange failed" }, success: false };
    }
    data = await response.json().then((data) => data as Playlist);
    // console.debug("data: ", JSON.stringify(data, null, 2));
  } catch (error) {
    // console.error("Error fetching Spotify API: ", error);
    console.error("Token exchange failed");
    // throw error;
  }

  // Convert the Spotify API response to our internal representation.
  // This is a good place to do this because we want to keep the API
  // response separate from our internal representation.
  const jams = data.tracks.items.map(toJam);
  // console.debug("jams: ", JSON.stringify(jams.slice(0, 2), null, 2));
  const clientPlaylist: ClientPlaylist = {
    items: jams,
    name: data.name,
    url: data.href,
  };

  // console.debug("popularPlaylist: ", JSON.stringify(clientPlaylist, null, 2));
  return { data: clientPlaylist, success: true };
}

/**
 * This function is to only be used
 * for access to non-user specific data.
 */
export async function getServerAccessToken(): Promise<AuthResponse> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          Resource.SPOTIFY_API_ID.value + ":" + Resource.SPOTIFY_API_KEY.value,
        ).toString("base64"),
      ContentType: "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  return (await response.json()) as AuthResponse;
}

export async function getUserAccessToken(): Promise<AuthResponse> {}

function toJam(track: Playlist["tracks"]["items"][number]): Jam {
  const { track: t } = track;

  return {
    title: t.name,
    artist: t.artists.map((a) => a.name).join(", "),
    album: t.album.name,
    albumCover: t.album.images.find((image) => image.height === 64)?.url ?? "",
    url: t.external_urls.spotify,
  };
}

type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
