import handler from "@portfolio-tm/core/handler";
import * as PuppeteerService from "@portfolio-tm/core/puppeteer";

export const auth = handler(async (_event) => {
  return JSON.stringify(await PuppeteerService.requestUserAuth());
});
