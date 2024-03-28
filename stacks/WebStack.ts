import { NextjsSite, StackContext, use } from "sst/constructs";
import { MusicAPI } from "./MusicApiStack";

export function WebApp({ stack, app }: StackContext) {
  const { api: musicApi } = use(MusicAPI);
  const site = new NextjsSite(stack, "Site", {
    path: "packages/web-app",
    environment: {
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_API_URL: musicApi.url,
    },
  });

  stack.addOutputs({
    URL: site.url,
  });
}
