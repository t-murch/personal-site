import { assert, describe, expect, it } from "vitest";
import * as PlaywrightService from "../src/puppeteer";
import { generateRandomString } from "../src/utils";

describe("Playwright Service", () => {
  it("Should grant permissions and return a code parameter", async () => {
    const state = generateRandomString(16);
    const result = await PlaywrightService.requestUserAuth(
      "pass",
      "strategy",
      "user",
    );

    expect(result).toHaveProperty("code");
    expect(result).toHaveProperty("state");
    assert.equal(result.state, state);
  });

  it.skip("Should fail when expected", async () => {
    const result = await PlaywrightService.requestUserAuth(
      "pass",
      "strategy",
      "user",
    );

    expect(result).toHaveProperty("error");
  });
});
