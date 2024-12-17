export * as PuppeteerService from "./puppeteer";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import Chromium from "@sparticuz/chromium";
import puppeteer, { Page } from "puppeteer-core";
import { Resource } from "sst";
import { generateRandomString } from "./utils";
import { UserInfo } from "./utils/types";

// This is the path to the local Chromium binary
const YOUR_LOCAL_CHROMIUM_PATH =
  "/tmp/localChromium/chromium/linux-1365736/chrome-linux/chrome";

type UserAuthResponse =
  | { code: string; state: string }
  | { error: string; state: string };

export async function requestUserAuth(): Promise<any> {
  const isDev = !!process.env.SST_DEV;
  const state = generateRandomString(16);
  const searchParams = new URLSearchParams([
    ["client_id", Resource.SPOTIFY_API_ID.value],
    ["redirect_uri", Resource.SPOT_AUTH_REDIRECT_URL.value],
    ["response_type", "code"],
    ["scope", "user-top-read"],
    ["show_dialog", "true"],
    ["state", state],
  ]);

  console.debug(`** Params = ${searchParams.toString()}`);
  const browser = await puppeteer.launch({
    args: process.env.SST_DEV ? puppeteer.defaultArgs() : Chromium.args,
    devtools: isDev,
    defaultViewport: Chromium.defaultViewport,
    executablePath: isDev
      ? YOUR_LOCAL_CHROMIUM_PATH
      : await Chromium.executablePath(),
    headless: isDev ? false : Chromium.headless,
    // slowMo: isDev ? 100 : undefined,
  });

  const page = await browser.newPage();
  await page.goto(`https://accounts.spotify.com/authorize?${searchParams}`);
  const loginSelector = "facebook-login";

  await page.waitForSelector(`[data-testid="${loginSelector}"]`);
  console.debug(`found selector=loginSelector`);
  await page.click(`[data-testid="${loginSelector}"]`);

  await page.waitForSelector("#email");
  console.debug(`found selector=emailSelector`);
  await page.locator("#email").fill("slicktlm@msn.com");
  await page.waitForSelector("#pass");
  console.debug(`found selector=passwordSelector`);
  await page.locator("#pass").fill(Resource.UserPass.value);
  await page.waitForSelector("#loginbutton");
  console.debug(`found selector=loginSelector`);
  await page.click("#loginbutton");

  await page.waitForSelector(`div ::-p-text(Continue as)`);
  console.debug(`found selector=Continue as`);
  await page.locator(`div ::-p-text(Continue as)`).click();

  await handleURLError(page, "Error Step 3 Auth.");

  await page.waitForSelector(`[data-testid="auth-accept"]`);
  console.debug(`found selector=auth-accept`);
  await page.locator(`[data-testid="auth-accept"]`).click();
  await handleURLError(page, "User denied perms.");

  // Since successfully granted perms
  // upload `state` val to s3
  const s3Client = new S3Client({});
  const userInfo: UserInfo = {
    access_token: "",
    code: "",
    expires_in: 0,
    refresh_token: "",
    state: state,
  };
  const upCommand = new PutObjectCommand({
    Bucket: Resource.UserBucket.name,
    Key: "admin/info.json",
    Body: JSON.stringify(userInfo),
  });

  await s3Client.send(upCommand);
  await page.close();
  return { success: true };
}

async function handleURLError(
  page: Page,
  fallbackMsg = "Error processing event",
) {
  const url = new URL(page.url());
  const params = new URLSearchParams(url.search);
  //TODO: This is not accurately handling errors.
  if (params.has("error")) {
    await page.close();
    const errorMsg = params.get("error") ?? fallbackMsg;
    return { success: false, error: { message: errorMsg } };
  }
}
