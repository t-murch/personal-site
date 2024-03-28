import { Api, Config, StackContext } from "sst/constructs";

export function MusicAPI({ stack }: StackContext) {
  const SPOTIFY_API_KEY = new Config.Secret(stack, "SPOTIFY_API_KEY");
  const SPOTIFY_API_ID = new Config.Secret(stack, "SPOTIFY_API_ID");

  const api = new Api(stack, "MusicApi", {
    defaults: {
      function: {
        bind: [SPOTIFY_API_KEY, SPOTIFY_API_ID],
      },
    },

    routes: {
      "GET /music/popular": "packages/functions/src/music.popular",
    },
  });

  stack.addOutputs({
    NodeApiEndpoint: api.url,
  });

  return {
    api,
  };
}
