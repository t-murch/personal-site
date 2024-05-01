import { StackContext, Config, Api, Bucket } from "sst/constructs";

export function RobotsAPI({ stack }: StackContext) {
  const GEMINI_API_KEY = new Config.Secret(stack, "GEMINI_API_KEY");

  const resumeBucket = new Bucket(stack, "RobotsBucket");

  const api = new Api(stack, "RobotsApi", {
    defaults: {
      function: {
        bind: [GEMINI_API_KEY, resumeBucket],
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
      "GET /robots/tldr": "packages/functions/src/robots.analyze",
      "GET /robots/summary": "packages/functions/src/robots.getResumeSummary",
      "POST /robots/upload": "packages/functions/src/robots.upload",
    },
  });

  stack.addOutputs({
    RobotsApiEndpoint: api.url,
  });

  return {
    api,
    GEMINI_API_KEY,
    resumeBucket,
  };
}
