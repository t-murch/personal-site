"use client";

import { Amplify } from "aws-amplify";
import config from "../../../config";

Amplify.configure(
  {
    API: {
      REST: {
        music: {
          endpoint: config.apiGateway.URL!,
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
