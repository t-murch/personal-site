import { allowedOrigins } from "./MusicApi";
import { GEMINI_API_KEY, resumeBucket } from "./Storage";

export const streamingRobotAPI = new sst.aws.Function(
  "StreamingRobotApiFunction",
  {
    link: [GEMINI_API_KEY, resumeBucket],
    nodejs: {
      install: ["canvas"],
      loader: {
        ".node": "file",
      },
    },
    handler: "packages/functions/src/streamHandler.geminiStreamHandler",
    timeout: `${45} seconds`,
    streaming: true,
    url: {
      cors: {
        allowHeaders: ["*"],
        allowMethods: ["GET"],
        allowOrigins: allowedOrigins,
      },
    },
  },
);
