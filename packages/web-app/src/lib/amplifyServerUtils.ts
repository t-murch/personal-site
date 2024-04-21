import config from "../../config";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    API: {
      REST: {
        music: {
          endpoint: config.apiGateway.URL_MUSIC!,
          region: config.apiGateway.REGION,
        },
        robots: {
          endpoint: config.apiGateway.URL_ROBOTS!,
          region: config.apiGateway.REGION,
        },
        summary: {
          endpoint: config.apiGateway.URL_STREAMING_ROBOTS!,
          region: config.apiGateway.REGION,
        },
      },
    },
  },
});
