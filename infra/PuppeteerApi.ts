import {
  SPOT_AUTH_REDIRECT_URL,
  SPOTIFY_API_ID,
  userBucket,
  userPass,
} from "./Storage";

export const puppeteerAPI = new sst.aws.Function("PuppeteerApiFunction", {
  handler: "packages/functions/src/puppeteer.auth",
  link: [SPOTIFY_API_ID, SPOT_AUTH_REDIRECT_URL, userBucket, userPass],
  memory: "2 GB",
  nodejs: {
    install: ["@sparticuz/chromium"],
  },
  timeout: "5 minutes",
  url: true,
});
