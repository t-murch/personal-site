import config from "../../config";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    API: {
      REST: {
        music: {
          endpoint: config.apiGateway.URL!,
          region: config.apiGateway.REGION,
        },
      },
    },
  },
});
