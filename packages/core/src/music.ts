export * as Music from "./music";

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Resource } from "sst";
import { ClientPlaylist, Jam } from "../../web-app/src/types";
import { Result, TopItemResponse, UserInfo } from "./utils/types";

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

export async function getTopItems(): Promise<
  Result<ClientPlaylist, GeneralError>
> {
  let access_token = "";
  const s3Client = new S3Client({});
  const getCommand = new GetObjectCommand({
    Bucket: Resource.UserBucket.name,
    Key: "admin/info.json",
  });
  const userBucket = await s3Client.send(getCommand);
  const userInfo = (await JSON.parse(
    (await userBucket.Body?.transformToString()) ?? "",
  )) as any;

  if (!userInfo?.access_token) {
    const errorMsg = `no access_token in bucket. oh no`;
    console.error(errorMsg);
    return { error: { message: errorMsg }, success: false };
  }
  if (userInfo?.access_token) {
    console.debug(`we have our access token from s3`);
    access_token = userInfo.access_token;
  }

  // take access_token and fetch top items.
  const params = new URLSearchParams([
    ["time_range", "short_term"],
    ["limit", "25"],
  ]);
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?${params}`,
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    },
  );

  if (!response.ok) {
    /**
     * error = { error: { message: string, status: number } }
     *
     * NEED TO IMPLEMENT RETRY FOR ACCESSTOKEN
     */
    let errorMsg: string;
    const errorObj = (await response.json()) as any;
    console.debug(`errorObj = ${JSON.stringify(errorObj, null, 2)}`);
    if ("error" in errorObj) {
      errorMsg = `failed to fetch top tracks. error: ${errorObj?.error?.message}`;
    } else {
      errorMsg = `failed to fetch top tracks.`;
    }
    console.error(errorMsg);

    return { error: { message: errorMsg }, success: false };
  }

  const data = (await response.json()) as TopItemResponse;
  // if (data && data?.items) console.table(data.items.slice(0, 5));
  const playlist = toClientPlaylist(data);

  return { data: playlist, success: true };
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

export async function getUserAccessToken(code: string): Promise<any> {
  try {
    const s3Client = new S3Client({});
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        // Authorization: `Basic ${Buffer.from(`${Resource.SPOTIFY_API_ID.value}:${Resource.SPOTIFY_API_KEY.value}`)}`,
        Authorization:
          "Basic " +
          Buffer.from(
            Resource.SPOTIFY_API_ID.value +
              ":" +
              Resource.SPOTIFY_API_KEY.value,
          ).toString("base64"),
        ContentType: "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: Resource.SPOT_AUTH_REDIRECT_URL.value,
      }),
    });

    if (!response.ok) {
      console.error(`Failed to get access token. error: ${response.body}`);
    }

    const data = (await response.json()) as any;
    if (
      data?.access_token &&
      data.token_type &&
      data.scope &&
      data.expires_in &&
      data.refresh_token
    ) {
      console.debug(`We have our access token`);
      const getCommand = new GetObjectCommand({
        Bucket: Resource.UserBucket.name,
        Key: "admin/info.json",
      });

      const getResponse = await s3Client.send(getCommand);
      const userInfo: UserInfo = JSON.parse(
        (await getResponse.Body?.transformToString()) ?? "",
      );
      const updatedInfo: UserInfo = {
        ...userInfo,
        access_token: data.access_token,
        code: code,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token,
      };

      const upCommand = new PutObjectCommand({
        Bucket: Resource.UserBucket.name,
        Key: "admin/info.json",
        Body: JSON.stringify(updatedInfo),
      });

      await s3Client.send(upCommand);
      console.debug(`Uploaded user info`);
    }
  } catch (error) {
    console.error(`error getting user token. error=${error}`);
  }
}

export async function refreshAccessToken() {
  const s3Client = new S3Client({});
  const getUserInfoCommand = new GetObjectCommand({
    Bucket: Resource.UserBucket.name,
    Key: "admin/info.json",
  });

  const getResponse = await s3Client.send(getUserInfoCommand);
  const userInfo: UserInfo = JSON.parse(
    (await getResponse.Body?.transformToString()) ?? "",
  );

  const response = await fetch(`https://accounts.spotify.com/api/token`, {
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
      grant_type: "refresh_token",
      refresh_token: userInfo.refresh_token,
    }),
  });

  if (!response.ok) {
    let errorMsg;
    const r = (await response.json()) as any;
    if ("error" in r) {
      errorMsg = r.error;
    } else {
      errorMsg = `Failed to refresh token. `;
    }
    console.error(errorMsg);
    return { error: { message: errorMsg }, success: false };
  }

  type RefreshTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
  };
  const data: RefreshTokenResponse =
    (await response.json()) as RefreshTokenResponse;

  const refreshedUser: UserInfo = {
    ...userInfo,
    access_token: data.access_token,
    expires_in: data.expires_in,
    refresh_token: data.refresh_token ?? userInfo.refresh_token,
  };

  const upCommand = new PutObjectCommand({
    Bucket: Resource.UserBucket.name,
    Key: "admin/info.json",
    Body: JSON.stringify(refreshedUser),
  });

  await s3Client.send(upCommand);
  return { success: true, data: { access_token: data.access_token } };
}

export async function authCallback(code: string, state: string) {
  try {
    const s3Client = new S3Client({});
    const getCommand = new GetObjectCommand({
      Bucket: Resource.UserBucket.name,
      Key: "admin/info.json",
    });
    const response = await s3Client.send(getCommand);
    const existState = JSON.parse(
      (await response.Body?.transformToString()) ?? "",
    );

    if (!existState?.["state"] || existState?.["state"] !== state) {
      console.error(`Mismatch in state values. Cross-Site forgery suspected.`);
      return;
    }

    await getUserAccessToken(code);
  } catch (error) {
    console.error(`Error in authCallback. error=${error ?? ""}`);
  }
}

function toClientPlaylist(data: TopItemResponse): ClientPlaylist {
  // Convert the Spotify API response to our internal representation.
  // This is a good place to do this because we want to keep the API
  // response separate from our internal representation.
  const jams = data.items.map(toJam);
  // console.debug("jams: ", JSON.stringify(jams.slice(0, 2), null, 2));
  const clientPlaylist: ClientPlaylist = {
    items: jams,
    name: `My Top 25`,
    url: data.href,
  };

  return clientPlaylist;
}

function toJam(t: TopItemResponse["items"][number]): Jam {
  // const { track: t } = track;

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
