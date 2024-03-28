import handler from "@portfolio-tm/core/handler";
import * as Music from "@portfolio-tm/core/music";

export const popular = handler(async (_event) => {
  return JSON.stringify(await Music.popularPlaylist());
});
