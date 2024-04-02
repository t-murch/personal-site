import handler from "@portfolio-tm/core/handler";
import * as Robots from "@portfolio-tm/core/robots";
import { Buffer } from "node:buffer";

export const analyze = handler(async (_event) => {
  return JSON.stringify(await Robots.analyze());
});

export const upload = handler(async (event) => {
  const body = Buffer.from(event?.body ?? "", "base64");
  return JSON.stringify(await Robots.upload(body));
});
