import { Auth, setEnvDefaults, type AuthConfig } from "@digital-realty/auth-core"
import Apple from "@digital-realty/auth-core/providers/apple"
import Auth0 from "@digital-realty/auth-core/providers/auth0"
import AzureB2C from "@digital-realty/auth-core/providers/azure-ad-b2c"
import BoxyHQSAML from "@digital-realty/auth-core/providers/boxyhq-saml"
import Cognito from "@digital-realty/auth-core/providers/cognito"
import Coinbase from "@digital-realty/auth-core/providers/coinbase"
import Discord from "@digital-realty/auth-core/providers/discord"
import Dropbox from "@digital-realty/auth-core/providers/dropbox"
import Facebook from "@digital-realty/auth-core/providers/facebook"
import GitHub from "@digital-realty/auth-core/providers/github"
import GitLab from "@digital-realty/auth-core/providers/gitlab"
import Google from "@digital-realty/auth-core/providers/google"
import Hubspot from "@digital-realty/auth-core/providers/hubspot"
import Keycloak from "@digital-realty/auth-core/providers/keycloak"
import LinkedIn from "@digital-realty/auth-core/providers/linkedin"
import Netlify from "@digital-realty/auth-core/providers/netlify"
import Okta from "@digital-realty/auth-core/providers/okta"
import Passage from "@digital-realty/auth-core/providers/passage"
import Pinterest from "@digital-realty/auth-core/providers/pinterest"
import Reddit from "@digital-realty/auth-core/providers/reddit"
import Slack from "@digital-realty/auth-core/providers/slack"
import Spotify from "@digital-realty/auth-core/providers/spotify"
import Twitch from "@digital-realty/auth-core/providers/twitch"
import Twitter from "@digital-realty/auth-core/providers/twitter"
import WorkOS from "@digital-realty/auth-core/providers/workos"
import Zoom from "@digital-realty/auth-core/providers/zoom"

const authConfig: AuthConfig = {
  providers: [
    Apple,
    Auth0,
    AzureB2C({
      clientId: process.env.AUTH_AZURE_AD_B2C_ID,
      clientSecret: process.env.AUTH_AZURE_AD_B2C_SECRET,
      issuer: process.env.AUTH_AZURE_AD_B2C_ISSUER,
    }),
    BoxyHQSAML({
      clientId: "dummy",
      clientSecret: "dummy",
      issuer: process.env.AUTH_BOXYHQ_SAML_ISSUER,
    }),
    Cognito,
    Coinbase,
    Discord,
    Dropbox,
    Facebook,
    GitHub,
    GitLab,
    Google,
    Hubspot,
    Keycloak,
    LinkedIn,
    Netlify,
    Okta,
    Passage,
    Pinterest,
    Reddit,
    Slack,
    Spotify,
    Twitch,
    Twitter,
    WorkOS,
    Zoom,
    {
      id: "tiktok",
      name: "TikTok",
      type: "oauth",
      checks: ["state"],
      clientId: process.env.AUTH_TIKTOK_ID,
      clientSecret: process.env.AUTH_TIKTOK_SECRET,
      authorization: {
        url: "https://www.tiktok.com/v2/auth/authorize",
        params: {
          client_key: process.env.AUTH_TIKTOK_ID,
          scope: "user.info.basic",
        },
      },
      token: "https://open.tiktokapis.com/v2/oauth/token/",
      userinfo:
        "https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,username",
      profile(profile: any) {
        return profile
      },
      style: {
        bg: "#000",
        text: "#fff",
      },
    },
  ],
  basePath: "/api",
}
setEnvDefaults(process.env, authConfig)

export default function handler(req: Request) {
  return Auth(req, authConfig)
}

export const config = { runtime: "edge" }
