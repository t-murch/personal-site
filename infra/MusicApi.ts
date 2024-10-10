import {
  SPOT_AUTH_REDIRECT_URL,
  SPOTIFY_API_ID,
  SPOTIFY_API_KEY,
  userBucket,
} from "./Storage";

const prodOrigin = [
  "https://www.toddmurch.dev",
  "https://accounts.spotify.com",
];
export const allowedOrigins = $dev
  ? ["http://localhost:3000", "https://accounts.spotify.com"]
  : prodOrigin;

export const musicApi = new sst.aws.ApiGatewayV2("MusicApi", {
  cors: { allowMethods: ["GET"], allowOrigins: allowedOrigins },
  domain: {
    name:
      $app.stage === "prod" ? "toddmurch.dev" : `${$app.stage}.toddmurch.dev`,
  },
  transform: {
    route: {
      handler: {
        link: [
          SPOTIFY_API_KEY,
          SPOTIFY_API_ID,
          SPOT_AUTH_REDIRECT_URL,
          userBucket,
        ],
      },
    },
  },
});

musicApi.route("GET /music/popular", "packages/functions/src/music.popular");
musicApi.route(
  "GET /spotify/callback",
  "packages/functions/src/music.authCallback",
);
musicApi.route(
  "GET /music/topItems",
  "packages/functions/src/music.getTopItems",
);
