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
  link: [musicApi, robotsApi],
});
