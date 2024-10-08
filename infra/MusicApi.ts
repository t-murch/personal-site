import { SPOTIFY_API_ID, SPOTIFY_API_KEY } from "./Storage";

const prodOrigin = ["https://www.toddmurch.dev"];
export const allowedOrigins = $dev ? ["http://localhost:3000"] : prodOrigin;

export const musicApi = new sst.aws.ApiGatewayV2("MusicApi", {
  cors: { allowMethods: ["GET"], allowOrigins: allowedOrigins },
  domain: {
    name:
      $app.stage === "prod" ? "toddmurch.dev" : `${$app.stage}.toddmurch.dev`,
  },
  transform: {
    route: {
      handler: {
        link: [SPOTIFY_API_KEY, SPOTIFY_API_ID],
      },
    },
  },
});

musicApi.route("GET /music/popular", "packages/functions/src/music.popular");
