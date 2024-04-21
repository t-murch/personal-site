import { SSTConfig } from "sst";
import { MusicAPI } from "./stacks/MusicApiStack";
import { RobotsAPI } from "./stacks/RobotsApiStack";
import { StreamingRobotAPI } from "./stacks/StreamingRobotApiStack";
import { WebApp } from "./stacks/WebStack";

export default {
  config(_input) {
    return {
      name: "portfolio-tm",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(RobotsAPI).stack(StreamingRobotAPI).stack(MusicAPI).stack(WebApp);
  },
} satisfies SSTConfig;
