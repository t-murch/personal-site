import { NextjsSite, StackContext, use } from "sst/constructs";
import { MusicAPI } from "./MusicApiStack";
import { RobotsAPI } from "./RobotsApiStack";
import { StreamingRobotAPI } from "./StreamingRobotApiStack";

export function WebApp({ stack, app }: StackContext) {
  const { api: robotsApi } = use(RobotsAPI);
  const { api: musicApi } = use(MusicAPI);
  const { apiFunc: streamingRobotAPI } = use(StreamingRobotAPI);

  const site = new NextjsSite(stack, "Site", {
    path: "packages/web-app",
    environment: {
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_MUSIC_API_URL: musicApi.url,
      NEXT_PUBLIC_ROBOTS_API_URL: robotsApi.url,
      NEXT_PUBLIC_STREAMING_ROBOT_API_URL: streamingRobotAPI.url!,
    },
  });

  stack.addOutputs({
    URL: site.url,
  });
}
