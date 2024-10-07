import { assert, describe, expect, it, vi } from "vitest";
import { getAccessToken, popularPlaylist } from "../src/music";

const mockToken = { access_token: "test-token" };

describe("Spotify API - Music Module", () => {
  it("should fetch and map a popular playlist", async () => {
    // vi.unmock("../src/music");
    const playlist = await popularPlaylist(getAccessToken);

    assert.exists(playlist.items[0].title, `playlist song 1 title exists`);
    assert.exists(playlist.items[0].artist, `playlist song 1 artist exists`);
    assert.equal(playlist.items.length, 50);
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
      expect.objectContaining({ error: "Token exchange failed" }),
    );
  });
});
