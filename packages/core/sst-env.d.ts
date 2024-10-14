/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "GEMINI_API_KEY": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "MusicApi": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "PuppeteerApiFunction": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "RobotsAPI": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "RobotsBucket": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "SPOTIFY_API_ID": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "SPOTIFY_API_KEY": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "SPOT_AUTH_REDIRECT_URL": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Site": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
    "UserBucket": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "UserPass": {
      "type": "sst.sst.Secret"
      "value": string
    }
  }
}
