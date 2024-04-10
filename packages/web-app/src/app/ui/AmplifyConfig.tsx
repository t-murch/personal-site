"use client";

import { Amplify } from "aws-amplify";
import config from "../../../config";

Amplify.configure(
  {
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
      },
    },
  },
  { ssr: true },
);

export default function AmplifyConfig() {
  return null;
}
