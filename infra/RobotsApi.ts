import { allowedOrigins } from "./MusicApi";
import { GEMINI_API_KEY, resumeBucket } from "./Storage";

export const robotsApi = new sst.aws.ApiGatewayV2("RobotsAPI", {
  cors: { allowMethods: ["GET", "POST"], allowOrigins: allowedOrigins },
  transform: {
    route: {
      handler: {
        nodejs: {
          loader: {
            ".node": "file",
          },
        },
        link: [GEMINI_API_KEY, resumeBucket],
      },
    },
  },
});

robotsApi.route("GET /robots/tldr", "packages/functions/src/robots.analyze");
robotsApi.route(
  "GET /robots/summary",
  "packages/functions/src/robots.getResumeSummary",
);
robotsApi.route("POST /robots/upload", "packages/functions/src/robots.upload");
