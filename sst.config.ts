import { SSTConfig } from "sst";
import { WebApp } from "./stacks/WebStack";

export default {
  config(_input) {
    return {
      name: "portfolio-tm",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(WebApp);
  },
} satisfies SSTConfig;
