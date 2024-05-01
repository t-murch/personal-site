import { Function, StackContext, use } from "sst/constructs";
import { RobotsAPI } from "./RobotsApiStack";

export function StreamingRobotAPI({ stack }: StackContext) {
  const { GEMINI_API_KEY, resumeBucket } = use(RobotsAPI);

  const apiFunc = new Function(stack, "StreamingRobotApiFunction", {
    bind: [GEMINI_API_KEY, resumeBucket],
    nodejs: {
      esbuild: {
        loader: {
          ".node": "file",
        },
      },
    },
    handler: "packages/functions/src/streamHandler.geminiStreamHandler",
    timeout: `${45} seconds`,
    url: {
      cors: { allowOrigins: ["*"], allowHeaders: ["*"], allowMethods: ["*"] },
      streaming: true,
    },
  });

  stack.addOutputs({
    StreamingRobotApiEndpoint: apiFunc.url,
  });

  return { apiFunc };
}
