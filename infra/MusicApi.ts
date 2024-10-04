import { SPOTIFY_API_ID, SPOTIFY_API_KEY } from "./Storage";

const prodOrigin = ["https://www.toddmurch.dev"];
export const allowedOrigins =
  $app.stage === "dev"
    ? prodOrigin.concat(...["http://localhost:3000"])
    : prodOrigin;

export const musicApi = new sst.aws.ApiGatewayV2("MusicApi", {
  cors: { allowMethods: ["GET"], allowOrigins: allowedOrigins },
  transform: {
    route: {
      handler: {
        link: [SPOTIFY_API_KEY, SPOTIFY_API_ID],
      },
    },
  },
});

musicApi.route("GET /music/popular", "packages/functions/src/music.popular");
