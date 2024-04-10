import { NextjsSite, StackContext, use } from "sst/constructs";
import { MusicAPI } from "./MusicApiStack";
import { RobotsAPI } from "./RobotsApiStack";

export function WebApp({ stack, app }: StackContext) {
  const { api: robotsApi } = use(RobotsAPI);
  const { api: musicApi } = use(MusicAPI);
  const site = new NextjsSite(stack, "Site", {
    path: "packages/web-app",
    environment: {
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_MUSIC_API_URL: musicApi.url,
      NEXT_PUBLIC_ROBOTS_API_URL: robotsApi.url,
    },
  });

  stack.addOutputs({
    URL: site.url,
  });
}
