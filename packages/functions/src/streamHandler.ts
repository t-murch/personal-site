import { Robots } from "@portfolio-tm/core/robots";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ResponseStream, streamifyResponse } from "lambda-stream";

export const geminiStreamHandler = streamifyResponse(
  async (_evt: APIGatewayProxyEventV2, responseStream: ResponseStream) => {
    const text = await Robots.analyze();

    const textLines = text.split("\n");

    await new Promise(async (resolve) => {
      for (const line of textLines) {
        for (const char of line) {
          responseStream.write(char);
          // await new Promise((r) => setTimeout(r, 20));
        }
        responseStream.write("\n");
        // await new Promise((r) => setTimeout(r, 20));
      }

      resolve(responseStream.end());
    });
  },
);
