import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

const useProxy = false;

console.log("Loaded Auth0 domain:", Constants.expoConfig.extra.auth0Domain);

export const authConfig = {
  domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
  clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
  audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
  redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
  useProxy: false,
};
