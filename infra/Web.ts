import { musicApi } from "./MusicApi";
import { robotsApi } from "./RobotsApi";

const region = aws.getRegionOutput().name;

export const WebApp = new sst.aws.Nextjs("Site", {
  path: "packages/web-app",
  domain: {
    name:
      $app.stage === "prod" ? "toddmurch.dev" : `${$app.stage}.toddmurch.dev`,
    aliases: $app.stage === "prod" ? ["www.toddmurch.dev"] : undefined,
  },
  environment: {
    NEXT_PUBLIC_REGION: region,
    NEXT_PUBLIC_MUSIC_API_URL: musicApi.url,
    NEXT_PUBLIC_ROBOTS_API_URL: robotsApi.url,
  },
});
