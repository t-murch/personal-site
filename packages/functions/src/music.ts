import handler from "@portfolio-tm/core/handler";
import * as Music from "@portfolio-tm/core/music";

export const authCallback = handler(async (event) => {
  let state = "",
    code = "";

  if (
    !event.queryStringParameters ||
    !event.queryStringParameters["state"] ||
    !event.queryStringParameters["code"]
  ) {
    const errorMsg = `We didn't get our required values.`;
    console.error(errorMsg);
    return JSON.stringify({ success: false, error: { message: errorMsg } });
  } else {
    state = event.queryStringParameters["state"];
    code = event.queryStringParameters["code"];
  }

  return JSON.stringify(await Music.authCallback(code, state));
});

export const getTopItems = handler(async (_event) => {
  let items = await Music.getTopItems();
  if (!items.success) {
    console.log(`Refreshing Access Token`);
    const refreshResponse = await Music.refreshAccessToken();
    if (!refreshResponse.success) {
      const errorMsg = `Failed to refresh token. error: ${JSON.stringify(refreshResponse?.error)}`;
      console.error(errorMsg);
      return JSON.stringify({ success: false, error: errorMsg });
    }
    items = await Music.getTopItems();
  }
  return JSON.stringify(items);
});
