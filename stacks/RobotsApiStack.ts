import { StackContext, Config, Api, Bucket } from "sst/constructs";

export function RobotsAPI({ stack }: StackContext) {
  const GEMINI_API_KEY = new Config.Secret(stack, "GEMINI_API_KEY");

  const bucket = new Bucket(stack, "RobotsBucket");

  const api = new Api(stack, "RobotsApi", {
    defaults: {
      function: {
        bind: [GEMINI_API_KEY, bucket],
        nodejs: {
          esbuild: {
            loader: {
              ".node": "file",
            },
          },
        },
      },
    },

    routes: {
      "GET /robots/analyze": "packages/functions/src/robots.analyze",
      "POST /robots/upload": "packages/functions/src/robots.upload",
    },
  });

  stack.addOutputs({
    RobotsApiEndpoint: api.url,
  });

  return {
    api,
  };
}
