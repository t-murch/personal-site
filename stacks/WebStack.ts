import { NextjsSite, StackContext } from "sst/constructs";

export function WebApp({ stack, app }: StackContext) {
  const site = new NextjsSite(stack, "Site", {
    path: "packages/web-app",
  });

  stack.addOutputs({
    URL: site.url,
  });
}
