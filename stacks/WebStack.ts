import { NextjsSite, StackContext, use } from "sst/constructs";
import { MusicAPI } from "./MusicApiStack";
import { MovementAPI } from "./MovementApiStack";

export function WebApp({ stack, app }: StackContext) {
  const { api: musicApi } = use(MusicAPI);
  const { api: movementApi } = use(MovementAPI);

  const site = new NextjsSite(stack, "Site", {
    path: "packages/web-app",
    environment: {
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_API_URL: musicApi.url,
      NEXT_PUBLIC_MOVEMENT_API_URL: movementApi.url,
    },
  });

  stack.addOutputs({
    URL: site.url,
  });
}
