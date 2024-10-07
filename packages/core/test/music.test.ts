import { assert, describe, expect, it, vi } from "vitest";
import { popularPlaylist } from "../src/music";

const mockToken = { access_token: "test-token" };

// vi.doMock("../src/music", () => ({
//   getAccessToken: vi.fn().mockResolvedValue(mockToken),
// }));

describe("Spotify API - Music Module", () => {
  it("should fetch and map a popular playlist", async () => {
    // const mockResponse = {
    //   name: "Test Playlist",
    //   href: "https://spotify.com/test",
    //   tracks: {
    //     items: [
    //       {
    //         track: {
    //           name: "Song 1",
    //           external_urls: { spotify: "https://spotify.com/track1" },
    //           album: {
    //             name: "Album 1",
    //             images: [{ url: "image-url", height: 64 }],
    //           },
    //           artists: [{ name: "Artist 1" }],
    //         },
    //       },
    //     ],
    //   },
    // };

    // getAccessToken.mockResolvedValue(mockToken);
    // global.fetch = vi.fn().mockResolvedValue({
    //   json: vi.fn().mockResolvedValue(mockResponse),
    // });

    const playlist = await popularPlaylist();
    console.log(`test playlist: ${JSON.stringify(playlist, null, 2)}`);

    assert.exists(playlist.items[0].title, `playlist song 1 title exists`);
    assert.exists(playlist.items[0].artist, `playlist song 1 artist exists`);
  });

  it.skip("should return an error if the token exchange fails", async () => {
    // getAccessToken.mockResolvedValue(null);
    const result = await popularPlaylist();
    expect(result).toEqual(
      expect.objectContaining({ error: "Token exchange failed" }),
    );
  });
});
