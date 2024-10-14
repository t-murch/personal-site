import { allowedOrigins } from "./MusicApi";
import { GEMINI_API_KEY, resumeBucket } from "./Storage";

export const robotsApi = new sst.aws.ApiGatewayV2("RobotsAPI", {
  cors: { allowMethods: ["GET", "POST"], allowOrigins: allowedOrigins },
  domain: {
    name:
      $app.stage === "prod"
        ? "toddmurch.dev"
        : `${$app.stage}.api.robots.toddmurch.dev`,
  },
  transform: {
    route: {
      handler: {
        nodejs: {
          install: ["pdfjs-dist"],
          loader: {
            ".node": "file",
          },
        },
        link: [GEMINI_API_KEY, resumeBucket],
      },
    },
  },
});

robotsApi.route("GET /robots/tldr", "packages/functions/src/robots.tldr");
robotsApi.route(
  "GET /robots/summary",
  "packages/functions/src/robots.getResumeSummary",
);
robotsApi.route("POST /robots/upload", "packages/functions/src/robots.upload");
