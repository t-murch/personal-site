import {
  SPOT_AUTH_REDIRECT_URL,
  SPOTIFY_API_ID,
  SPOTIFY_API_KEY,
  userBucket,
} from "./Storage";
// https://test-tm.toddmurch.dev/resume_summary
const prodOrigin = [
  "https://www.toddmurch.dev",
  "https://accounts.spotify.com",
];
export const allowedOrigins = $dev
  ? [
      `https://${$app.stage}.toddmurch.dev`,
      "http://localhost:3000",
      "https://accounts.spotify.com",
    ]
  : prodOrigin;
if ($dev) {
  console.log(`allowedOrigins = ${JSON.stringify(allowedOrigins)}`);
}

export const musicApi = new sst.aws.ApiGatewayV2("MusicApi", {
  cors: { allowMethods: ["GET"], allowOrigins: allowedOrigins },
  domain: {
    name:
      $app.stage === "prod"
        ? "api.music.toddmurch.dev"
        : `${$app.stage}.api.music.toddmurch.dev`,
    dns: sst.cloudflare.dns(),
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
