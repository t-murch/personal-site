export const GEMINI_API_KEY = new sst.Secret("GEMINI_API_KEY");
export const resumeBucket = new sst.aws.Bucket("RobotsBucket");

export const SPOTIFY_API_KEY = new sst.Secret("SPOTIFY_API_KEY");
export const SPOTIFY_API_ID = new sst.Secret("SPOTIFY_API_ID");

export const userBucket = new sst.aws.Bucket("UserBucket");
export const userPass = new sst.Secret("UserPass");

const redirectUrl =
  $app.stage === "prod"
    ? `https://${$app.stage}.api.music.toddmurch.dev/spotify/callback`
    : `https://toddmurch.dev/spotify/callback`;
export const SPOT_AUTH_REDIRECT_URL = new sst.Secret(
  "SPOT_AUTH_REDIRECT_URL",
  redirectUrl,
);
