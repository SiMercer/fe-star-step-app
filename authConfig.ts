import Constants from "expo-constants";

const { auth0Domain, auth0ClientId, auth0Audience, redirectUri } = Constants.expoConfig.extra;

export const authConfig = {
  domain: auth0Domain,
  clientId: auth0ClientId,
  audience: auth0Audience,
  redirectUri,
  useProxy: process.env.NODE_ENV !== "production",
};