/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "portfolio-tm",
      home: "aws",
      removal: input?.stage === "production" ? "retain" : "remove",
    };
  },

  async run() {
    await import("./infra/Storage");
    await import("./infra/MusicApi");
    await import("./infra/RobotsApi");
    const puppeteerApi = await import("./infra/PuppeteerApi");
    await import("./infra/Web");
    return {
      Region: aws.getRegionOutput().name,
      puppeteerUrl: puppeteerApi.puppeteerAPI.url,
    };
  },
});
