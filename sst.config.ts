import { SSTConfig } from "sst";
import { WebApp } from "./stacks/WebStack";
import { MusicAPI } from "./stacks/MusicApiStack";
import { RobotsAPI } from "./stacks/RobotsApiStack";

export default {
  config(_input) {
    return {
      name: "portfolio-tm",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(RobotsAPI).stack(MusicAPI).stack(WebApp);
  },
} satisfies SSTConfig;
