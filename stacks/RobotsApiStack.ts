import { StackContext, Config, Api } from "sst/constructs";

export function RobotsAPI({ stack }: StackContext) {
  const GEMINI_API_KEY = new Config.Secret(stack, "GEMINI_API_KEY");

  const api = new Api(stack, "RobotsApi", {
    defaults: {
      function: {
        bind: [GEMINI_API_KEY],
      },
    },
    routes: {
      "GET /robots/analyze": "packages/functions/src/robots.analyze",
    },
  });

  stack.addOutputs({
    RobotsApiEndpoint: api.url,
  });

  return {
    api,
  };
}
