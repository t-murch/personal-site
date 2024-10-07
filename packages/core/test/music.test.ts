import { assert, describe, expect, it, vi } from "vitest";
import { getServerAccessToken, popularPlaylist } from "../src/music";

describe("Spotify API - Music Module", () => {
  it("should fetch and map a popular playlist", async () => {
    const playlist = await popularPlaylist(getServerAccessToken);
    if (!playlist.success) {
      // handle error
    } else {
      assert.exists(
        playlist.data.items[0].title,
        `playlist song 1 title exists`,
      );
      assert.exists(
        playlist.data.items[0].artist,
        `playlist song 1 artist exists`,
      );
      assert.equal(playlist.data.items.length, 50);
    }
  });

  it("should return an error if the token exchange fails", async () => {
    const mockedGetAccessToken = vi.fn().mockResolvedValue({
      access_token: "",
      expires_in: "",
      token_type: "",
    });
    // const getAccessTokenSpy = vi.spyOn('../src/music', 'getAccessToken')

    const result = await popularPlaylist(mockedGetAccessToken);
    expect(result).toEqual(
      expect.objectContaining({
        error: { message: "Token exchange failed" },
        success: false,
      }),
    );
  });
});
